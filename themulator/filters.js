var assetUrl = function(dimensions) {
  var dims = dimensions.split("x");
  if (dims.length < 2) {
    if (dims[0].indexOf("w")) {
      dims[0] = dims[0].replace(/[^0-9]/g, '');
      dims[1] = Math.round(dims[0]*0.75);
    } else if (dims[0].indexOf("h")) {
      dims[0] = dims[0].replace(/[^0-9]/g, '');
      dims[1] = dims[0];
      dims[0] = Math.round(dims[1]*0.75);
    } else {
      dims[0] = dims[0].replace(/[^0-9]/g, '');
      dims[1] = dims[0];
    }
  } else {
    dims[0] = dims[0].replace(/[^0-9]/g, '');
    dims[1] = dims[1].replace(/[^0-9]/g, '');
  }
  return "http://placekitten.com/" + dims[0] + "/" + dims[1];
};

Liquid.registerFilters({
  image_tag: function(object, dimensions) {
    return "<img src=\"" + assetUrl(dimensions) + "\">";
  },

  image_url: function(object, dimensions) {
    return assetUrl(dimensions);
  },

  asset_tag: function(object, dimensions) {
    return "<img src=\"" + assetUrl(dimensions) + "\">";
  },

  path: function(object) {
    return object.path;
  },

  path_with_collection: function(object) {
    return object.path;
  }
});