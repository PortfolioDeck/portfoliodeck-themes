 /*
 * Responsive Carousel
 * Oktavilla 2012
 */

(function ($) { // compliant with jquery.noConflict()
  "use strict";
  var noOfCarousels = 0, supports3D = false, transitionEndEvents = null;
  
  // check if the browser supports css transitions
  function getSupportsTransition() {
    var body = document.body || document.documentElement;
    var style = body.style;
    return style.transition !== undefined || style.WebkitTransition !== undefined || style.MozTransition !== undefined || style.MsTransition !== undefined || style.OTransition !== undefined;
  }
  
  // ugly check for css3 3d support (to improve performance) - should be more general
  supports3D = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix();
  
  // setting up end events for css transitions
  transitionEndEvents = "webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend";
  
  $.fn.carousel = function (o) {
    o = $.extend({
      navigation: false,
      pagination: false,
      enumeration: false, // a text like "$no of $total"
      swipe: false,
      auto: null, // no of milliseconds between each slide 1000
      autoSpeed: 200,
      pauseOnHover: false,
      speed: 250,
      easing: null,
      clickForNext: false, // the element to trigger click on, ie "img"

      vertical: false,
      circular: true,
      visible: 1,
      scroll: 1,
      start: 1,
      minimumNo: 0,
      waitUntilLoaded: false,
      removeOnError: false,

      beforeScrollStart: null,
      afterScrollEnd: null
    }, o || {});
    
    var supportsTransition = getSupportsTransition();

    return this.each(function () {
      var $div = null, current = 0, $ul = $(this), $li = $ul.children(), startPage = o.start, noOfItems  = $li.length, totalNoOfItems = $li.length, noOfPages = Math.ceil(totalNoOfItems / o.scroll), offset = Math.max(o.scroll, o.visible), autoTimeout = null, running = false, autoPlaying = false, animCss = o.vertical ? "top" : "left", liSize = 0, start = 0, end = 0, startTime = 0, noOfLoaded = 0, carouselNo = noOfCarousels;
      
      // do we have enough images to make a proper carousel?
      function tooFewImages() {
        return totalNoOfItems <= (o.minimumNo || Math.max(o.scroll, o.visible));
      }

      // do we have enough images to make a proper carousel?
      if (tooFewImages()) {
        return;
      }
      
      // new carousel, incrementing numbers of carousels so far
      noOfCarousels += 1;
      
      // function for getting css3 transform css
      function getCSS3Transform(distance, duration) {
        var options = {};
        var transform = supports3D ? "translate3d(" + (o.vertical ? "0, " + distance : distance + ", 0") + ", 0)" : ("translate" + (o.vertical ? "Y" : "X") + "(" + distance + ")");
        options["-moz-transform"] = transform;
        options["-webkit-transform"] = transform;
        options["-ms-transform"] = transform;
        options["-o-transform"] = transform;
        options["transform"] = transform;
        var transition = duration + "ms";
        options["-moz-transition-duration"] = transition;
        options["-webkit-transition-duration"] = transition;
        options["-ms-transition-duration"] = transition;
        options["-o-transition-duration"] = transition;
        options["transition-duration"] = transition;
        return options; 
      }     

      // returns the currently visible items (in the current order)
      function visible() {
        return $li.slice(offset, offset + o.visible);
      }

      // returns the current page number
      function getPageNo() {
        return Math.round(current / o.scroll);
      }

      // the actual animation function
      function go(to, circulate) {
        if (running) {
          return;
        }

        // recalculating where we're heading, if needed
        if (!circulate) {
          if (to < 0) {
            to += totalNoOfItems;
          } else if (to >= totalNoOfItems) {
            to %= totalNoOfItems;
          }
        }

        // calling potential external function
        if (o.beforeScrollStart) {
          o.beforeScrollStart.call(this, visible());
        }

        // this carousel is non-circular and we're trying to reach the first or last item, do nothing
        if (!o.circular && (to < 0 || to > noOfItems - o.visible)) {
          return false;
        }
        
        // initializing
        current = to;
        running = true;

        // function to run once we're done with the animation        
        var onComplete = function () {

          // removing transition events
          if (supportsTransition) {
            $ul.off(transitionEndEvents);
          }
          
          // looping, if needed
          if (o.circular && circulate) {
            if (current < 0) {
              current += totalNoOfItems;
            } else if (current >= totalNoOfItems) {
              current %= totalNoOfItems;
            }
            var d = -(current + offset) * 100 / o.visible;
            if (supportsTransition) {
              $ul.css(getCSS3Transform((d / noOfItems) + "%", 0));
            } else {
              $ul.css(animCss, d + "%");
            }
          }
          
          // done
          running = false;
          
          // updating pagination/navigation
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
          
          // updating enumeration
          if (o.enumeration) {
            $("#carousel-enumeration-" + carouselNo).html("").html(o.enumeration.replace("$no", getPageNo() + 1));
          }
          
          if (autoPlaying) {
            startAuto();
          }
          
          // calling potential external functions
          if (o.afterScrollEnd) {
            o.afterScrollEnd.call(this, visible());
          }
        }
        
        // calculating distance to slide
        var distance = -((current + (o.circular ? offset : 0)) * 100 / o.visible);
        
        // animating
        if (supportsTransition) {
          $ul.on(transitionEndEvents, onComplete);
          $ul.css(getCSS3Transform((distance / noOfItems) + "%", o.speed));
        } else {
          $ul.animate((animCss === "left" ? {left: distance + "%"} : {top: -(current * liSize)}), (autoTimeout ? o.autoSpeed : o.speed), o.easing, onComplete);
        }
      }

      // starts autoplay
      function startAuto() {
        autoPlaying = true;
        autoTimeout = setTimeout(function () {
          go(current + o.scroll, o.circular);
        }, o.auto);
      }

      // stops autoplay
      function stopAuto() {
        autoPlaying = false;
        clearTimeout(autoTimeout);
        autoTimeout = null;
      }

      // creates all the needed html and javascript events for a carousel
      function createCarousel() {
        startPage = startPage - 1; // changing to zero base
        current = startPage;

        // creating circular offsets
        if (o.circular) {
          $ul.prepend($li.slice(totalNoOfItems - offset).clone()).append($li.slice(0, offset).clone());
          $li = $ul.children();
          noOfItems = $li.length;
          var d = -offset / o.visible * 100;
          if (supportsTransition) {
            $ul.css(getCSS3Transform((d / noOfItems) + "%", 0));
          } else {
            $ul.css(animCss, (o.vertical ? -$li.height() : d + "%"));
          }
        }

        // constructing carousel
        $div = $ul.wrap("<div class=\"carousel\" id=\"carousel-" + carouselNo + "\"></div>").parent();
        $li.css({
          "overflow": "hidden",
          "display": "block",
          "float": o.vertical ? "none" : "left",
          "width": (100 / (o.vertical ? 1 : noOfItems)) + "%"
        });
        var apa = (100 / (o.vertical ? 1 : noOfItems));
        $ul.css({
          "margin": 0,
          "padding": 0,
          "position": "relative",
          "float": "left",
          "list-style": "none",
          "width": (100 * (o.vertical ? 1 : noOfItems / o.visible)) + "%", // + 0.01? to justify for possible rounding errors
          "-webkit-backface-visibility": "hidden", // cheating webkit into thinking that a transform has already taken place (to avoid flickering)
          "-webkit-perspective": 0
        });
        $div.css({
          "visibility": "visible",
          "overflow": "hidden",
          "width": "100%"
        });
        
        // @todo in some possible future
        if (o.vertical) {
          alert("Vertical carousels are not supported yet");
          $li.height($li.height());
          $div.height($li.height());
        }

        // adding navigation
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

        // adding pagination
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

        // adding enumeration
        if (o.enumeration) {
          o.enumeration = o.enumeration.replace("$total", noOfPages);
          $div.after("<p class=\"carousel-enumeration\" id=\"carousel-enumeration-" + carouselNo + "\">" + o.enumeration.replace("$no", getPageNo() + 1) + "</p>");
        }
        
        // adding click-for-next functionality
        if (o.clickForNext) {
          $ul.on("click", o.clickForNext, function () {
            go(current + o.scroll, o.circular);
            return false;
          });
        }

        // adding swipe functionality (if available)
        if (o.swipe && $.fn.swipe) {
          var swipePrevious = o.vertical ? "swipeUp" : "swipeLeft";
          var swipeNext = o.vertical ? "swipeDown" : "swipePrevious";
          var touchStart, touchEnd;
          var options = {
            treshold: [0, 0],
            swipeStart: function (x, y) {
              // swipe start
              startTime = new Date();
              touchStart = o.vertical ? y : x;
              liSize = o.vertical ? $li.outerHeight(true) : $li.outerWidth(true);
            }, swipeEnd: function (x, y) {
              // swipe done, should we switch image or go back to the current one?
              touchEnd = o.vertical ? y : x;

              if (touchStart !== touchEnd) {
                var d = touchEnd - touchStart;
                // valid swipes are quick, but not too short or longer than half of the slide width, except for on the first and last non-circular slides
                var validSwipe = ((new Date().getTime() - startTime.getTime() < 250 && Math.abs(d) > 20) || (Math.abs(d) >= liSize / 2)) && (o.circular || !((current === 0 && d > 0) || (current === noOfItems - 1 && d < 0)));
                // go back to current slide if the swipe was invalid
                if (!validSwipe) {
                  go(current);
                } else if (d > 0) {
                  // previous
                  go(current - o.scroll, o.circular);
                } else {
                  // next
                  go(current + o.scroll, o.circular);
                }
              }
            }
          };
          // function for each swipe move
          var swipe = function (x, y) {
            if (running) {
              return;
            }
            // updating slide to swipe movement
            touchEnd = o.vertical ? y : x;
            var d = touchEnd - touchStart;

            if (supportsTransition) {
              // adding resistance on the first/last slide (not needed if circular)
              if (!o.circular && (current === 0 && d > 0 || current === noOfItems - 1 && d < 0)) {
                d = d / (Math.abs(d) / liSize + 2);
              }
              $ul.css(getCSS3Transform((-(current + (o.circular ? o.scroll : 0)) * liSize + d) + "px", 0));
            } else {
              // calculating new position
              var options = {};
              var value = -100 * (current + (o.circular ? o.scroll : 0)) + 100 * d / liSize;
              options[o.vertical ? "top" : "left"] = value + "%";
              $ul.css(options);
            }
          };
          options[o.vertical ? "swipeUp" : "swipeLeft"] = swipe;
          options[o.vertical ? "swipeDown" : "swipeRight"] = swipe;
          $div.swipe(options);
        }

        // auto playing
        if (o.auto) {
          if (o.pauseOnHover) {
            $div.nextAll(".carousel-navigation, .carousel-pagination, .carousel-enumeration").andSelf().hover(stopAuto, startAuto);
          }
          startAuto();
        }
      }

      // handles loaded images
      function onImageLoad() {
        noOfLoaded++;
        if (noOfLoaded === totalNoOfItems) {
          if (!tooFewImages()) {
            createCarousel();
          }
        }
      }

      // should we wait until all images are loaded before running or just go ahead?
      if (o.waitUntilLoaded || o.removeOnError) {
        $ul.find("img").each(function() {
          if (this.completed) {
            onImageLoad();
          } else {
            $(this).load(onImageLoad);
          }
          if (o.removeOnError) {
            var $self = $(this);
            var src = this.src;
            $self.removeAttr("src");
            $self.error(function() {
              $self.parent().remove();
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

if (!console) {
  var console = {
    log: function(str) {
      var $c = $("#c-o-n-s-o-l-e");
      if ($c.length === 0) {
        $c = $("<div id=\"c-o-n-s-o-l-e\" style=\"position: absolute; right: 0; top: 0; font: 11px verdana; color: #fff; background: #333; background: rgba(0,0,0,.5); z-index: 999999; padding: 10px;\"/>").appendTo($("body"));
      }
      str = ("" + str).replace(">", "&gt;");
      str = str.replace("<", "&lt;");
      $c.append("<p>" + str + "</p>");
    }
  };
}