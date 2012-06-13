/*$(function(){
  var $container = $('#collection');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector : '.item',
      columnWidth : 200
    });
  });
});*/

jQuery(document).ready(function($) {
    var CollManag = (function() {
        var $ctCollContainer = $('#collection'),
        collCnt = 1,
        init = function() {
            changeColCnt();
            initEvents();
            initPlugins();
        },
        changeColCnt = function() {
            var w_w = $(window).width();
            if( w_w <= 768 ) n = 1;
            else n = 2;
        },
        initEvents = function() {
            $(window).on( 'smartresize.CollManag', function( event ) {
                changeColCnt();
            });
        },
        initPlugins = function() {
            $ctCollContainer.imagesLoaded( function(){
                $ctCollContainer.masonry({
                    itemSelector : '.item',
                    columnWidth : function( containerWidth ) {
                        return containerWidth / n;
                    },
                    isAnimated : true,
                    animationOptions: {
                        duration: 400
                    }
                });
            });
        };
        return { init: init };
    })();
    CollManag.init();
}); 