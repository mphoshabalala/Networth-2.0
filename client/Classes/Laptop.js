import Item from "./Item.js";

export default class Laptop extends Item {
  #ramSize;
  #cpuCores;
  #osVersion;
  #color;
  constructor(marketDemand, warranty, productUpdateRate) {
    super(marketDemand, warranty, productUpdateRate); //inheritance
  }

  //accessors
  getRamSize() {
    return this.#ramSize;
  }

  getCPUCores() {
    return this.#cpuCores;
  }

  getOSVersion() {
    return this.#osVersion;
  }

  getColor() {
    return this.#color;
  }

  //Mutators
  setRamSize(ramSize) {
    this.#ramSize = ramSize;
  }

  setCPUCores(cpuCores) {
    this.#cpuCores = cpuCores;
  }

  setOSVersion(osVersion) {
    this.#osVersion = osVersion;
  }

  setColor(color) {
    this.#color = color;
  }

  // functions
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
