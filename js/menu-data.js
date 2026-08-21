/* ============================================================
   BREW & BEAN — Menu data
   Edit prices/descriptions here. Images live in assets/images/menu/<slug>.svg
   Replace each SVG with a real photo (same filename, .jpg/.webp) and update `img`.
   ============================================================ */
window.MENU_CATEGORIES = [
  { id: "coffee",    label: "Coffee",    blurb: "Single-origin espresso, slow pour-overs and cold brews." },
  { id: "tea",       label: "Tea",       blurb: "Loose-leaf classics, spiced chai and botanical iced teas." },
  { id: "desserts",  label: "Desserts",  blurb: "Baked in-house every morning." },
  { id: "snacks",    label: "Snacks",    blurb: "Toasts, sandwiches and sharing plates." },
  { id: "breakfast", label: "Breakfast", blurb: "Served all day, the way it should be." }
];

const I = (s) => `assets/images/menu/${s}.svg`;
window.MENU = [
  // ---- Coffee ----
  { id:"espresso", cat:"coffee", name:"Espresso", price:180, desc:"Double shot of our house blend — dark chocolate, hazelnut, long finish.", img:I("espresso"), tags:["hot"] },
  { id:"cortado", cat:"coffee", name:"Cortado", price:210, desc:"Equal parts espresso and silky steamed milk in a small glass.", img:I("cortado"), tags:["hot"] },
  { id:"flat-white", cat:"coffee", name:"Flat White", price:260, desc:"Velvety micro-foam over a double ristretto. Our most-ordered cup.", img:I("flat-white"), tags:["hot","popular"] },
  { id:"cappuccino", cat:"coffee", name:"Cappuccino", price:240, desc:"Classic thirds — espresso, steamed milk, airy foam. Dusting of cocoa.", img:I("cappuccino"), tags:["hot"] },
  { id:"cafe-latte", cat:"coffee", name:"Café Latte", price:250, desc:"Smooth and milky; choose oat, almond or soy at no extra charge.", img:I("cafe-latte"), tags:["hot"] },
  { id:"caramel-latte", cat:"coffee", name:"Caramel Latte", price:290, desc:"House-made burnt caramel, espresso, steamed milk. A little indulgent.", img:I("caramel-latte"), tags:["hot","popular"] },
  { id:"cold-brew", cat:"coffee", name:"Cold Brew", price:280, desc:"18-hour steep, served over ice. Naturally sweet, zero bitterness.", img:I("cold-brew"), tags:["cold","popular"] },
  { id:"iced-americano", cat:"coffee", name:"Iced Americano", price:220, desc:"Double espresso over ice and cold filtered water.", img:I("iced-americano"), tags:["cold"] },
  { id:"affogato", cat:"coffee", name:"Affogato", price:320, desc:"Vanilla bean gelato drowned in a hot double shot.", img:I("affogato"), tags:["dessert"] },
  { id:"vietnamese-iced-coffee", cat:"coffee", name:"Vietnamese Iced Coffee", price:270, desc:"Strong dark roast, condensed milk, lots of ice.", img:I("vietnamese-iced-coffee"), tags:["cold"] },
  // ---- Tea ----
  { id:"masala-chai", cat:"tea", name:"Masala Chai", price:150, desc:"Slow-brewed with fresh ginger, cardamom and black pepper.", img:I("masala-chai"), tags:["hot","popular"] },
  { id:"earl-grey", cat:"tea", name:"Earl Grey", price:180, desc:"Bergamot-scented black tea, served with lemon or milk.", img:I("earl-grey"), tags:["hot"] },
  { id:"jasmine-green", cat:"tea", name:"Jasmine Green", price:190, desc:"Delicate green tea scented with jasmine blossoms.", img:I("jasmine-green"), tags:["hot"] },
  { id:"hibiscus-iced-tea", cat:"tea", name:"Hibiscus Iced Tea", price:210, desc:"Tart, ruby-red and refreshing. Lightly sweetened.", img:I("hibiscus-iced-tea"), tags:["cold"] },
  { id:"kashmiri-kahwa", cat:"tea", name:"Kashmiri Kahwa", price:220, desc:"Green tea with saffron, cinnamon and crushed almonds.", img:I("kashmiri-kahwa"), tags:["hot"] },
  { id:"matcha-latte", cat:"tea", name:"Matcha Latte", price:290, desc:"Ceremonial-grade matcha whisked into steamed milk.", img:I("matcha-latte"), tags:["hot"] },
  // ---- Desserts ----
  { id:"tiramisu", cat:"desserts", name:"Tiramisu", price:340, desc:"Espresso-soaked savoiardi, mascarpone cream, cocoa.", img:I("tiramisu"), tags:["popular"] },
  { id:"basque-cheesecake", cat:"desserts", name:"Basque Cheesecake", price:360, desc:"Burnt-top, custardy centre. Served with seasonal fruit.", img:I("basque-cheesecake"), tags:[] },
  { id:"dark-chocolate-tart", cat:"desserts", name:"Dark Chocolate Tart", price:320, desc:"70% single-origin ganache, flaky shortcrust, sea salt.", img:I("dark-chocolate-tart"), tags:[] },
  { id:"almond-croissant", cat:"desserts", name:"Almond Croissant", price:190, desc:"Twice-baked, frangipane-filled, toasted almonds.", img:I("almond-croissant"), tags:["popular"] },
  { id:"cinnamon-roll", cat:"desserts", name:"Cinnamon Roll", price:210, desc:"Soft, sticky, cream-cheese glaze. Best warm.", img:I("cinnamon-roll"), tags:[] },
  { id:"banana-bread", cat:"desserts", name:"Banana Bread", price:170, desc:"Walnut-studded, served toasted with salted butter.", img:I("banana-bread"), tags:[] },
  // ---- Snacks ----
  { id:"avocado-toast", cat:"snacks", name:"Avocado Toast", price:320, desc:"Sourdough, smashed avocado, chilli flakes, lime, poached egg (+₹60).", img:I("avocado-toast"), tags:["veg"] },
  { id:"grilled-cheese", cat:"snacks", name:"Grilled Cheese", price:280, desc:"Three-cheese melt on buttered sourdough with tomato chutney.", img:I("grilled-cheese"), tags:["veg"] },
  { id:"chicken-pesto-sandwich", cat:"snacks", name:"Chicken Pesto Sandwich", price:340, desc:"Grilled chicken, basil pesto, sun-dried tomato, rocket, ciabatta.", img:I("chicken-pesto-sandwich"), tags:[] },
  { id:"falafel-wrap", cat:"snacks", name:"Falafel Wrap", price:310, desc:"Crisp falafel, hummus, pickled onion, tahini, warm flatbread.", img:I("falafel-wrap"), tags:["veg"] },
  { id:"truffle-fries", cat:"snacks", name:"Truffle Fries", price:260, desc:"Hand-cut fries, truffle oil, parmesan, herbs.", img:I("truffle-fries"), tags:["veg","popular"] },
  { id:"hummus-platter", cat:"snacks", name:"Hummus Platter", price:330, desc:"Classic and beetroot hummus, olives, pita, crudités.", img:I("hummus-platter"), tags:["veg"] },
  // ---- Breakfast ----
  { id:"big-breakfast", cat:"breakfast", name:"Brew & Bean Big Breakfast", price:450, desc:"Eggs your way, sausages, grilled tomato, mushrooms, beans, sourdough.", img:I("big-breakfast"), tags:["popular"] },
  { id:"shakshuka", cat:"breakfast", name:"Shakshuka", price:360, desc:"Eggs baked in spiced tomato-pepper sauce, feta, warm bread.", img:I("shakshuka"), tags:["veg"] },
  { id:"pancake-stack", cat:"breakfast", name:"Pancake Stack", price:320, desc:"Buttermilk pancakes, maple syrup, berries, whipped butter.", img:I("pancake-stack"), tags:["veg"] },
  { id:"granola-bowl", cat:"breakfast", name:"Granola Bowl", price:290, desc:"House granola, Greek yoghurt, honey, seasonal fruit.", img:I("granola-bowl"), tags:["veg"] },
  { id:"eggs-benedict", cat:"breakfast", name:"Eggs Benedict", price:380, desc:"Poached eggs, ham, hollandaise on toasted English muffin.", img:I("eggs-benedict"), tags:[] },
  { id:"masala-omelette", cat:"breakfast", name:"Masala Omelette", price:260, desc:"Three-egg omelette with onion, tomato, green chilli, coriander. Toast on the side.", img:I("masala-omelette"), tags:["veg"] }
];
