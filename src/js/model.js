import {API_URL} from './config.js';
import {getJSON} from './helpers.js';
import {deleteProductJSON } from './helpers.js';
import {editProductJSON} from './helpers.js';

export const state = {
  products: [],
  product: [],
  cart: {
    cartItems: [],
    numOfCartItems: 0,
    cartTotalPrice: 0
  },
  deletedProduct: {},
  editedProduct: {}
};

export const loadProducts = async function() {
  try {
    const data = await getJSON(`${API_URL}`);
    state.products = data.products;
    // Add quantity to every object
    state.products.map(product => {
      product.quantity = 1;
    });
    
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
};

export const deleteProduct = async function(productId) {
  try {
    const deletedProduct =  await deleteProductJSON(`${API_URL}/${productId}`);
    state.deletedProduct = deletedProduct;
  } catch (err) {
    console.log(err);
  }
};

export const addItemToCart = async function(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) {
    return;
  }
  const productInCart = state.cart.cartItems.find(p => p.id === id);
  // Product is already in cart
  if (productInCart) {
    const tempProducts = state.cart.cartItems.filter(p => p.id !== id);
    productInCart.quantity = productInCart.quantity + 1;
    tempProducts.push(productInCart);
    state.cart.cartItems = tempProducts;
  }
  else {
    state.cart.cartItems.push(product);
  }

  state.cart.numOfCartItems = state.cart.numOfCartItems + 1;
  state.cart.cartTotalPrice = state.cart.cartItems.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);

  persistCart();
};

export const updateCartQuantity = async function(qty, id, accumulator) {
  console.log(accumulator)
  const product = state.cart.cartItems.find(p => p.id === id);
  product.quantity = qty;
  
  accumulator === 'positive' 
    ? state.cart.numOfCartItems = state.cart.numOfCartItems + 1
    : state.cart.numOfCartItems = state.cart.numOfCartItems - 1;

  state.cart.cartTotalPrice = state.cart.cartItems.reduce((prev, curr) => {
    return prev + (curr.price * curr.quantity);
  }, 0);

  persistCart();
};

export const deleteCartItem = async function(id) {
  const product = state.cart.cartItems.find(p => p.id === id);
  state.cart.cartItems = state.cart.cartItems.filter(p => {
    return p.id !== id;
  });
  state.cart.numOfCartItems = state.cart.numOfCartItems - product.quantity;
  state.cart.cartTotalPrice = state.cart.cartItems.reduce((prev, curr) => {
    return prev + (curr.price * curr.quantity);
  }, 0);

  persistCart();
};

// Gets the product to be edited
export const editProduct = async function(tempProduct) {
  const product = state.products.find(p => p.id === +tempProduct.id);
  product.title = tempProduct.title;
  product.price = tempProduct.price; 
  const editedProduct = await editProductJSON(`${API_URL}/${product.id}`, product)

  state.editedProduct = editedProduct;
};

// functions for set and retrieve cart from localStorage
const persistCart = function() {
  localStorage.setItem('cart',JSON.stringify(state.cart));
};

const init = function() {
  const cart = localStorage.getItem('cart');
  if (cart) {
    state.cart = JSON.parse(cart);
  }
};

init();