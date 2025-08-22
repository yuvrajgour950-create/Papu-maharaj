
async function loadJSON(url){ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) throw new Error('Failed '+url); return r.json(); }
function applyTheme(s){
  document.documentElement.style.setProperty('--primary', s.primaryColor||'#000');
  document.documentElement.style.setProperty('--accent', s.accentColor||'#D4AF37');
  document.documentElement.style.setProperty('--text-on-primary', s.textOnPrimary||'#fff');
  document.querySelector('#brandName').textContent = s.brandName||'Brand';
  document.querySelector('#heroHeadline').textContent = (s.hero && s.hero.headline)||'';
  document.querySelector('#heroSubheadline').textContent = (s.hero && s.hero.subheadline)||'';
  const phone = document.querySelector('#contactPhone');
  const insta = document.querySelector('#contactInsta');
  const wa = document.querySelector('#contactWA');
  if(phone) phone.textContent = s.contact?.phone || '';
  if(insta) insta.href = s.contact?.instagram || '#';
  if(wa) wa.href = s.contact?.whatsapp ? ('https://wa.me/' + s.contact.whatsapp.replace(/\D/g,'')) : '#';
}
function formatINR(a){ return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(a); }
function renderProducts(list){
  const grid = document.querySelector('#productsGrid'); grid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    const img = document.createElement('img'); img.src = (p.images && p.images[0]) || '/assets/logo.svg'; img.alt = p.title;
    const body = document.createElement('div'); body.className='card-body';
    body.innerHTML = `
      <div class="card-title">${p.title}</div>
      <div class="price">${formatINR(p.price)}</div>
      <div class="meta">${p.category || ''} • ${p.in_stock ? 'In stock':'Out of stock'}</div>
      <a class="cta" href="https://wa.me/91XXXXXXXXXX?text=Interested%20in%20${encodeURIComponent(p.title)}%20(${formatINR(p.price)})">Enquire on WhatsApp</a>
    `;
    card.appendChild(img); card.appendChild(body); grid.appendChild(card);
  });
}
(async()=>{
  try{
    const settings = await loadJSON('/data/settings.json'); applyTheme(settings);
    const products = await loadJSON('/data/products.json'); renderProducts(products);
  }catch(e){ console.error(e); }
})();