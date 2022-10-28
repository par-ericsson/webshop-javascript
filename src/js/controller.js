import * as model from './model.js';
import productsView from '../js/Views/ProductsView.js';

const controlProducts = async function() {
  try {
    // Load products
    // todo, kolla om produkter finns i state först
    await model.loadProducts();

    //Render products
    productsView.render(model.state.products);
  } catch (err) {
    console.log(err)
  }
}

const init = function() {
  // Subscriber
  productsView.addHandlerRender(controlProducts);
};

init();
