Jollibee Maze Prototype

Files:
- index.html — main single-page prototype
- 404.html — GitHub Pages fallback so direct route URLs can reopen correctly

Published routes:
/
 /menu
 /menu/item/classic
 /menu/item/:key
 /menu/item/classic/customize/chicken
 /menu/item/classic/customize/gravy
 /cart
 /favorites
 /rewards
 /account
 /account/profile
 /account/orders
 /order-again

GitHub Pages:
Upload BOTH index.html and 404.html to the same published folder.
Maze can then observe History API path transitions while the app behaves like one mobile prototype.

Typography:
Nunito variable font from Google Fonts.
Large titles 22px / Black (900)
Small titles 20px / Black (900)
Body 18px / Regular (400)
Small 16px / Regular (400)
Top nav 16px
Bottom nav labels 12px / Black (900)


Update: index.html now also works when opened directly from your computer via file:// and automatically strips the GitHub Pages repository base path before routing.
