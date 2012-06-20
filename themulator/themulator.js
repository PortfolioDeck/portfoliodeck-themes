/*! JSON v3.2.2 | http://bestiejs.github.com/json3 | Copyright 2012, Kit Cambridge | http://kit.mit-license.org */
;(function(){function g(a){throw a;}var k=void 0,l=!0,m=null,n={}.toString,o,p,q="function"===typeof define&&define.c,s="object"==typeof exports&&exports,u='{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',w,x,y,B,C,D,E,F,G,H,I,M,N=new Date(-3509827334573292),O,P,Q;try{N=-109252==N.getUTCFullYear()&&0===N.getUTCMonth()&&1==N.getUTCDate()&&10==N.getUTCHours()&&37==N.getUTCMinutes()&&6==N.getUTCSeconds()&&708==N.getUTCMilliseconds()}catch(R){}
N||(O=Math.floor,P=[0,31,59,90,120,151,181,212,243,273,304,334],Q=function(a,b){return P[b]+365*(a-1970)+O((a-1969+(b=+(1<b)))/4)-O((a-1901+b)/100)+O((a-1601+b)/400)});q||s?(q&&define("json",s={}),"object"==typeof JSON&&JSON&&(s.stringify=JSON.stringify,s.parse=JSON.parse)):s=this.JSON||(this.JSON={});
if(w="function"==typeof s.stringify&&!Q){(N=function(){return 1}).toJSON=N;try{w="0"===s.stringify(0)&&"0"===s.stringify(new Number)&&'""'==s.stringify(new String)&&s.stringify(n)===k&&s.stringify(k)===k&&s.stringify()===k&&"1"===s.stringify(N)&&"[1]"==s.stringify([N])&&"null"==s.stringify(m)&&"[null,null,null]"==s.stringify([k,n,m])&&s.stringify({result:[N,l,!1,m,"\x00\u0008\n\u000c\r\t"]})==u&&"1"===s.stringify(m,N)&&"[\n 1,\n 2\n]"==s.stringify([1,2],m,1)&&'"-271821-04-20T00:00:00.000Z"'==s.stringify(new Date(-864E13))&&
'"+275760-09-13T00:00:00.000Z"'==s.stringify(new Date(864E13))&&'"-000001-01-01T00:00:00.000Z"'==s.stringify(new Date(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==s.stringify(new Date(-1))}catch(S){w=!1}}if("function"==typeof s.parse)try{if(0===s.parse("0")&&!s.parse(!1)&&(N=s.parse(u),D=5==N.a.length&&1==N.a[0])){try{D=!s.parse('"\t"')}catch(T){}if(D)try{D=1!=s.parse("01")}catch(U){}}}catch(V){D=!1}N=u=m;
if(!w||!D){if(!(o={}.hasOwnProperty))o=function(a){var b={},d;if((b.__proto__=m,b.__proto__={toString:1},b).toString!=n)o=function(c){var a=this.__proto__,c=c in(this.__proto__=m,this);this.__proto__=a;return c};else{d=b.constructor;o=function(a){var b=(this.constructor||d).prototype;return a in this&&!(a in b&&this[a]===b[a])}}b=m;return o.call(this,a)};p=function(a,b){var d=0,c,f,j;(c=function(){this.valueOf=0}).prototype.valueOf=0;f=new c;for(j in f)o.call(f,j)&&d++;c=f=m;if(d)d=d==2?function(a,
b){var c={},d=n.call(a)=="[object Function]",f;for(f in a)!(d&&f=="prototype")&&!o.call(c,f)&&(c[f]=1)&&o.call(a,f)&&b(f)}:function(a,b){var c=n.call(a)=="[object Function]",d,f;for(d in a)!(c&&d=="prototype")&&o.call(a,d)&&!(f=d==="constructor")&&b(d);(f||o.call(a,d="constructor"))&&b(d)};else{f=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];d=function(a,b){var c=n.call(a)=="[object Function]",d;for(d in a)!(c&&d=="prototype")&&o.call(a,
d)&&b(d);for(c=f.length;d=f[--c];o.call(a,d)&&b(d));}}d(a,b)};w||(x={"\\":"\\\\",'"':'\\"',"\u0008":"\\b","\u000c":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},y=function(a,b){return("000000"+(b||0)).slice(-a)},B=function(a){for(var b='"',d=0,c;c=a.charAt(d);d++)b=b+('\\"\u0008\u000c\n\r\t'.indexOf(c)>-1?x[c]:c<" "?"\\u00"+y(2,c.charCodeAt(0).toString(16)):c);return b+'"'},C=function(a,b,d,c,f,j,h){var e=b[a],i,r,t,v,J,K,L,z,A;if(typeof e=="object"&&e)if(n.call(e)=="[object Date]"&&!o.call(e,"toJSON"))if(e>
-1/0&&e<1/0){if(Q){t=O(e/864E5);for(i=O(t/365.2425)+1970-1;Q(i+1,0)<=t;i++);for(r=O((t-Q(i,0))/30.42);Q(i,r+1)<=t;r++);t=1+t-Q(i,r);v=(e%864E5+864E5)%864E5;J=O(v/36E5)%24;K=O(v/6E4)%60;L=O(v/1E3)%60;v=v%1E3}else{i=e.getUTCFullYear();r=e.getUTCMonth();t=e.getUTCDate();J=e.getUTCHours();K=e.getUTCMinutes();L=e.getUTCSeconds();v=e.getUTCMilliseconds()}e=(i<=0||i>=1E4?(i<0?"-":"+")+y(6,i<0?-i:i):y(4,i))+"-"+y(2,r+1)+"-"+y(2,t)+"T"+y(2,J)+":"+y(2,K)+":"+y(2,L)+"."+y(3,v)+"Z"}else e=m;else typeof e.toJSON==
"function"&&(e=e.toJSON(a));d&&(e=d.call(b,a,e));if(e===m)return"null";i=n.call(e);if(i=="[object Boolean]")return""+e;if(i=="[object Number]")return e>-1/0&&e<1/0?""+e:"null";if(i=="[object String]")return B(e);if(typeof e=="object"){for(a=h.length;a--;)h[a]===e&&g(TypeError());h.push(e);z=[];b=j;j=j+f;if(i=="[object Array]"){r=0;for(a=e.length;r<a;A||(A=l),r++){i=C(r,e,d,c,f,j,h);z.push(i===k?"null":i)}return A?f?"[\n"+j+z.join(",\n"+j)+"\n"+b+"]":"["+z.join(",")+"]":"[]"}p(c||e,function(a){var b=
C(a,e,d,c,f,j,h);b!==k&&z.push(B(a)+":"+(f?" ":"")+b);A||(A=l)});return A?f?"{\n"+j+z.join(",\n"+j)+"\n"+b+"}":"{"+z.join(",")+"}":"{}"}},s.stringify=function(a,b,d){var c,f,j,h,e;if(typeof b=="function"||typeof b=="object"&&b)if(n.call(b)=="[object Function]")f=b;else if(n.call(b)=="[object Array]"){j={};for(h=b.length;h--;(e=b[h])&&(n.call(e)=="[object String]"||n.call(e)=="[object Number]")&&(j[e]=1));}if(d)if(n.call(d)=="[object Number]"){if((d=d-d%1)>0){c="";for(d>10&&(d=10);c.length<d;c=c+" ");
}}else n.call(d)=="[object String]"&&(c=d.length<=10?d:d.slice(0,10));return C("",(e={},e[""]=a,e),f,j,c,"",[])});D||(E=String.fromCharCode,F={"\\":"\\",'"':'"',"/":"/",b:"\u0008",t:"\t",n:"\n",f:"\u000c",r:"\r"},G=function(a){for(var b=a[0],d=b.length,c,f,j,h,e;a[1]<d;){c=b.charAt(a[1]);if("\t\r\n ".indexOf(c)>-1)a[1]++;else{if("{}[]:,".indexOf(c)>-1){a[1]++;return c}if(c=='"'){f="@";for(a[1]++;a[1]<d;){c=b.charAt(a[1]);c<" "&&g(SyntaxError());if(c=="\\"){c=b.charAt(++a[1]);if('\\"/btnfr'.indexOf(c)>
-1){f=f+F[c];a[1]++}else if(c=="u"){j=++a[1];for(h=a[1]+4;a[1]<h;a[1]++){c=b.charAt(a[1]);c>="0"&&c<="9"||c>="a"&&c<="f"||c>="A"&&c<="F"||g(SyntaxError())}f=f+E("0x"+b.slice(j,a[1]))}else g(SyntaxError())}else{if(c=='"')break;f=f+c;a[1]++}}if(b.charAt(a[1])=='"'){a[1]++;return f}}else{j=a[1];if(c=="-"){e=l;c=b.charAt(++a[1])}if(c>="0"&&c<="9"){for(c=="0"&&(c=b.charAt(a[1]+1),c>="0"&&c<="9")&&g(SyntaxError());a[1]<d&&(c=b.charAt(a[1]),c>="0"&&c<="9");a[1]++);if(b.charAt(a[1])=="."){for(h=++a[1];h<
d&&(c=b.charAt(h),c>="0"&&c<="9");h++);h==a[1]&&g(SyntaxError());a[1]=h}c=b.charAt(a[1]);if(c=="e"||c=="E"){c=b.charAt(++a[1]);(c=="+"||c=="-")&&a[1]++;for(h=a[1];h<d&&(c=b.charAt(h),c>="0"&&c<="9");h++);h==a[1]&&g(SyntaxError());a[1]=h}return+b.slice(j,a[1])}e&&g(SyntaxError());if(b.slice(a[1],a[1]+4)=="true"){a[1]=a[1]+4;return l}if(b.slice(a[1],a[1]+5)=="false"){a[1]=a[1]+5;return false}if(b.slice(a[1],a[1]+4)=="null"){a[1]=a[1]+4;return m}}g(SyntaxError())}}return"$"},H=function(a,b){var d,c;
b=="$"&&g(SyntaxError());if(typeof b=="string"){if(b.charAt(0)=="@")return b.slice(1);if(b=="["){for(d=[];;c||(c=l)){b=G(a);if(b=="]")break;if(c)if(b==","){b=G(a);b=="}"&&g(SyntaxError())}else g(SyntaxError());b==","&&g(SyntaxError());d.push(H(a,b))}return d}if(b=="{"){for(d={};;c||(c=l)){b=G(a);if(b=="}")break;if(c)if(b==","){b=G(a);b=="}"&&g(SyntaxError())}else g(SyntaxError());(b==","||typeof b!="string"||b.charAt(0)!="@"||G(a)!=":")&&g(SyntaxError());d[b.slice(1)]=H(a,G(a))}return d}g(SyntaxError())}return b},
M=function(a,b,d){d=I(a,b,d);d===k?delete a[b]:a[b]=d},I=function(a,b,d){var c=a[b],f;if(typeof c=="object"&&c)if(n.call(c)=="[object Array]")for(f=c.length;f--;)M(c,f,d);else p(c,function(a){M(c,a,d)});return d.call(a,b,c)},s.parse=function(a,b){var d=[a,0],c=H(d,G(d));G(d)!="$"&&g(SyntaxError());return b&&n.call(b)=="[object Function]"?I((d={},d[""]=c,d),"",b):c})};
}());

// Storage polyfill by Remy Sharp
if (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') (function () {

var Storage = function (type) {
  function createCookie(name, value, days) {
    var date, expires;

    if (days) {
      date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=",
        ca = document.cookie.split(';'),
        i, c;

    for (i=0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1,c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    return null;
  }
  
  function setData(data) {
    data = JSON.stringify(data);
    if (type == 'session') {
      window.name = data;
    } else {
      createCookie('localStorage', data, 365);
    }
  }
  
  function clearData() {
    if (type == 'session') {
      window.name = '';
    } else {
      createCookie('localStorage', '', 365);
    }
  }
  
  function getData() {
    var data = type == 'session' ? window.name : readCookie('localStorage');
    return data ? JSON.parse(data) : {};
  }


  // initialise if there's already data
  var data = getData();

  return {
    length: 0,
    clear: function () {
      data = {};
      this.length = 0;
      clearData();
    },
    getItem: function (key) {
      return data[key] === undefined ? null : data[key];
    },
    key: function (i) {
      // not perfect, but works
      var ctr = 0;
      for (var k in data) {
        if (ctr == i) return k;
        else ctr++;
      }
      return null;
    },
    removeItem: function (key) {
      delete data[key];
      this.length--;
      setData(data);
    },
    setItem: function (key, value) {
      data[key] = value+''; // forces the value to a string
      this.length++;
      setData(data);
    }
  };
};

if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');

})();


// Themulator
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
  var theme = themes[getTheme()].path.replace(" ", "%20");
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
      if (typeof console != "undefined") console.log(html);
      ifrm.document.open();
      ifrm.document.write(html);
      ifrm.document.close();
    });
  });
};
