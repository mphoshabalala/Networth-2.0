import Item from "./Item.js";

export default class Mobile extends Item {
  #color;
  #osVersion;
  constructor(marketDemand, warranty, productUpdateRate) {
    super(marketDemand, warranty, productUpdateRate);
  }

  //accessor
  getColor() {
    return this.#color;
  }

  getOSVersion() {
    return this.#osVersion;
  }

  //   Mutator
  setColor(color) {
    this.#color = color;
  }

  setOSVersion(osVersion) {
    this.#osVersion = osVersion;
  }

  // functionality
  calculateDepreciationPercentage() {
    // Factors that influence depreciation
    const marketDemandFactor = 1 - this._marketDemand / 100;
    const warrantyFactor = 1 - this._warranty / 100;
    const updateRateFactor = 1 - this._productUpdateRate / 100;
    const brandFactor = 1.0; // Adjust this based on brand reputation

    // Calculate the overall depreciation factor
    const depreciationFactor =
      marketDemandFactor * warrantyFactor * updateRateFactor * brandFactor;

    // Calculate the depreciation percentage
    const depreciationPercentage = (1 - depreciationFactor) * 100;

    return depreciationPercentage;
  }
}
