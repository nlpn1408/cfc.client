class ProductResponse {
  constructor(totalProducts, totalPages, currentPage, data) {
    this.totalProducts = totalProducts;
    this.totalPages = totalPages || 10;
    this.currentPage = currentPage || 1;
    this.data = data;
  }
}

module.exports = ProductResponse;
