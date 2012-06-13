var assetUrl = function(dimensions, text) {
  var dims = dimensions.split("x");
  if (dims.length < 2) {
    if (dims[0].indexOf("w") >= 0) {
      dims[0] = dims[0].replace(/[^0-9]/g, '');
      dims[1] = Math.max(Math.round(dims[0]*Math.random()), Math.round(dims[0]*0.6));
    } else if (dims[0].indexOf("h") >= 0) {
      dims[0] = dims[0].replace(/[^0-9]/g, '');
      dims[1] = dims[0];
      dims[0] = Math.max(Math.round(dims[1]*Math.random()), Math.round(dims[1]*0.6));
    } else {
      dims[0] = dims[0].replace(/[^0-9]/g, '');
      dims[1] = dims[0];
    }
  } else {
    dims[0] = dims[0].replace(/[^0-9]/g, '');
    dims[1] = dims[1].replace(/[^0-9]/g, '');
  }
  if (text) {
    return "http://placehold.it/" + dims[0] + "x" + dims[1] + "&text=" + text.replace(" ", "+");
  }
  return "http://placekitten.com/" + dims[0] + "/" + dims[1];
};

Liquid.registerFilters({
  image_tag: function(object, dimensions) {
    return "<img src=\"" + assetUrl(dimensions) + "\" alt=\"\">";
  },

  image_url: function(object, dimensions) {
    if (object.text) {
      return assetUrl(dimensions, object.text);
    }
    return assetUrl(dimensions);
  },

  asset_tag: function(object, dimensions) {
    return "<img src=\"" + assetUrl(dimensions) + "\" alt=\"\">";
  },

  path: function(object) {
    return object.path;
  },

  path_with_collection: function(object) {
    return object.path;
  }
});
