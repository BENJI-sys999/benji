// Nav toggle for small screens + order form delivery field
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      links.classList.toggle('show');
    });
  }

  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    const addressGroup = document.getElementById('addressGroup');
    const updateAddress = () => {
      const val = orderForm.querySelector('input[name="fulfillment"]:checked')?.value;
      addressGroup.classList.toggle('hidden', val !== 'delivery');
    };
    orderForm.querySelectorAll('input[name="fulfillment"]').forEach(r => r.addEventListener('change', updateAddress));
    orderForm.addEventListener('reset', () => setTimeout(updateAddress, 0));
    updateAddress();
  }
});

// Cart: Add to Order buttons feed the order summary
document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'yembitesCart';
  const CUR = '#';                                   // change to '₦' if you prefer
  const money = n => CUR + n.toLocaleString('en-NG'); // 1000 -> #1,000
  const toNum = v => parseFloat(String(v).replace(/[^\d.]/g, '')) || 0; // "1,000" -> 1000
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = c => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} };
  const count = c => Object.values(c).reduce((s, i) => s + i.qty, 0);
  const total = c => Object.values(c).reduce((s, i) => s + i.qty * i.price, 0);

  const badge = () => {
    const c = load(), n = count(c);
    const a = document.querySelector('.nav-links a[href="order.html"]');
    if (a) a.textContent = n ? `Order (${n})` : 'Order';
    let bar = document.querySelector('.cart-bar');
    if (!bar) { bar = document.createElement('a'); bar.className = 'cart-bar'; bar.href = 'order.html'; document.body.appendChild(bar); }
    bar.hidden = !n || location.pathname.endsWith('order.html');
    bar.textContent = `View order · ${n} item${n === 1 ? '' : 's'} · ${money(total(c))}`;
  };

  document.querySelectorAll('.cta-button[data-name]').forEach(b => b.addEventListener('click', () => {
    const c = load(), name = b.dataset.name;
    c[name] = { price: toNum(b.dataset.price), qty: (c[name]?.qty || 0) + 1 };
    save(c); badge();
    b.textContent = 'Added ✓';
    setTimeout(() => { b.textContent = 'Add to Order'; }, 900);
  }));

  const list = document.querySelector('.summary-list');
  const render = () => {
    if (!list) return;
    const c = load(), e = Object.entries(c);
    if (!e.length) { list.innerHTML = '<p class="muted">No items yet. Pick something from the menu.</p>'; return; }
    list.innerHTML = e.map(([n, i]) =>
      `<div class="summary-row"><span>${esc(n)}</span><span class="qty"><button type="button" data-d="-1" data-n="${esc(n)}">−</button>${i.qty}<button type="button" data-d="1" data-n="${esc(n)}">+</button></span><span>${money(i.price * i.qty)}</span></div>`
    ).join('') + `<div class="summary-total"><span>Total</span><span>${money(total(c))}</span></div>`;
  };

  list?.addEventListener('click', ev => {
    const b = ev.target.closest('button[data-n]'); if (!b) return;
    const c = load(), i = c[b.dataset.n]; if (!i) return;
    i.qty += +b.dataset.d;
    if (i.qty <= 0) delete c[b.dataset.n];
    save(c); render(); badge();
  });

  const f = document.getElementById('orderForm');
  f?.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!count(load())) { list.innerHTML = '<p class="muted">Add at least one item from the menu first.</p>'; return; }
    save({}); render(); badge(); f.reset();
    f.querySelector('.success')?.remove();
    f.insertAdjacentHTML('afterbegin', '<p class="success">Thanks! Your order has been received.</p>');
  });

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
