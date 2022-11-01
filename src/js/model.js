import {API_URL} from './config.js';
import {getJSON} from './helpers.js';

export const state = {
  products: [],
  product: [],
  numOfCartItems: 0,
  cartItems: [],
  cartTotalPrice: 0
};

export const loadProducts = async function() {
  try {
    const data = await getJSON(`${API_URL}`)
    state.products = data.products;
    
  } catch (err) {
    console.log(err);
  }
};

export const loadProduct = async function(id) {
  if (state.products.length === 0) {
    return;
  }

  state.product = state.products.filter(p => {
    return p.id === +id;
  });
}

export const addItemToCart = async function(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) {
    return;
  }

  state.cartItems.push(product);
  state.numOfCartItems = state.numOfCartItems + 1;
  state.cartTotalPrice = state.cartItems.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);

}