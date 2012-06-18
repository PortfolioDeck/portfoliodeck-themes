$(function() {
  "use strict";
  if ($.browser.msie && $.browser.version < 10) {
    $('.items').columnize({
      columns: 3,
      doneFunc: function() {
        $('.items .column').css('width', '210px').css('padding', '0 30px');
        $('.column.last, .column.first').css('padding', '0');        
      }
    });        
  }

  var $carousel = $('#carousel').carousel({
    circular: false,
    navigation: true,
    enumeration: '$no/$total',
    swipe: true,
    clickForNext: "img"
  });
  if ($carousel.length > 0) {
    $carousel.before($('#carousel-navigation-0')).before($('#carousel-enumeration-0'));
  }
});

