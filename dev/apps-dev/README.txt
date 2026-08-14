JOLLIBEE MAZE PROTOTYPE
=======================

Folder structure
----------------
apps/
  index.html
  css/styles.css
  js/app.js
  js/menu-data.js
  menu/index.html
  item/index.html
  customize/index.html
  cart/index.html
  favorites/index.html
  order-again/index.html
  rewards/index.html
  account/index.html

Important behavior
------------------
1. Maze test mode is ON in js/app.js:
   const CONFIG = { testMode:true, clearOnReload:true }

2. During normal page-to-page navigation:
   - cart persists
   - favorites persist
   - item drafts persist
   - saved customizations persist
   - completed orders persist

3. On a TRUE browser refresh/reload:
   - participant-created state is cleared
   - if refreshed on a nested page, prototype returns to /apps/
   - pre-seeded Order Again data remains available because it is defined in menu-data.js

4. To simulate a production-style app later:
   - set testMode:false in js/app.js
   - the state helper will use localStorage instead of sessionStorage
   - reload-reset logic is disabled

Maze baseline after refresh
---------------------------
Favorites: empty
Saved customizations: empty
Cart: empty
Current item drafts: empty
Completed user orders: empty
Order Again: includes 2 seeded sample orders

Dynamic functionality
---------------------
Home:
- Cart icon appears only when cart has items
- Search works
- Order Again and Favorites shortcuts navigate to dynamic pages
- Bottom nav uses real URLs

Menu:
- Horizontal category navigation updates while scrolling
- Clicking a tab scrolls to that category
- Several menu items are clickable

Item:
- Reusable /item/?id=<item-id>
- Required customization groups are generated from menu-data.js
- Heart toggles favorite, fills red, and shows toast
- Save customization for future orders stores per-item defaults
- Returning to the same item applies saved defaults and shows green banner
- Edit from cart reopens item with existing selections prefilled

Customize:
- Reusable /customize/?item=<id>&type=<group>
- Supports Chicken, Side, Drink, Gravy
- Drink supports a nested Soda choice sheet

Cart:
- Shows ONLY items explicitly added or loaded via Reorder
- Delete shows spinner then removes row
- Edit reopens item with selections prefilled
- Place Order stores order in current session history and clears cart

Order Again:
- Contains seeded sample history + orders completed during current session
- Reorder replaces active cart with that previous order

Favorites:
- Populates from hearted items
- Grid/list toggle
- Filled heart removes item immediately

Desktop presentation
--------------------
The shared stylesheet constrains the 440x956 app proportionally to the browser viewport:
- top and bottom stay inside the visible computer screen
- internal app areas scroll inside the simulated phone
