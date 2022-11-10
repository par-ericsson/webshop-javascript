class DeleteView {
  #parentElement = document.querySelector('.products');
  #adminElement = document.querySelector('.admin-content');
  #product;

  render(product) {
    this.#product = product;
    const markUp = this.#generateMarkup();
    this.#parentElement.innerHTML = '';
    this.#adminElement.innerHTML = '';
    this.#adminElement.insertAdjacentHTML('afterbegin', markUp);
  }

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  #generateMarkup() {
    return `
      <div>
        <h3>Note: this doesn't delete any products on the server, only returns the deleted object!</h3>
        <h4 style="color: #435d7d">Title: ${this.#product.title} with id ${this.#product.id} was deleted</h4>
      </div>
    `;
  }
}

export default new DeleteView();