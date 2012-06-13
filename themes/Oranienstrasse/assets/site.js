$(function(){
  var $container = $('#collection');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector : '.item',
      columnWidth : 200
    });
  });
});