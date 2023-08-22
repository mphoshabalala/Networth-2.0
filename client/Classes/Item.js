export default class Item {
  // protected attributes
  _model;
  _brand;
  _age;
  _os;
  _marketDemand;
  _warranty;
  _productUpdateRate;
  _price;

  // constructor
  constructor(marketDemand, warranty, productUpdateRate) {
    //instantiation of private attributes to constructor values
    this._model = this.getModel();
    this._brand = this.getBrand();
    this._age = this.getAge(); //in months
    this._os = this.getOS();
    this._price = this.getPrice();
    this._marketDemand = marketDemand;
    this._warranty = warranty; //in months
    this._productUpdateRate = productUpdateRate;
  }

  //   accesors
  getModel() {
    return this._model;
  }

  getBrand() {
    return this._brand;
  }

  getAge() {
    return this._age;
  }

  getOS() {
    return this._os;
  }

  getMarketDemand() {
    return this._marketDemand;
  }

  getWaranty() {
    return this._warranty;
  }

  getProductUpdateRate() {
    return this._productUpdateRate;
  }

  getPrice() {
    return this._price;
  }

  //   Mutators

  setModel(model) {
    this._model = model; //choose from the model list
  }

  setBrand(brand) {
    this._brand = brand; //choose from the brand list
  }

  setWarranty(warranty) {
    if (warranty < 0) {
      return "invalid warranty";
    }
    this._warranty = warranty;
  }

  setAge(age) {
    if (age < 0) {
      return "invalid Age";
    }
    this._age = age; //set age in months
  }

  setOs(os) {
    this._os = os; //choose from os list
  }

  setMarketDemand(marketDemand) {
    this._marketDemand = marketDemand; // data from external sources
  }

  setProductUpdateRate(productUpdateRate) {
    this._productUpdateRate = productUpdateRate; //data from external sources
  }

  setPrice(price) {
    this._price = price;
  }

  //   Functions
  isOutOfWarranty() {
    //user input warranty
    const calcAge = this._warranty - this._age;
    if (calcAge <= 0) {
      return true;
    }
    return false;
  }
}

// export default Item;
