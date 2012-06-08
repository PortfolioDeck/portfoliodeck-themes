var getTheme = function() {
  var t;
  if (t = localStorage.getItem("theme")) {
    return t;
  } else {
    return 0;
  }
};

var setTheme = function(themeNumber) {
  localStorage.setItem("theme", themeNumber);
};

var themulatorBar = (function() {
  var t = getTheme();
  var html = [];
  html.push('<select id="theme-selector">');
  for (var i = 0, l = themes.length; i < l; i++) {
    html.push('<option value="' + i + '"' + ( t == i ? ' selected="selected"' : '') + '>' + themes[i].name + '</option>')
  }
  html.push('</select>');

  $(document).ready(function() {
    var $themulatorBar = $('#themulator-tools');
    $themulatorBar.append(html.join(''));
    $themulatorBar.live('change', '#theme-selector', function() {
      var n = $('#theme-selector')[0].selectedIndex;
      setTheme(n);
      window.location.reload();
    });
  });
})();


var loadPage = function(page) {
  var theme = themes[getTheme()].path;
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
  
  $.get(theme + "/layout.liquid", function(layout) {
    $.get(theme + "/" + page + ".liquid", function(pageContent) {
      var src = layout.replace(/{{\s*?content_for_layout\s*?}}/, pageContent);
      var timeStamp = new Date().getTime();
      src = src.replace(/\{\{\s*?theme\s*?\|\s*?asset_path:\s*?'(.*?)'\s*?\}\}/gi, theme + "/assets/$1?timestamp=" + timeStamp);
      src = src.replace(/href="\/"/gi, 'href="index.html"');
      src = src.replace("</head>", "<meta http-equiv=\"Expires\" content=\"Tue, 01 Jan 2000 12:12:12 GMT\"><meta http-equiv=\"Pragma\" content=\"no-cache\"><base target=\"_top\"></head>");
      
      var tmpl = Liquid.parse(src);
      var html = tmpl.renderWithErrors(models);
      if (console) { console.log(html); }
      ifrm.document.open();
      ifrm.document.write(html);
      ifrm.document.close();
    });
  });
};
