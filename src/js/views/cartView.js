class CartView {
  #parentElement = document.querySelector('.shop-cart');

  render(cartItems) {
    const markUp = this.#generateMarkup(cartItems);
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  #generateMarkup(cartItems) {
    return `
      <a class="btn btn-outline-dark" href="#cart">
        <i class="bi-cart-fill me-1"></i>
        Cart
        <span class="badge bg-dark text-white ms-1 rounded-pill">${cartItems}</span>
      </a>
      
    `;
  }
}

export default new CartView();
