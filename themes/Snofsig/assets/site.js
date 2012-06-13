jQuery(document).ready(function($) {
  $(document).on("keyup.nextprev", function(e) {
    if (e.keyCode == "39") { var href = $("link[rel='next']").attr("href"); }
    if (e.keyCode == "37") { var href = $("link[rel='prev']").attr("href"); }
    if (typeof href != "undefined" && href != "") {
      document.location.href = href;
    }
  });
}); 