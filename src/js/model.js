import {API_URL} from './config.js';
import {getJSON} from './helpers.js';

export const state = {
  products: []
};

export const loadProducts = async function() {
  try {
    const data = await getJSON(`${API_URL}`)
    state.products = data.products;
    
  } catch (err) {
    console.log(err)
  }
};