
(function(){
  const CONFIG = {
    testMode: true,
    clearOnReload: true
  };
  window.APP_CONFIG = CONFIG;

  function appBase(){
    const href = location.href;
    if(location.protocol === "file:"){
      const idx = href.indexOf("/apps/");
      return idx >= 0 ? href.slice(0, idx + 6) : new URL("../", href).href;
    }
    const marker = "/apps/";
    const idx = location.pathname.indexOf(marker);
    if(idx >= 0) return location.origin + location.pathname.slice(0, idx + marker.length);
    return location.origin + "/";
  }

  function hrefFor(path){
    return new URL(path.replace(/^\//,""), appBase()).href;
  }

  const PREFIX = "jolliMaze.";
  function store(){ return CONFIG.testMode ? sessionStorage : localStorage; }

  function get(key, fallback){
    try{
      const raw = store().getItem(PREFIX+key);
      return raw === null ? fallback : JSON.parse(raw);
    }catch(e){ return fallback; }
  }
  function set(key, value){ store().setItem(PREFIX+key, JSON.stringify(value)); }
  function remove(key){ store().removeItem(PREFIX+key); }

  function clearParticipantState(){
    const target = store();
    [...Array(target.length)].forEach((_,i)=>{});
    const keys=[];
    for(let i=0;i<target.length;i++){
      const k=target.key(i);
      if(k && k.startsWith(PREFIX)) keys.push(k);
    }
    keys.forEach(k=>target.removeItem(k));
  }

  function navType(){
    const e = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    return e ? e.type : "";
  }

  // Maze mode: a true browser reload becomes a fresh participant.
  // Ordinary link navigation between prototype pages is "navigate", so state survives.
  if(CONFIG.testMode && CONFIG.clearOnReload && navType()==="reload"){
    clearParticipantState();
    if(!location.pathname.endsWith("/apps/") && !location.pathname.endsWith("/apps/index.html")){
      location.replace(hrefFor(""));
      return;
    }
  }

  function currentItemDraft(itemId){
    const drafts = get("drafts",{});
    return drafts[itemId] || {quantity:1, customizations:{}};
  }
  function saveItemDraft(itemId,draft){
    const drafts=get("drafts",{});
    drafts[itemId]=draft;
    set("drafts",drafts);
  }
  function clearItemDraft(itemId){
    const drafts=get("drafts",{});
    delete drafts[itemId];
    set("drafts",drafts);
  }

  function savedCustomizations(itemId){
    const all=get("savedCustomizations",{});
    return all[itemId] || null;
  }
  function saveCustomizations(itemId,customizations){
    const all=get("savedCustomizations",{});
    all[itemId]={...customizations};
    set("savedCustomizations",all);
  }

  function favorites(){ return get("favorites",[]); }
  function isFavorite(itemId){ return favorites().some(f=>f.itemId===itemId); }
  function favoriteItem(itemId,customizations){
    let favs=favorites();
    const idx=favs.findIndex(f=>f.itemId===itemId);
    if(idx>=0) favs.splice(idx,1);
    else favs.unshift({itemId,customizations:{...customizations}});
    set("favorites",favs);
    return idx<0;
  }
  function removeFavorite(itemId){
    set("favorites",favorites().filter(f=>f.itemId!==itemId));
  }

  // Add-on favorites use addonId so existing menu-item favorite behavior is unchanged.
  function isAddonFavorite(addonId){ return favorites().some(f=>f.addonId===addonId); }
  function favoriteAddon(addonId){
    let favs=favorites();
    const idx=favs.findIndex(f=>f.addonId===addonId);
    if(idx>=0) favs.splice(idx,1);
    else favs.unshift({addonId});
    set("favorites",favs);
    return idx<0;
  }
  function removeAddonFavorite(addonId){
    set("favorites",favorites().filter(f=>f.addonId!==addonId));
  }

  function cart(){ return get("cart",[]); }
  function setCart(c){ set("cart",c); }
  function cartCount(){ return cart().reduce((n,x)=>n+(x.quantity||1),0); }
  function addCartItem(entry){ const c=cart(); c.push(entry); setCart(c); return c.length-1; }
  function updateCartItem(index,entry){ const c=cart(); if(c[index]) c[index]=entry; setCart(c); }
  function removeCartItem(index){ const c=cart(); c.splice(index,1); setCart(c); }
  function clearCart(){ setCart([]); }

  function sessionOrders(){ return get("completedOrders",[]); }
  function addCompletedOrder(order){
    const arr=sessionOrders(); arr.unshift(order); set("completedOrders",arr);
  }

  function showToast(message,type=""){
    let el=document.querySelector(".toast");
    if(!el){
      el=document.createElement("div"); el.className="toast"; document.querySelector(".app-shell")?.appendChild(el);
    }
    el.classList.toggle("success",type==="success");
    el.innerHTML = (type==="success"
      ? '<svg width="20" height="20" viewBox="0 0 24 24"><path class="icon-stroke" d="m5 12 4 4 10-10"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24"><path class="icon-stroke" d="M20.8 4.8a5.3 5.3 0 0 0-7.5 0L12 6.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z"/></svg>')
      + `<span>${message}</span>`;
    requestAnimationFrame(()=>el.classList.add("show"));
    clearTimeout(el._timer);
    el._timer=setTimeout(()=>el.classList.remove("show"),1800);
  }

  function fmt(n){ return "$"+Number(n).toFixed(2); }

  // Quantity-type groups (e.g. Sauces) store {optionValue: count} instead of a
  // single string. One cup is free per order — the most expensive one selected —
  // and every additional cup is charged at its own priceDelta.
  function quantityGroupCount(selected){
    return Object.values(selected||{}).reduce((n,q)=>n+Number(q||0),0);
  }
  function quantityGroupDelta(group, selected){
    const cups=[];
    Object.entries(selected||{}).forEach(([value,qty])=>{
      const opt=(group.options||[]).find(o=>o.value===value);
      if(!opt) return;
      for(let i=0;i<Number(qty||0);i++) cups.push(Number(opt.priceDelta||0));
    });
    if(!cups.length) return 0;
    cups.sort((a,b)=>b-a);
    return cups.slice(1).reduce((sum,p)=>sum+p,0);
  }

  function customizationDelta(itemId, customizations){
    const menu=window.JOLLIBEE_MENU;
    const item=menu && menu.items ? menu.items[itemId] : null;
    if(!item || !customizations) return 0;

    let total=0;
    (item.customizations||[]).forEach(type=>{
      const selected=customizations[type];
      const group=menu.groups && menu.groups[type];
      if(!selected || !group) return;

      if(group.quantity){
        total += quantityGroupDelta(group, selected);
        return;
      }

      // Direct top-level option, e.g. Adobo Rice or Pineapple Quencher.
      let opt=(group.options||[]).find(o=>o.value===selected);

      // Nested option, e.g. Mountain Dew selected under Soda.
      if(!opt){
        opt=(group.options||[]).find(o=>{
          if(!o.nested || !menu.nestedGroups || !menu.nestedGroups[o.nested]) return false;
          return (menu.nestedGroups[o.nested].options||[]).includes(selected);
        });
      }

      total += Number(opt && opt.priceDelta || 0);
    });
    return total;
  }

  // Readable summary pieces for a saved customizations object, e.g. for a
  // quantity group: ["Small Chickenjoy Gravy, 2× BBQ Dipping Sauce"].
  // Single-select groups pass their stored string straight through.
  function customizationParts(itemId, customizations){
    const menu=window.JOLLIBEE_MENU;
    const item=menu && menu.items ? menu.items[itemId] : null;
    if(!item || !customizations) return [];
    return (item.customizations||[]).map(type=>{
      const group=menu.groups && menu.groups[type];
      const value=customizations[type];
      if(!group || !value) return null;
      if(group.quantity){
        const entries=Object.entries(value).filter(([,q])=>q>0);
        if(!entries.length) return null;
        return entries.map(([name,q])=>q>1?`${q}× ${name}`:name).join(", ");
      }
      return value;
    }).filter(Boolean);
  }

  function configuredItemUnitPrice(itemId, customizations){
    const menu=window.JOLLIBEE_MENU;
    const item=menu && menu.items ? menu.items[itemId] : null;
    return item ? Number(item.price) + customizationDelta(itemId, customizations) : 0;
  }

  window.JolliState = {
    appBase, hrefFor, get, set, remove, clearParticipantState,
    currentItemDraft, saveItemDraft, clearItemDraft,
    savedCustomizations, saveCustomizations,
    favorites, isFavorite, favoriteItem, removeFavorite, isAddonFavorite, favoriteAddon, removeAddonFavorite,
    cart, setCart, cartCount, addCartItem, updateCartItem, removeCartItem, clearCart,
    sessionOrders, addCompletedOrder, showToast, fmt, customizationDelta, configuredItemUnitPrice,
    quantityGroupCount, quantityGroupDelta, customizationParts
  };
})();
