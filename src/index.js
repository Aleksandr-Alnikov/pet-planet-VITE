import {fetchProductsByCategory} from "./scripts/api.js";
import {renderProducts} from "./scripts/dom.js";
import {addToCart} from "./scripts/cart.js";

const productList = document.querySelector('.store__list');
const buttons = document.querySelectorAll('.store__category-button');


const changeCategory = async ({target}) => {
    const category = target.textContent;

    buttons.forEach((button) => {
        button.classList.remove('store__category-button_active');
    });

    target.classList.add('store__category-button_active');
    const products = await fetchProductsByCategory(category);
    renderProducts(products, productList);
};

buttons.forEach((button) => {
    button.addEventListener('click', changeCategory);

    if (button.classList.contains('store__category-button_active')) {
        changeCategory({target: button});
    }
});















productList.addEventListener('click', e => {
    if (e.target.closest('.product_btn-add-cart')) {
        const productId = e.target.dataset.id;
        addToCart(productId);
    }
});







