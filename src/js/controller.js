import * as model from './model.js';
import productsView from '../js/Views/ProductsView.js';
import productDetailView from './views/productDetailView.js';
import cartView from './views/cartView.js';
import cartDetailView from './views/cartDetailView.js';

const controlProducts = async function() {
  try {
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
    // Getting the hash
    const hash = window.location.hash.slice(1); 
    if (!hash === 'cart') {
      return;
    }
    // Load products
    //await model.loadProducts();

    //Render products
    cartDetailView.render();
  } catch (err) {
    console.log(err)
  }
}

const init = function() {
  // Subscriber
  productsView.addHandlerRender(controlProducts);
  productDetailView.addHandlerRender(controlProductDetail);
  controlCartView();
  cartDetailView.addHandlerRender(controlCartDetailView);
};

init();
