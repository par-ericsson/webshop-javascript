class DeleteView {
  #parentElement = document.querySelector('.admin-content');
  #productsElement = document.querySelector('.products');
  #adminElement = document.querySelector('.admin-content');
  #product;

  render(product) {
    this.#product = product;
    const markUp = this.#generateMarkup();
    this.#parentElement.innerHTML = '';
    this.#adminElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  #generateMarkup() {
    return `
      <div>
        <h3>Note: this doesn't delete any products on the server.</h3>
        ${this.#product.title}
      </div>
    `;
  }
}

export default new DeleteView();