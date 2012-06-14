/*
 * Swipe
 * 
 * Author: Oktavilla 2011
*/

/**
 * Swipe
 * 
 * Swipe functionality for touch devices
 * All functions (except for swipeEnd) are called with the x and y parameters as well as the event itself
 * @param {object} An associative array of options
 *  swipeUp (optional) Function to be called when the user swipes up 
 *  swipeRight (optional) Function to be called when the user swipes right
 *  swipeDown (optional) Function to be called when the user swipes down
 *  swipeLeft (optional) Function to be called when the user swipes left
 *  swipeStart (optional) Functiona to be called at the start of a swipe
 *  swipeEnd (optional) Functiona to be called at the end of a swipe
 *  treshold (optional, default x: 20, y: 20) current.x, y swipe treshold
 *  triggerOnce (optional, default false) cancels the event directly after it has been triggered once
 *
 */
if (typeof jQuery !== "undefined" && typeof window.ontouchstart !== "undefined") {
  (function($){
    $.fn.swipe = function(options) {
      if (!this) {
        return false;        
      }
      
      var defaults = {
        threshold: {
          x: 20,
          y: 20
        },
        swipeStart: function() {},
        swipeEnd: function() {},
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        triggerOnce: false
      };
      
      var options = $.extend(defaults, options);
      
      return this.each(function() {
        var $self = $(this);
        
        var start = {
          x: 0,
          y: 0
        };
        var current = {
          x: 0,
          y: 0
        };
        
        var isMoving = false;
        
        var touchStart = function(e) {
          if (e.targetTouches.length === 1) {
            start.x = current.x = e.targetTouches[0].pageX;
            start.y = current.y = e.targetTouches[0].pageY;
            this.addEventListener("touchmove", touchMove, false);
            isMoving = true;
            options.swipeStart.call(this, start.x , start.y, e);
          }
        };
        
        var touchEnd = function(e) {
          options.swipeEnd.call(this, current.x, current.y, e);
          this.removeEventListener("touchmove", touchMove);
          isMoving = false;
        };
        
        var touchMove = function(e) {
          if (isMoving) {
            current.x = e.touches[0].pageX;
            current.y = e.touches[0].pageY;
            var dx = start.x - current.x;
            var dy = start.y - current.y;
            if (Math.abs(dx) >= options.threshold.x && options.swipeLeft && options.swipeRight) {
              e.preventDefault();
              if (dx > 0) {
                options.swipeLeft.call(this, current.x, current.y, e);
              } else {
                options.swipeRight.call(this, current.x, current.y, e);
              }
            } 
            if (Math.abs(dy) >= options.threshold.y && options.swipeUp && options.swipeDown) {
              e.preventDefault();
              if (dy > 0) {
                options.swipeUp.call(this, current.x, current.y, e);
              } else {
                options.swipeDown.call(this, current.x, current.y, e);
              }
            }
            if (options.triggerOnce) {
              isMoving = false;
            }
          }
        };
        
        this.addEventListener("touchstart", touchStart, false);
        this.addEventListener("touchend", touchEnd, false);
      });
    };
  })(jQuery);
}