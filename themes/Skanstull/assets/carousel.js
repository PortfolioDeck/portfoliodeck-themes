 /*
 * Carousel
 * Oktavilla 2011
 */

(function ($) { // Compliant with jquery.noConflict()
  var noOfCarousels = 0;
  $.fn.carousel = function (o) {
    o = $.extend({
      navigation: false,
      pagination: false,
      swipe: false,
      auto: null,
      autoSpeed: 200,
      pauseOnHover: false,
      speed: 200,
      easing: null,
      clickForNext: false,

      vertical: false,
      circular: true,
      enumeration: false,
      visible: 1,
      scroll: 1,
      start: 1,
      minimumNo: 0,
      waitUntilLoaded: false,
      removeOnError: false,

      beforeScrollStart: null,
      afterScrollEnd: null
    }, o || {});

    return this.each(function () {
      var $div = null, current = 0, $ul = $(this), $li = $ul.children(), startPage = o.start, noOfItems  = $li.length, totalNoOfItems = $li.length, noOfPages = Math.ceil(totalNoOfItems / o.scroll), offset = Math.max(o.scroll, o.visible), autoInterval = null, running = false, autoRunning = false, animCss = o.vertical ? "top" : "left", sizeCss = o.vertical ? "height" : "width", divSize = 0, ulSize = 0, liSize = 0, start = 0, end = 0, startTime = 0, noOfLoaded = 0, carouselNo = noOfCarousels;

      if (tooFewImages()) {
        return;
      }
      
      
      noOfCarousels++;
      
      function tooFewImages() {
        return totalNoOfItems <= (o.minimumNo || Math.max(o.scroll, o.visible));
      }

      // Returns the currently visible item (in the current order)
      function visible() {
        return $li.slice(offset, offset + o.visible);
      }

      // Returns the page for the current item number
      function getPageNo() {
        return Math.round(current / o.scroll);
      }

      // Animates
      function go(to, circulate) {
        if (!running) {

          if (!circulate) {
            if (to < 0) {
              to += totalNoOfItems;
            } else if (to >= totalNoOfItems) {
              to %= totalNoOfItems;
            }
          }

          if (o.beforeScrollStart) {
            o.beforeScrollStart.call(this, visible());
          }

          // Non-circular and trying to read first or last, do nothing
          if (!o.circular && (to < 0 || to > noOfItems - o.visible)) {
            return false;
          }
          
          current = to;
          running = true;

          $ul.animate((animCss === "left" ? {left: -((current + (o.circular ? offset : 0)) * 100 / o.visible) + "%"} : {top: -(current * liSize)}), (autoInterval ? o.autoSpeed : o.speed), o.easing,
            function () {
              if (o.circular && circulate) {
                if (current < 0) {
                  current += totalNoOfItems;
                } else if (current >= totalNoOfItems) {
                  current %= totalNoOfItems;
                }
                $ul.css(animCss, -((current + offset) * 100 / o.visible) + "%");
              }
              if (o.pagination || (!o.circular && o.navigation)) {
                if (o.pagination) {
                  var $pagination = $("#carousel-pagination-" + carouselNo);
                  $pagination.children().eq(getPageNo()).addClass("current").siblings().removeClass("current");
                }
                if (!o.circular && o.navigation) {
                  // Disable buttons when the carousel reaches the last/first, and enable when not
                  var $navigation = $("#carousel-navigation-" + carouselNo);
                  $navigation.children(".disabled").removeClass("disabled");
                  if (current - o.scroll < 0) {
                    $navigation.children(".previous").addClass("disabled");
                  } else if (current + o.scroll > noOfItems - o.visible) {
                    $navigation.children(".next").addClass("disabled");
                  }
                }
              }

              if (o.enumeration) {
                $("#carousel-enumeration-" + carouselNo).html(o.enumeration.replace("$no", getPageNo() + 1));
              }
              
              if (o.afterScrollEnd) {
                o.afterScrollEnd.call(this, visible());
              }
              running = false;
            });
        }
        return false;
      }

      // Starts autplay
      function startAuto() {
        autoInterval = setInterval(function () {
          go(current + o.scroll, o.circular);
        }, o.auto);
      }

      // Stops autoplay
      function stopAuto() {
        clearInterval(autoInterval);
        autoInterval = null;
      }

      function createCarousel() {
        startPage = startPage - 1; // Changing to zero base
        current = startPage;

        // Creating circular offsets
        if (o.circular) {
          $ul.prepend($li.slice(totalNoOfItems - offset).clone()).append($li.slice(0, offset).clone());
          $ul.css(animCss, (o.vertical ? -$li.height() : -offset / o.visible * 100 + "%"));
          $li = $ul.children();
          noOfItems = $li.length;
        }

        // Constructing carousel
        $div = $ul.wrap("<div class=\"carousel\" id=\"carousel-" + carouselNo + "\"></div>").parent();
        $li.css({
          "overflow": "hidden",
          "display": "block",
          "float": o.vertical ? "none" : "left",
          "width": (100 / (o.vertical ? 1 : noOfItems)) + "%"
        });
        $ul.css({
          "margin": 0,
          "padding": 0,
          "position": "relative",
          "float": "left",
          "list-style": "none",
          "width": 100 * (o.vertical ? 1 : noOfItems / o.visible) + 0.01 + "%"
        }); // 0.01 is trying to justify for possible rounding errors
        $div.css({
          "visibility": "visible",
          "overflow": "hidden",
          "width": "100%"
        });

        if (o.vertical) {
          alert("Vertical carousels not supported yet");
          $li.height($li.height());
          $div.height($li.height());
        }

        // Adding navigation
        if (o.navigation) {
          var $navigation = $("<ul class=\"carousel-navigation\" id=\"carousel-navigation-" + carouselNo + "\"></ul>");
          $navigation.append("<li class=\"previous" + (startPage === 0 ? " disabled" : "") + "\"><a href=\"\">&larr;</a></li>");
          $navigation.append("<li class=\"next" + (startPage === totalNoOfItems - 1 ? " disabled" : "") + "\"><a href=\"\">&rarr;</a></li>");
          $navigation.on("click", "a", function () {
            go(current + o.scroll * ($(this).parent().hasClass("previous") ? -1 : 1), o.circular);
            return false;
          });
          $div.after($navigation);
        }

        // Adding pagination
        if (o.pagination) {
          $pagination = $("<ul class=\"carousel-pagination\" id=\"carousel-pagination-" + carouselNo + "\"></ul>");
          for (var i = 0; i < noOfPages; i++) {
            var $page = $("<li" + (i === startPage * o.scroll ? " class=\"current\"" : "") + "><a href=\"\">" + (i + 1) + "</a></li>");
            $page.data("i", i * o.scroll);
            $pagination.append($page);
          }
          $pagination.on("click", "a", function () {
            var $li = $(this).parent();
            if (!$li.hasClass("current")) {
              $li.addClass("current").siblings().removeClass("current");
              go($li.data("i"), false);
            }
            return false;
          });
          $div.after($pagination);
        }

        // Adding enumeration
        if (o.enumeration) {
          o.enumeration = o.enumeration.replace("$total", noOfPages);
          $div.after("<p class=\"carousel-enumeration\" id=\"carousel-enumeration-" + carouselNo + "\">" + o.enumeration.replace("$no", getPageNo() + 1) + "</p>");
        }
        
        if (o.clickForNext) {
          $ul.on("click", "img", function () {
            go(current + o.scroll, o.circular);
            return false;
          });
        }

        // Adding swipe functionality if available
        if (o.swipe && $.fn.swipe) {
          var swipePrevious = o.vertical ? "swipeUp" : "swipeLeft";
          var swipeNext = o.vertical ? "swipeDown" : "swipePrevious";
          var touchStart, touchEnd;
          var options = {
            treshold: [0, 0],
            swipeStart: function (x, y) {
              startTime = new Date();
              touchStart = o.vertical ? y : x;
              liSize = o.vertical ? $li.outerHeight(true) : $li.outerWidth(true);
            }, swipeEnd: function (x, y) {
              touchEnd = o.vertical ? y : x;
              if (touchStart !== touchEnd) {
                var s = Math.abs(touchEnd - touchStart) / (new Date().getTime() - startTime.getTime());
                if (s < 0.4 && Math.abs(end - start) < liSize / 2) {
                  go(current);
                } else if (touchEnd > touchStart) {
                  go(current - o.scroll, o.circular);
                } else {
                  go(current + o.scroll, o.circular);
                }
              }
            }
          };
          var swipe = function (x, y) {
            var options = [];
            touchEnd = o.vertical ? y : x;
            var d = touchEnd - touchStart;
            var value = -100 * (current + 1) + 100 * d / liSize;
            options[o.vertical ? "top" : "left"] = value + "%";
            $ul.css(options);
          };
          options[o.vertical ? "swipeUp" : "swipeLeft"] = swipe;
          options[o.vertical ? "swipeDown" : "swipeRight"] = swipe;
          $div.swipe(options);
        }

        if (o.auto) {
          if (o.pauseOnHover) {
            $div.nextAll(".carousel-navigation, .carousel-pagination, .carousel-enumeration").andSelf().hover(stopAuto, startAuto);
          }
          startAuto();
        }
      }

      function onImageLoad() {
        noOfLoaded++;
        if (noOfLoaded === totalNoOfItems) {
          if (!tooFewImages()) {
            createCarousel();
          }
        }
      }

      if (o.waitUntilLoaded || o.removeOnError) {
        $ul.find("img").each(function() {
          if (this.completed) {
            onImageLoad();
          } else {
            $(this).load(onImageLoad);
          }
          if (o.removeOnError) {
            var src = this.src;
            $(this).removeAttr("src");
            $(this).error(function() {
              $(this).parent().remove();
              totalNoOfItems--;
              noOfItems--;
              if (totalNoOfItems === 0) {
                $ul.remove();
              }
            });
            this.src = src;
          }
        });
      } else {
        createCarousel();
      }
    });
  };
})(jQuery);
