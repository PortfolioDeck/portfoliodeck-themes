var themulatorSets = 6;
var themulatorCollections = 3;
var themulatorItems = 15;

// The models object, passed to the template later on
var models = {
  portfolio: { 
    name: "My awesome portfolio",
    logo: {
      text: "Company name",
      width: "500",
      height: "200",
      landscape: true,
      portrait: false,
      full_name: "logo.png"
    },
    description: "This is my portfolio and I like it!"
  },
  contact: {
    email: "my.email@domain.com",
    street_address: "Somestreet 21",
    city: "Mycity",
    postcode: "12345",
    country: "Mycountry",
    phone: "08-56363532",
    facebook: "http://facebook.com/portfoliodeck",
    twitter: "http://twitter.com/portfoliodeck",
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
  sets: [
    {
      title: "Set",
      name: "Set",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      id: "[set",
      path: "set.html",
      cover: {},
      items: [
        {
          position: 1,
          next_item: {},
          previous_item: {},
          is_video: false,
          path: "item.html",
          description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
          title: "item "
        }
      ]
    }
  ],
  collections: [
    {
      title: "Collection",
      name: "Collection",
      id: "[collection",
      path: "collection.html",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
    }
  ],
  pages: [
    {
      title: "My page",
      body: "<h1>This is a heading</h1><p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p> <h2>Another heading</h2> <p>It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p> <p>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.</p>",
      id: "[page-0]",
      path: "page.html"
    }
  ]
};

// Create multiple items
for (var i = 1; i < themulatorItems; i++) {
  models.sets[0].items[i] = $.extend(true, {}, models.sets[0].items[0]);
}

// Set up some helpers
models.sets[0].items.first = models.sets[0].items[0];
models.sets[0].items.size = themulatorItems;
models.sets[0].assets = models.sets[0].items;

// Create multiple sets
for (var s = 1; s < themulatorSets; s++) {
  models.sets[s] = $.extend(true, {}, models.sets[0]);
}
for (var s = 0, l = models.sets.length; s < l; s++) {
  models.sets[s].name = models.sets[s].name + " " + s;
  models.sets[s].title = models.sets[s].name;
  models.sets[s].id = models.sets[s].id + "-" + s + "]";
}

// add sets to collections object
models.collections[0].sets = models.sets;

// Create multiple collections
for (var c = 1; c < themulatorCollections; c++) {
  models.collections[c] = $.extend(true, {}, models.collections[0]);
}
for (var c = 0, l = models.collections.length; c < l; c++) {
  models.collections[c].name = models.collections[c].name + " " + c;
  models.collections[c].title = models.collections[c].name;
  models.collections[c].id = models.collections[c].id + "-" + c + "]";
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
