const foods = [
	{ id: 1, name: 'Margherita Pizza', img: 'https://source.unsplash.com/featured/?pizza', desc: 'Classic pizza with tomato, mozzarella and basil.' },
	{ id: 2, name: 'Sushi Platter', img: 'https://source.unsplash.com/featured/?sushi', desc: 'Assorted nigiri and rolls.' },
	{ id: 3, name: 'Pasta Carbonara', img: 'https://source.unsplash.com/featured/?pasta', desc: 'Creamy carbonara with pancetta.' },
	{ id: 4, name: 'Caesar Salad', img: 'https://source.unsplash.com/featured/?salad', desc: 'Crisp romaine with parmesan and croutons.' },
	{ id: 5, name: 'Chocolate Cake', img: 'https://source.unsplash.com/featured/?chocolate-cake', desc: 'Rich layered chocolate cake.' }
];

const gallery = document.getElementById('gallery');
const search = document.getElementById('search');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');

function render(list) {
	gallery.innerHTML = '';
	list.forEach(item => {
		const card = document.createElement('article');
		card.className = 'card';
		card.innerHTML = `
			<img src="${item.img}" alt="${item.name}" />
			<h3>${item.name}</h3>
			<p class="short">${item.desc}</p>
		`;
		card.addEventListener('click', () => showModal(item));
		gallery.appendChild(card);
	});
}

function showModal(item) {
	modalImg.src = item.img;
	modalImg.alt = item.name;
	modalTitle.textContent = item.name;
	modalDesc.textContent = item.desc;
	modal.classList.remove('hidden');
}

function hideModal() {
	modal.classList.add('hidden');
}

modalClose.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => { if (e.target === modal) hideModal(); });

search.addEventListener('input', () => {
	const q = search.value.trim().toLowerCase();
	const filtered = foods.filter(f => f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q));
	render(filtered);
});

// initial render
render(foods);
