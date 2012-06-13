var themulatorSets = 6;
var themulatorCollections = 3;
var themulatorItems = 15;
var themulatorPages = 1;

// Dummy items (used for bootstrapping later)
var dummyItem = {
  position: 1,
  next_item: {},
  previous_item: {},
  is_video: false,
  path: "item.html",
  description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  title: "item "
};
var dummyCollection = {
  title: "Collection",
  name: "Collection",
  id: "[collection",
  path: "collection.html",
  description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
};
var dummySet = {
  title: "Set",
  name: "Set",
  description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
  id: "[set",
  path: "set.html",
  cover: {},
  items: []
};
var dummyPage = {
  title: "Page",
  body: "<h1>This is a heading</h1><p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p> <h2>Another heading</h2> <p>It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p> <p>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.</p>",
  id: "[page",
  path: "page.html"
}


// The models object (passed to the template later on)
var models = {
  portfolio: { 
    name: "Bender Rodriquez",
    logo: {
      text: "My logo",
      width: "500",
      height: "200",
      landscape: true,
      portrait: false,
      full_name: "logo.png"
    },
    description: "Photographer"
  },
  contact: {
    email: "my.email@domain.com",
    street_address: "Somestreet 21",
    city: "Mycity",
    postcode: "12345",
    country: "Mycountry",
    phone: "08-56363532",
    facebook: "portfoliodeck",
    facebook_url: "http://facebook.com/portfoliodeck",
    twitter: "portfoliodeck",
    twitter_url: "http://twitter.com/portfoliodeck",
    url: "http://portfoliodeck.com",
    url_title: "My site",
    hcard: '<div class="vcard">' +
      '<span class="fn n">My awesome portfolio</span> ' +
      '<a class="email" href="mailto:my.email@domain.com">my.email@domain.com</a>' +
      '<span class="adr">' +
      '<span class="street-address">Somestreet 21</span>, ' +
      '<span class="postal-code">12345</span> ' +
      '<span class="locality">Mycity</span>, ' +
      '<span class="country-name">Mycountry</span>' +
      '</span>' +
      '<span class="tel">08-56363532</span>' +
      '<a href="http://facebook.com/portfoliodeck" class="url">Facebook</a>' +
      '<a href="http://twitter.com/portfoliodeck" class="url">Twitter</a>' +
      '<a class="url" href="http://portfoliodeck.com">My site</a>' +
      '</div>'
  },
  sets: [],
  collections: [],
  pages: []
};

// Create multiple items
for (var i = 0; i < themulatorItems; i++) {
  dummySet.items[i] = $.extend(true, {}, dummyItem);
}

// Set up some helpers
dummySet.items.first = dummySet.items[0];
dummySet.items.size = themulatorItems;
dummySet.assets = dummySet.items;

// Create multiple sets
for (var s = 0; s < themulatorSets; s++) {
  models.sets[s] = $.extend(true, {}, dummySet);
}
for (var s = 0, l = models.sets.length; s < l; s++) {
  models.sets[s].name = models.sets[s].name + " " + s;
  models.sets[s].title = models.sets[s].name;
  models.sets[s].id = models.sets[s].id + "-" + s + "]";
}

// add sets to collections object
dummyCollection.sets = models.sets;
dummyCollection.sets.first = models.sets[0];

// Create multiple collections
for (var c = 0; c < themulatorCollections; c++) {
  models.collections[c] = $.extend(true, {}, dummyCollection);
}
for (var c = 0, l = models.collections.length; c < l; c++) {
  models.collections[c].name = models.collections[c].name + " " + c;
  models.collections[c].title = models.collections[c].name;
  models.collections[c].id = models.collections[c].id + "-" + c + "]";
}

// Create multiple pages
for (var p = 0; p < themulatorPages; p++) {
  models.pages[p] = $.extend(true, {}, dummyPage);
}
for (var p = 0, l = models.pages.length; p < l; p++) {
  models.pages[p].title = models.pages[p].title + " " + p;
  models.pages[p].id = models.pages[p].id + "-" + p + "]";
}

// The singular objects (for a specific page)
var objects = {
  page: models.pages[0],
  collection: models.collections[0],
  set: models.sets[0],
  item: models.sets[0].items[0]
}

// Set up some helpers
objects.item.set = models.sets[0];
objects.item.set.size = themulatorItems;
