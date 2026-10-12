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
