
var loadPage = function(page) {
  var ifrm = $("#content")[0];
  ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
  var html = "";
  
  if (page != "index") {
    models[page] = objects[page];
  }

  $.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
  });
  
  $.get("theme/layout.liquid", function(layout) {
    $.get("theme/" + page + ".liquid", function(pageContent) {
      var src = layout.replace(/{{\s*?content_for_layout\s*?}}/, pageContent);
      var timeStamp = new Date().getTime();
      src = src.replace(/\{\{\s*?theme\s*?\|\s*?asset_path:\s*?'(.*?)'\s*?\}\}/gi, "theme/$1?timestamp=" + timeStamp);
      src = src.replace("</head>", "<meta http-equiv=\"Expires\" content=\"Tue, 01 Jan 2000 12:12:12 GMT\"><meta http-equiv=\"Pragma\" content=\"no-cache\"><base target=\"_top\"></head>");
      if (console) { console.log(src); }
      
      var tmpl = Liquid.parse(src);
      var html = tmpl.renderWithErrors(models);
      ifrm.document.open();
      ifrm.document.write(html);
      ifrm.document.close();
    });
  });

};
