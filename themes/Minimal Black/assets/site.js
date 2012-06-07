document.observe("dom:loaded", function() {
  document.observe('keydown', function(event) {
    if (event.shiftKey) {
      return;
    }
    function goTo(link) {
      return window.location = link.href;
    }
    switch(event.keyCode) {
    case Event.KEY_LEFT:
      $$('div.pagination a.previous').each(function(link) {
        goTo(link);
      });
      break;
    case Event.KEY_RIGHT:
      $$('div.pagination a.next').each(function(link) {
        goTo(link);
      });
      break;
    }
  });
});
