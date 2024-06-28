const API_URL = 'https://peridot-voracious-ruby.glitch.me';

const productList = document.querySelector('.store__list');
const buttons = document.querySelectorAll('.store__category-button');
const cartButton= document.querySelector('.store__cart-button');
const modalOverlay = document.querySelector('.modal-overlay');
const cartItemsList = document.querySelector('.modal__cart-items');
const modalCloseButton = document.querySelector('.modal-overlay_close-button');
const cartCount = cartButton.querySelector('.store__cart-cnt');


const createProductCard = ({photoUrl, name, price}) => {
    const productCard = document.createElement('li');
    productCard.classList.add('store__item');
    productCard.innerHTML = `
        <article class="store__product product">
            <img src="${API_URL}${photoUrl}" alt="${name}" class="product__image" width="388" height="261">
            <h3 class="product__title">${name}</h3>
            <p class="product__price">${price}&nbsp;₽</p>
            <button class="product_btn-add-cart">Заказать</button>
        </article>
    `
    return productCard;
};

const renderProducts = (products) => {
    productList.textContent = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productList.append(productCard);
    });
};

const fetchProductByCategory = async (category) => {
    try {
        const response = await fetch(`${API_URL}/api/products/category/${category}`);
        if (!response.ok) {
            throw new Error(response.status);
        }

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('error');
    }
}


const changeCategory = (e) => {
    const category = e.target.textContent;

    buttons.forEach((button) => {
        button.classList.remove('store__category-button_active');
    });

    e.target.classList.add('store__category-button_active');
    fetchProductByCategory(category);
};

buttons.forEach((button) => {
    button.addEventListener('click', changeCategory);

    if (button.classList.contains('store__category-button_active')) {
        fetchProductByCategory(button.textContent);
    }
});


const renderCartItems = () => {
    cartItemsList.textContent = '';
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        cartItemsList.append(listItem);
    });
};

cartButton.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
    renderCartItems();
});

modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay || e.target.closest('.modal-overlay_close-button')) {
        modalOverlay.style.display = 'none';
    }
});


const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartCount.textContent = cartItems.length;
}

updateCartCount();

const addToCart = (productName) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems.push(productName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
};


productList.addEventListener('click', e => {
    if (e.target.closest('.product_btn-add-cart')) {
        const productCard = e.target.closest('.store__product');
        const productName = productCard.querySelector('.product__title').textContent;
        addToCart(productName);
    }
});