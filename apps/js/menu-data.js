
window.JOLLIBEE_MENU = {
  categories: [
    { id:"chickenjoy", label:"Chickenjoy Fried Chicken", items:["chickenjoy-2pc-side","chickenjoy-2pc-side-drink"] },
    { id:"sandwiches", label:"Chicken Sandwiches", items:["chicken-sandwich-deluxe"] },
    { id:"meal-deals", label:"Meal Deals", items:["chickenjoy-meal-deal"] },
    { id:"perfect-pairs", label:"Perfect Pairs", items:["chickenjoy-1pc-spaghetti","chickenjoy-2pc-spaghetti"] },
    { id:"family", label:"Family Meals", items:["family-bucket-8pc"] },
    { id:"tenders", label:"Chicken Tenders", items:[] },
    { id:"burgers", label:"Burgers", items:[] },
    { id:"spaghetti", label:"Jolly Spaghetti", items:["jolly-spaghetti-solo"] },
    { id:"palabok", label:"Palabok Fiesta", items:[] },
    { id:"burger-steak", label:"Burger Steak", items:[] },
    { id:"sides", label:"Sides", items:[] },
    { id:"drinks", label:"Drinks", items:[] },
    { id:"desserts", label:"Desserts", items:[] }
  ],

  groups: {
    chicken: {
      title:"Chicken",
      options:[
        {value:"All Original", label:"All Original"},
        {value:"All Spicy", label:"All Spicy"},
        {value:"Half Original / Half Spicy", label:"Half Original / Half Spicy"}
      ]
    },
    side: {
      title:"Side",
      options:[
        {value:"Jolly Crispy Fries Regular", label:"Jolly Crispy Fries Regular"},
        {value:"Mashed Potato Regular", label:"Mashed Potato Regular"},
        {value:"Steamed Rice", label:"Steamed Rice"},
        {value:"2 pc Biscuit", label:"2 pc Biscuit"},
        {value:"Adobo Rice", label:"Adobo Rice", priceDelta:1.50},
        {value:"Side of Jolly Spaghetti", label:"Side of Jolly Spaghetti"},
        {value:"Coleslaw", label:"Coleslaw"}
      ]
    },
    drink: {
      title:"Drink",
      options:[
        {value:"Bottled Water", label:"Bottled Water"},
        {value:"Soda", label:"Soda", nested:"soda"},
        {value:"Mango Freeze", label:"Mango Freeze", priceDelta:1.50}
      ]
    },
    gravy: {
      title:"Gravy",
      options:[
        {value:"Small Chickenjoy Gravy", label:"Small Chickenjoy Gravy"},
        {value:"Regular Chickenjoy Gravy", label:"Regular Chickenjoy Gravy"},
        {value:"No Gravy", label:"No Gravy"}
      ]
    }
  },

  nestedGroups: {
    soda: {
      title:"Choose a Soda",
      options:["Mountain Dew","Pink Lemonade","Brisk Lemon Iced Tea","Mug Root Beer","Pepsi","Diet Pepsi"]
    }
  },

  items: {
    "chickenjoy-2pc-side":{
      id:"chickenjoy-2pc-side",
      category:"chickenjoy",
      name:"2pc Chickenjoy w/ Biscuit + 1 Side",
      shortName:"2pc Chickenjoy Meal",
      description:"2pc of our next-level crispy, next-level juicy Chickenjoy fried chicken served with a buttermilk biscuit and your choice of one side.",
      price:8.99,
      calories:880,
      customizations:["chicken","side"]
    },
    "chickenjoy-2pc-side-drink":{
      id:"chickenjoy-2pc-side-drink",
      category:"chickenjoy",
      name:"2pc Chickenjoy w/ Biscuit + 1 Side and Drink",
      shortName:"2pc Chickenjoy Combo",
      description:"2pc Chickenjoy with a biscuit, one side and your choice of drink.",
      price:11.49,
      calories:1040,
      customizations:["chicken","side","drink"]
    },
    "chicken-sandwich-deluxe":{
      id:"chicken-sandwich-deluxe",
      category:"sandwiches",
      name:"Chicken Sandwich Deluxe Meal",
      shortName:"Chicken Sandwich Meal",
      description:"Crispy chicken sandwich served with your choice of side and drink.",
      price:10.99,
      calories:990,
      customizations:["side","drink"]
    },
    "chickenjoy-meal-deal":{
      id:"chickenjoy-meal-deal",
      category:"meal-deals",
      name:"2pc Chickenjoy Meal Deal",
      shortName:"Chickenjoy Meal Deal",
      description:"2pc crispy, juicy Chickenjoy with one side and a drink.",
      price:12.00,
      calories:1080,
      customizations:["chicken","side","drink"]
    },
    "chickenjoy-1pc-spaghetti":{
      id:"chickenjoy-1pc-spaghetti",
      category:"perfect-pairs",
      name:"1pc Chickenjoy w/ Jolly Spaghetti",
      shortName:"1pc Chickenjoy + Spaghetti",
      description:"One piece of Chickenjoy paired with Jollibee's signature Jolly Spaghetti.",
      price:10.99,
      calories:840,
      customizations:["chicken","gravy"]
    },
    "chickenjoy-2pc-spaghetti":{
      id:"chickenjoy-2pc-spaghetti",
      category:"perfect-pairs",
      name:"2pc Chickenjoy w/ Jolly Spaghetti",
      shortName:"2pc Chickenjoy + Spaghetti",
      description:"Two pieces of Chickenjoy paired with Jollibee's signature Jolly Spaghetti.",
      price:11.99,
      calories:1050,
      customizations:["chicken","gravy"]
    },
    "family-bucket-8pc":{
      id:"family-bucket-8pc",
      category:"family",
      name:"8pc Chickenjoy Family Bucket",
      shortName:"8pc Chickenjoy Bucket",
      description:"Eight pieces of our signature Chickenjoy for sharing.",
      price:26.99,
      calories:2840,
      customizations:["chicken"]
    },
    "jolly-spaghetti-solo":{
      id:"jolly-spaghetti-solo",
      category:"spaghetti",
      name:"Jolly Spaghetti Solo",
      shortName:"Jolly Spaghetti",
      description:"Jollibee's signature sweet-style spaghetti topped with savory sauce.",
      price:6.99,
      calories:610,
      customizations:[]
    }
  },

  upsells:[
    {id:"peach-mango-pie", name:"Peach Mango Pie", price:2.99, calories:270},
    {id:"steamed-rice", name:"Steamed Rice", price:2.99, calories:190},
    {id:"mango-freeze", name:"Mango Freeze", price:5.29, calories:320},
    {id:"pie-snack-pack", name:"6pc Pie Snack Pack", price:16.00, calories:1620}
  ],

  seededOrders:[
    {
      id:"seed-order-1",
      dateLabel:"Aug 3",
      fulfillment:"Counter Pickup · Beverly",
      items:[
        { itemId:"chickenjoy-2pc-side", quantity:1, customizations:{chicken:"All Original",side:"Jolly Crispy Fries Regular"} }
      ]
    },
    {
      id:"seed-order-2",
      dateLabel:"Jul 25",
      fulfillment:"Drive-Thru · Beverly",
      items:[
        { itemId:"chickenjoy-2pc-side-drink", quantity:1, customizations:{chicken:"All Spicy",side:"Mashed Potato Regular",drink:"Pink Lemonade"} },
        { addonId:"peach-mango-pie", quantity:1 }
      ]
    }
  ]
};
