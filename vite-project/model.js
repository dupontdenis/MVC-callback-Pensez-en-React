export default class Model {
  constructor() {
    this.apiEndpoint = "data.json"; // Update this to your actual API endpoint
    this.filterText = "";
    this.inStockOnly = false;
    this.products = [];
  }

  async fetchContent() {
    try {
      console.log("Model: Fetching content from API");
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.products = await response.json();
      console.log("Model: Content fetched successfully");
      return this.products;
    } catch (error) {
      console.error("Model: Failed to fetch content:", error);
      throw error;
    }
  }

  setFilterText(filterText, callback) {
    this.filterText = filterText;
    console.log(`Model: Filter text set to "${filterText}"`);
    if (callback) callback();
  }

  setInStockOnly(inStockOnly, callback) {
    this.inStockOnly = inStockOnly;
    console.log(`Model: In-stock only set to "${inStockOnly}"`);
    if (callback) callback();
  }

  getFilteredProducts() {
    console.log("Model: Filtering products");
    return this.products.filter((product) => {
      const matchesFilterText = this.filterText
        ? product.name.toLowerCase().startsWith(this.filterText.toLowerCase())
        : true;
      const matchesStock = this.inStockOnly ? product.stocked : true;
      return matchesFilterText && matchesStock;
    });
  }
}