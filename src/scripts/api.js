export const API_URL = 'https://peridot-voracious-ruby.glitch.me';


const fetchData = async (endpoint, option = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, option);
        if (!response.ok) throw new Error(response.status);

        return await response.json();
    } catch (error) {
        console.error(`${error}`)
    }
};


export const fetchProductsByCategory = async (category) =>  fetchData(`/api/products/category/${category}`);


export const fetchCartItems = async (ids) => fetchData(`/api/products/list/${ids.join(',')}`);


export const submitOrder = async (storeId, products) => fetchData(`/api/orders`, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({storeId, products}),
});

