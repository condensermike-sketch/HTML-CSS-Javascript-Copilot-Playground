
window.JOLLIBEE_MENU = {
  categories: [
    { id:"nuggets", label:"Chicken Nuggets", items:["chicken-nuggets-5pc"] },
    { id:"limited-time", label:"Limited Time Offers", items:["mangonada-paradise-freeze","mango-freeze"] },
    { id:"chickenjoy", label:"Chickenjoy Fried Chicken", items:["chickenjoy-2pc-2sides"] },
    { id:"sandwiches", label:"Chicken Sandwiches", items:["chicken-sandwich-deluxe"] },
    { id:"meal-deals", label:"Meal Deals", items:[] },
    { id:"perfect-pairs", label:"Perfect Pairs", items:[] },
    { id:"family", label:"Family Meals", items:["family-bucket-8pc"] },
    { id:"tenders", label:"Chicken Tenders", items:["chicken-tenders-4pc-meal-deal"] },
    { id:"burgers", label:"Burgers", items:[] },
    { id:"spaghetti", label:"Jolly Spaghetti", items:["jolly-spaghetti-solo"] },
    { id:"palabok", label:"Palabok Fiesta", items:[] },
    { id:"burger-steak", label:"Burger Steak", items:["burger-steak-2pc","burger-steak-3pc"] },
    { id:"sides", label:"Sides", items:["adobo-rice","side-jolly-spaghetti","jolly-crispy-fries-large","jolly-crispy-fries","mashed-potatoes-large","mashed-potatoes","steamed-rice","large-gravy","gravy"] },
    { id:"drinks", label:"Drinks", items:["pineapple-quencher","pineapple-quencher-half-gallon","bottled-water","mango-coconut-quencher","dragonfruit-sunset-quencher","guava-quencher"] },
    { id:"desserts", label:"Desserts", items:["peach-mango-pie","ube-pie"] }
  ],

  groups: {
    chicken: {
      title:"Chicken",
      options:[
        {value:"All Original", label:"All Original", image:"chicken-all-original.png"},
        {value:"All Spicy", label:"All Spicy", image:"chicken-all-spicy.png"},
        {value:"Half Original / Half Spicy", label:"Half Original / Half Spicy", image:"chicken-half-half.png"}
      ]
    },
    side: {
      title:"Side",
      options:[
        {value:"Jolly Crispy Fries Regular", label:"Jolly Crispy Fries Regular", image:"jolly-crispy-fries.jpg"},
        {value:"Mashed Potato Regular", label:"Mashed Potato Regular", image:"mashed-potatoes.jpg"},
        {value:"Steamed Rice", label:"Steamed Rice", image:"steamed-rice.jpg"},
        {value:"2 pc Biscuit", label:"2 pc Biscuit", image:"2-pc-biscuit.png"},
        {value:"Adobo Rice", label:"Adobo Rice", priceDelta:1.50, image:"adobo-rice.png"},
        {value:"Side of Jolly Spaghetti", label:"Side of Jolly Spaghetti", image:"side-jolly-spaghetti.png"},
        {value:"Coleslaw", label:"Coleslaw", image:"coleslaw.png"}
      ]
    },
    drink: {
      title:"Drink",
      options:[
        {value:"Pineapple Quencher", label:"Pineapple Quencher", priceDelta:0.50, image:"pineapple-quencher.jpg"},
        {value:"Bottled Water", label:"Bottled Water", image:"bottled-water.jpeg"},
        {value:"Fountain Drink", label:"Fountain Drink", nested:"fountain", image:"sodas.jpg"},
        {value:"Coconut Dream Freeze", label:"Coconut Dream Freeze", priceDelta:1.80, image:"coconut-dream-freeze.png"},
        {value:"Strawberry Bliss Freeze", label:"Strawberry Bliss Freeze", priceDelta:1.80, image:"strawberry-bliss-freeze.png"},
        {value:"Lychee Iced Tea", label:"Lychee Iced Tea", priceDelta:0.50, image:"lychee-iced-tea.png"},
        {value:"Passion Fruit Iced Tea", label:"Passion Fruit Iced Tea", priceDelta:0.50, image:"passion-fruit-iced-tea.png"},
        {value:"Mango Coconut Quencher", label:"Mango Coconut Quencher", image:"mango-coconut-quencher.png"},
        {value:"Dragonfruit Sunset Quencher", label:"Dragonfruit Sunset Quencher", image:"dragonfruit-sunset-quencher.png"},
        {value:"Mango Freeze", label:"Mango Freeze", image:"mango-freeze.jpeg"},
        {value:"Guava Quencher", label:"Guava Quencher", image:"guava-quencher.jpg"}
      ]
    },
    side2: {
      title:"Side",
      options:[
        {value:"Jolly Crispy Fries Regular", label:"Jolly Crispy Fries Regular", image:"jolly-crispy-fries.jpg"},
        {value:"Mashed Potato Regular", label:"Mashed Potato Regular", image:"mashed-potatoes.jpg"},
        {value:"Steamed Rice", label:"Steamed Rice", image:"steamed-rice.jpg"},
        {value:"2 pc Biscuit", label:"2 pc Biscuit", image:"2-pc-biscuit.png"},
        {value:"Adobo Rice", label:"Adobo Rice", priceDelta:1.50, image:"adobo-rice.png"},
        {value:"Side of Jolly Spaghetti", label:"Side of Jolly Spaghetti", image:"side-jolly-spaghetti.png"},
        {value:"Coleslaw", label:"Coleslaw", image:"coleslaw.png"}
      ]
    },
    gravy: {
      title:"Gravy",
      options:[
        {value:"Small Chickenjoy Gravy", label:"Small Chickenjoy Gravy"},
        {value:"Regular Chickenjoy Gravy", label:"Regular Chickenjoy Gravy"},
        {value:"No Gravy", label:"No Gravy"}
      ]
    },
    dip: {
      title:"Dip",
      options:[
        {value:"Signature Dipping Sauce", label:"Signature Dipping Sauce", image:"dip-signature.png"},
        {value:"BBQ Dipping Sauce", label:"BBQ Dipping Sauce", image:"dip-bbq.png"},
        {value:"Honey Mustard Dipping Sauce", label:"Honey Mustard Dipping Sauce", image:"dip-honey-mustard.png"},
        {value:"Sriracha Mayo Dipping Sauce", label:"Sriracha Mayo Dipping Sauce", image:"dip-sriracha-mayo.png"},
        {value:"Buttermilk Ranch Dipping Sauce", label:"Buttermilk Ranch Dipping Sauce", image:"dip-buttermilk-ranch.png"}
      ]
    },
    sauces: {
      title:"Sauces",
      quantity:true,
      options:[
        {value:"Signature Dipping Sauce", label:"Signature Dipping Sauce", priceDelta:0.50, image:"dip-signature.png"},
        {value:"Small Chickenjoy Gravy", label:"Small Chickenjoy Gravy", priceDelta:1.29, image:"dip-small-gravy.png"},
        {value:"BBQ Dipping Sauce", label:"BBQ Dipping Sauce", priceDelta:0.50, image:"dip-bbq.png"},
        {value:"Honey Mustard Dipping Sauce", label:"Honey Mustard Dipping Sauce", priceDelta:0.50, image:"dip-honey-mustard.png"},
        {value:"Sriracha Mayo Dipping Sauce", label:"Sriracha Mayo Dipping Sauce", priceDelta:0.50, image:"dip-sriracha-mayo.png"},
        {value:"Buttermilk Ranch Dipping Sauce", label:"Buttermilk Ranch Dipping Sauce", priceDelta:0.50, image:"dip-buttermilk-ranch.png"}
      ]
    }
  },

  nestedGroups: {
    fountain: {
      title:"Fountain Drink",
      options:[
        {value:"Pepsi", image:"pepsi.png"},
        {value:"Diet Pepsi", image:"diet-pepsi.png"},
        {value:"Mountain Dew", image:"mountain-dew.png"},
        {value:"Mug Root Beer", image:"mug-root-beer.png"},
        {value:"Raspberry Iced Tea", image:"raspberry-iced-tea.png"},
        {value:"Pink Lemonade", image:"pink-lemonade.png"},
        {value:"Starry Lemon-lime", image:"starry-lemon-lime.png"},
        {value:"Brisk Lemon Iced Tea", image:"brisk-lemon-iced-tea.png"}
      ]
    }
  },

  items: {
    "chicken-nuggets-5pc":{
      id:"chicken-nuggets-5pc",
      category:"nuggets",
      name:"5pc Chicken Nuggets",
      shortName:"5pc Chicken Nuggets",
      description:"Crispy, juicy, perfectly seasoned chicken breast nuggets with 100% white meat made for dipping or enjoying on their own.",
      price:4.49,
      calories:0,
      customizations:["sauces"],
      image:"chicken-nuggets-5pc.jpg"
    },
    "mangonada-paradise-freeze":{
      id:"mangonada-paradise-freeze",
      category:"limited-time",
      name:"Mangonada Paradise Freeze",
      shortName:"Mangonada Paradise Freeze",
      description:"Refreshing mango blended with tangy chamoy and a zesty chili-lime twist — a vibrant, sweet, and spicy freeze that awakens your taste buds with every sip.",
      price:5.29,
      calories:0,
      customizations:[],
      image:"mangonada-paradise-freeze.svg"
    },
    "mango-freeze":{
      id:"mango-freeze", category:"limited-time", name:"Mango Freeze", shortName:"Mango Freeze",
      description:"Refreshing mango blended into a smooth freeze — a pure, fruity delight that's refreshingly sweet with every sip.", price:5.29, calories:0, customizations:[],
      image:"mango-freeze.jpeg"
    },
    "chickenjoy-2pc-2sides":{
      id:"chickenjoy-2pc-2sides",
      category:"chickenjoy",
      name:"2pc Chickenjoy w/ Biscuit + 2 Sides",
      shortName:"2pc Chickenjoy + 2 Sides",
      description:"2pc of our next-level crispy, next-level juicy Chickenjoy fried chicken served with 2 regular sides.",
      price:10.99,
      calories:1050,
      customizations:["chicken","side","side2"],
      image:"chickenjoy-2pc-2sides.jpg"
    },
    "chicken-sandwich-deluxe":{
      id:"chicken-sandwich-deluxe",
      category:"sandwiches",
      name:"Spicy Chicken Sandwich Combo",
      shortName:"Spicy Chicken Sandwich Combo",
      description:"A crispy juicy hand-breaded chicken breast fillet, spread with sriracha mayo and served with fresh jalapenos on a toasted brioche bun with a side of regular Jolly Crispy Fries and fountain drink.",
      price:10.49,
      calories:910,
      customizations:["side","drink"],
      image:"spicy-chicken-sandwich-combo.png"
    },
    "family-bucket-8pc":{
      id:"family-bucket-8pc",
      category:"family",
      name:"Jolly Spaghetti Family Pack",
      shortName:"Jolly Spaghetti Family Pack",
      description:"Our one-of-a-kind spaghetti topped with our signature sweet-style sauce, loaded, ground beef, and hotdog and topped with melty cheese. Serves 3-5.",
      price:19.99,
      calories:1830,
      customizations:[],
      image:"jolly-spaghetti-family-pack.jpg"
    },
    "chicken-tenders-4pc-meal-deal":{
      id:"chicken-tenders-4pc-meal-deal",
      category:"tenders",
      name:"4pc Chicken Tenders",
      shortName:"4pc Chicken Tenders",
      description:"4 crispy, hand-breaded Jollibee Chicken Tenders made with 100% juicy white meat, served with our Signature Tender Sauce.",
      price:9.29,
      calories:0,
      customizations:["dip"],
      image:"chicken-tenders-4pc.jpg"
    },
    "jolly-spaghetti-solo":{
      id:"jolly-spaghetti-solo",
      category:"spaghetti",
      name:"Jolly Spaghetti",
      shortName:"Jolly Spaghetti",
      description:"Our one-of-a-kind spaghetti topped with our signature sweet-style sauce, loaded, ground beef, and hotdog and topped with melty cheese.",
      price:5.99,
      calories:0,
      customizations:[],
      image:"jolly-spaghetti-solo.jpg"
    },
    "burger-steak-2pc":{
      id:"burger-steak-2pc",
      category:"burger-steak",
      name:"2pc Burger Steak w/ 1 Side",
      shortName:"2pc Burger Steak",
      description:"2 beef burger patties smothered with mushroom gravy. Served with white rice.",
      price:10.99,
      calories:570,
      customizations:["side"],
      image:"burger-steak-2pc.jpg"
    },
    "burger-steak-3pc":{
      id:"burger-steak-3pc",
      category:"burger-steak",
      name:"3pc Burger Steak w/ 1 Side & Drink",
      shortName:"3pc Burger Steak",
      description:"3 beef burger patties smothered with mushroom gravy. Served with white rice and a fountain drink.",
      price:15.99,
      calories:750,
      customizations:["side","drink"],
      image:"burger-steak-2pc.jpg"
    },

    "adobo-rice":{
      id:"adobo-rice", category:"sides", name:"Adobo Rice", shortName:"Adobo Rice",
      description:"A side of Adobo Rice.", price:3.99, calories:250, customizations:[],
      image:"adobo-rice.png"
    },
    "side-jolly-spaghetti":{
      id:"side-jolly-spaghetti", category:"sides", name:"Side Jolly Spaghetti", shortName:"Side Jolly Spaghetti",
      description:"A side portion of our one-of-a-kind Jolly Spaghetti.", price:3.99, calories:360, customizations:[],
      image:"side-jolly-spaghetti.png"
    },
    "jolly-crispy-fries-large":{
      id:"jolly-crispy-fries-large", category:"sides", name:"Jolly Crispy Fries Large", shortName:"Large Jolly Crispy Fries",
      description:"A large serving of our Jolly Crispy Fries.", price:3.99, calories:520, customizations:[],
      image:"jolly-crispy-fries.jpg"
    },
    "jolly-crispy-fries":{
      id:"jolly-crispy-fries", category:"sides", name:"Jolly Crispy Fries", shortName:"Jolly Crispy Fries",
      description:"A regular serving of our Jolly Crispy Fries.", price:2.69, calories:340, customizations:[],
      image:"jolly-crispy-fries.jpg"
    },
    "mashed-potatoes-large":{
      id:"mashed-potatoes-large", category:"sides", name:"Mashed Potatoes Large", shortName:"Large Mashed Potatoes",
      description:"A large serving of our mashed potatoes and gravy.", price:3.99, calories:340, customizations:[],
      image:"mashed-potatoes.jpg"
    },
    "mashed-potatoes":{
      id:"mashed-potatoes", category:"sides", name:"Mashed Potatoes", shortName:"Mashed Potatoes",
      description:"A regular serving of our mashed potatoes and gravy.", price:2.69, calories:170, customizations:[],
      image:"mashed-potatoes.jpg"
    },
    "steamed-rice":{
      id:"steamed-rice", category:"sides", name:"Steamed Rice", shortName:"Steamed Rice",
      description:"A side of steamed rice.", price:2.69, calories:190, customizations:[],
      image:"steamed-rice.jpg"
    },
    "large-gravy":{
      id:"large-gravy", category:"sides", name:"Large Gravy", shortName:"Large Gravy",
      description:"Our savory gravy in a large size.", price:2.49, calories:70, customizations:[],
      image:"large-gravy.png"
    },
    "gravy":{
      id:"gravy", category:"sides", name:"Gravy", shortName:"Gravy",
      description:"Our Savory Gravy", price:1.29, calories:25, customizations:[],
      image:"gravy.jpg"
    },

    "pineapple-quencher":{
      id:"pineapple-quencher", category:"drinks", name:"Pineapple Quencher", shortName:"Pineapple Quencher",
      description:"A sweet and refreshing taste of the Philippines with our signature Pineapple Quencher.", price:3.99, calories:180, customizations:[],
      image:"pineapple-quencher.jpg"
    },
    "pineapple-quencher-half-gallon":{
      id:"pineapple-quencher-half-gallon", category:"drinks", name:"Half Gallon Pineapple Quencher", shortName:"Half Gallon Pineapple Quencher",
      description:"Half gallon of our sweet and refreshing signature Pineapple Quencher.", price:18.99, calories:0, customizations:[],
      image:"pineapple-quencher-half-gallon.jpeg"
    },
    "bottled-water":{
      id:"bottled-water", category:"drinks", name:"Bottled Water", shortName:"Bottled Water",
      description:"", price:3.49, calories:0, customizations:[],
      image:"bottled-water.jpeg"
    },
    "mango-coconut-quencher":{
      id:"mango-coconut-quencher", category:"drinks", name:"Mango Coconut Quencher", shortName:"Mango Coconut Quencher",
      description:"Our tropical inspired blend of strawberry, passionfruit and coconut served with mango jelly", price:4.99, calories:160, customizations:[],
      image:"mango-coconut-quencher.png"
    },
    "dragonfruit-sunset-quencher":{
      id:"dragonfruit-sunset-quencher", category:"drinks", name:"Dragonfruit Sunset Quencher", shortName:"Dragonfruit Sunset Quencher",
      description:"Our mango and passionfruit quencher served with real dragon fruit bits", price:4.99, calories:150, customizations:[],
      image:"dragonfruit-sunset-quencher.png"
    },
    "guava-quencher":{
      id:"guava-quencher", category:"drinks", name:"Guava Quencher", shortName:"Guava Quencher",
      description:"Bursting with tropical guava and hints of strawberry and passion fruit. A sweet, refreshing cool-down. Garnishment not included.", price:3.99, calories:120, customizations:[],
      image:"guava-quencher.jpg"
    },

    "peach-mango-pie":{
      id:"peach-mango-pie", category:"desserts", name:"Peach Mango Pie", shortName:"Peach Mango Pie",
      description:"Sweet and flaky Peach Mango Pie made with real Philippine Mangoes", price:2.99, calories:270, customizations:[],
      image:"peach-mango-pie.jpg"
    },
    "ube-pie":{
      id:"ube-pie", category:"desserts", name:"Ube Pie", shortName:"Ube Pie",
      description:"Sweet and flaky Ube pie filled with real ube. Ube or purple yam has a smooth texture, and a mild sweet flavor.", price:2.99, calories:310, customizations:[],
      image:"ube-pie.png"
    }
  },

  upsells:[
    {id:"peach-mango-pie", name:"Peach Mango Pie", price:2.99, calories:270},
    {id:"steamed-rice", name:"Steamed Rice", price:2.99, calories:190},
    {id:"mango-freeze", name:"Mango Freeze", price:5.29, calories:0}
  ],

  seededOrders:[
    {
      id:"seed-order-1",
      dateLabel:"Aug 10",
      fulfillment:"Counter Pickup · Beverly",
      items:[
        { itemId:"chicken-sandwich-deluxe", quantity:1, customizations:{side:"Jolly Crispy Fries Regular",drink:"Bottled Water"} },
        { addonId:"peach-mango-pie", quantity:1 }
      ]
    },
    {
      id:"seed-order-2",
      dateLabel:"Jul 28",
      fulfillment:"Drive-Thru · Beverly",
      items:[
        { itemId:"family-bucket-8pc", quantity:1, customizations:{} },
        { itemId:"chicken-nuggets-5pc", quantity:1, customizations:{sauces:{"BBQ Dipping Sauce":1,"Honey Mustard Dipping Sauce":1}} }
      ]
    }
  ],

  seededFavorites:[
    { itemId:"chicken-sandwich-deluxe", customizations:{side:"Jolly Crispy Fries Regular",drink:"Bottled Water"} }
  ]
};
