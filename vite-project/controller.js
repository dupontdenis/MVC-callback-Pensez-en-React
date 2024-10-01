import Model from './model.js';
import View from './view.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Bind event handlers
    this.view.bindFilterInput(this.handleFilterInput);
    this.view.bindStockCheckbox(this.handleStockCheckbox);

    // Initialize the content
    this.showContent();
  }

  async showContent() {
    try {
      console.log("Controller: Showing content");
      await this.model.fetchContent();
      this.view.updateContent(this.model.getFilteredProducts());
    } catch (error) {
      console.error("Controller: Failed to show content:", error);
    }
  }

  handleFilterInput = () => {
    const filterText = this.view.filterInput.value;
    console.log(`Controller: Filter input changed to "${filterText}"`);
    this.model.setFilterText(filterText, () => {
      console.log("Controller: Filter text set in model");
      this.view.updateContent(this.model.getFilteredProducts());
      console.log("Controller: View updated with filtered products");
    });
  };

  handleStockCheckbox = () => {
    const inStockOnly = this.view.stockCheckbox.checked;
    console.log(`Controller: Stock checkbox changed to "${inStockOnly}"`);
    this.model.setInStockOnly(inStockOnly, () => {
      console.log("Controller: In-stock only set in model");
      this.view.updateContent(this.model.getFilteredProducts());
      console.log("Controller: View updated with filtered products");
    });
  };
}

// Instantiate the MVC components
const model = new Model();
const view = new View();
const controller = new Controller(model, view);