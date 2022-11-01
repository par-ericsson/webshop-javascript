import * as model from './model.js';
import productsView from '../js/Views/ProductsView.js';
import productDetailView from './views/productDetailView.js';
import cartView from './views/cartView.js';
import cartDetailView from './views/cartDetailView.js';

const controlProducts = async function() {
  try {
    const id = window.location.hash.slice(1); //without hash symbol
    if (id) {
      return;
    }
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
    // Getting the hash
    const id = window.location.hash.slice(1); //without hash symbol
    if (!id || id === 'cart') {
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
 cartView.render(model.state.numOfCartItems);
}

const controlCartDetailView = async function() {
  try {
    const hash = window.location.hash.slice(1); 
    if (!hash === 'cart') {
      return;
    }

    cartDetailView.render(model.state.cartItems, model.state.cartTotalPrice);
  } catch (err) {
    console.log(err)
  }
}

const controlAddItemToCart = async function(id) {
  model.addItemToCart(id);
  cartView.render(model.state.numOfCartItems);
}

const init = function() {
  // Subscriber
  productsView.addHandlerRender(controlProducts);
  productsView.addHandlerUpdateCart(controlAddItemToCart);
  productDetailView.addHandlerRender(controlProductDetail);
  productDetailView.addHandlerRender(controlAddItemToCart);
  controlCartView();
  cartDetailView.addHandlerRender(controlCartDetailView);
};

init();
