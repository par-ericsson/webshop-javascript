import * as model from './model.js';
import productsView from '../js/Views/ProductsView.js';
import productDetailView from './views/productDetailView.js';
import cartView from './views/cartView.js';
import cartDetailView from './views/cartDetailView.js';
import adminView from './Views/adminView.js';
import deleteView from './views/deleteView.js';

const controlProducts = async function() {
  try {
    // Getting the hash
    const id = window.location.hash.slice(1); //without hash symbol
    if (id) {
      return;
    }
    productsView.renderSpinner();
    // Load products
    if (model.state.products.length === 0) {
      //console.log('Loading products');
      await model.loadProducts();
    }
    //Render products
    productsView.render(model.state.products);
  } catch (err) {
    console.log(err)
  }
}

const controlProductDetail = async function() {
  try {
    const id = window.location.hash.slice(1); 
    if (!id || id === 'cart' || id === 'admin' || id.startsWith('deleteView')) {
      return;
    }
    // Load product
    await model.loadProduct(id);
    
    //Render product
    productDetailView.render(model.state.product);
  } catch (err) {
    console.log(err)
  }
}

const controlCartView = function() {
 cartView.render(model.state.cart.numOfCartItems);
}

const controlCartDetailView = async function() {
  try {
    const hash = window.location.hash.slice(1); 
    if (!hash === 'cart') {
      return;
    }

    cartDetailView.render(model.state.cart.cartItems, model.state.cart.cartTotalPrice);
  } catch (err) {
    console.log(err)
  }
}

const controlUpdateCartQuantity = async function(newQuantity, productId) {
  //console.log(newQuantity + ' : ' + productId)
  model.updateCartQuantity(newQuantity, productId);
  cartDetailView.render(model.state.cart.cartItems, model.state.cart.cartTotalPrice);
  cartView.render(model.state.cart.numOfCartItems);
}

const controlAddItemToCart = async function(id) {
  model.addItemToCart(id);
  cartView.render(model.state.cart.numOfCartItems);
}

const controlDeleteItemFromCart = async function(id) {
  model.deleteCartItem(id);
  cartDetailView.render(model.state.cart.cartItems, model.state.cart.cartTotalPrice);
  cartView.render(model.state.cart.numOfCartItems);
}

const controlAdminView =  async function() {
  if (model.state.products.length === 0) {
    await model.loadProducts();
  }
  
  adminView.render(model.state.products);
}

const controlDeleteProduct = async function() {
  try {
    const id = window.location.hash.slice(1); 
    if (!id.startsWith('deleteView')) {
      return;
    }
    // Load product
    //await model.loadProduct(id);
    const productId = +id.slice(11);
    await model.deleteProduct(productId);
    deleteView.render(model.state.deletedProduct);
  } catch (err) {
    console.log(err)
  }
}

const init = function() {
  // Subscribers
  productsView.addHandlerRender(controlProducts);
  productsView.addHandlerUpdateCart(controlAddItemToCart);
  productDetailView.addHandlerRender(controlProductDetail);
  productDetailView.addHandlerRender(controlAddItemToCart);
  controlCartView();
  cartDetailView.addHandlerRender(controlCartDetailView);
  cartDetailView.addHandlerUpdateQuantity(controlUpdateCartQuantity);
  cartDetailView.addDeleteCartItemHandler(controlDeleteItemFromCart);
  adminView.addHandlerRender(controlAdminView);
  deleteView.addHandlerRender(controlDeleteProduct);
};

init();
