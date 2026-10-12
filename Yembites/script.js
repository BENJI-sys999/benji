// Simple nav toggle for small screens
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('show');
  });

  // Order form: show address field only when delivery is selected
  const orderForm = document.getElementById('orderForm');
  if(orderForm){
    const fulfillmentRadios = orderForm.querySelectorAll('input[name="fulfillment"]');
    const addressGroup = document.getElementById('addressGroup');
    function updateAddress() {
      const val = orderForm.querySelector('input[name="fulfillment"]:checked')?.value;
      if(val === 'delivery'){
        addressGroup.classList.remove('hidden');
      } else {
        addressGroup.classList.add('hidden');
      }
    }
    fulfillmentRadios.forEach(r => r.addEventListener('change', updateAddress));
    updateAddress();
  }
});

// Cart: Add to Order buttons feed the order summary
document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'yemkemCart';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} };
  const badge = () => {
    const n = Object.values(load()).reduce((s, i) => s + i.qty, 0);
    const a = document.querySelector('.nav-links a[href="order.html"]');
    if (a) a.textContent = n ? `Order (${n})` : 'Order';
    let bar = document.querySelector('.cart-bar');
    if (!bar) { bar = document.createElement('a'); bar.className = 'cart-bar'; bar.href = 'order.html'; document.body.appendChild(bar); }
    const t = Object.values(load()).reduce((s, i) => s + i.qty * i.price, 0);
    bar.hidden = !n || location.pathname.endsWith('order.html');
    bar.textContent = `View order · ${n} item${n > 1 ? 's' : ''} · $${t.toFixed(2)}`;
  };
  document.querySelectorAll('.cta-button[data-name]').forEach(b => b.addEventListener('click', () => {
    const c = load(), n = b.dataset.name;
    c[n] = { price: +b.dataset.price, qty: (c[n]?.qty || 0) + 1 };
    save(c); badge();
    b.textContent = 'Added ✓';
    setTimeout(() => { b.textContent = 'Add to Order'; }, 900);
  }));
  const list = document.querySelector('.summary-list');
  const render = () => {
    if (!list) return;
    const e = Object.entries(load());
    if (!e.length) { list.innerHTML = '<p class="muted">No items yet. Pick something from the menu.</p>'; return; }
    let t = 0;
    list.innerHTML = e.map(([n, i]) => { t += i.price * i.qty;
      return `<div class="summary-row"><span>${n}</span><span class="qty"><button type="button" data-d="-1" data-n="${n}">−</button>${i.qty}<button type="button" data-d="1" data-n="${n}">+</button></span><span>$${(i.price * i.qty).toFixed(2)}</span></div>`;
    }).join('') + `<div class="summary-total"><span>Total</span><span>$${t.toFixed(2)}</span></div>`;
  };
  list?.addEventListener('click', ev => {
    const b = ev.target.closest('button[data-n]'); if (!b) return;
    const c = load(), i = c[b.dataset.n]; i.qty += +b.dataset.d;
    if (i.qty <= 0) delete c[b.dataset.n];
    save(c); render(); badge();
  });
  const f = document.getElementById('orderForm');
  f?.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!Object.keys(load()).length) { list.innerHTML = '<p class="muted">Add at least one item from the menu first.</p>'; return; }
    save({}); render(); badge(); f.reset();
    f.insertAdjacentHTML('afterbegin', '<p class="success">Thanks! Your order has been received.</p>');
  });
  f?.addEventListener('reset', () => setTimeout(() => document.getElementById('addressGroup').classList.add('hidden'), 0));
  render(); badge();
});

// Active nav link + menu filters
document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => { if (a.getAttribute('href') === page) a.classList.add('active'); });
  document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(o => o.classList.toggle('active', o === c));
    document.querySelectorAll('.menu-card').forEach(card => { card.hidden = c.dataset.f !== 'all' && card.dataset.cat !== c.dataset.f; });
  }));
});
