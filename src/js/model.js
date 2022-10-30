import {API_URL} from './config.js';
import {getJSON} from './helpers.js';

export const state = {
  products: [],
  product: [],
  numOfCartItems: 1
};

export const loadProducts = async function() {
  try {
    const data = await getJSON(`${API_URL}`)
    state.products = data.products;
    
  } catch (err) {
    console.log(err)
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