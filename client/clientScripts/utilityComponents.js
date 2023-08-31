import Mobile from "../Classes/Phone.js";
import Laptop from "../Classes/Laptop.js";
import utilities from "./utilities.js";
// import Mobile from "../Classes/Phone.js";
const utilityComponents = {
  // create select tag
  createBrandSelector: function (DataObject) {
    const select = utilities.createTag(
      "select",
      "selector",
      "brand-selection",
      ""
    );
    const firstOption = utilities.createTag(
      "option",
      "option-class",
      "label",
      "Select brand"
    );
    select.append(firstOption);
    DataObject.forEach((object) => {
      const option = utilities.createTag(
        "option",
        "option-class",
        object.data_id,
        object.item_name
      );
      select.append(option);
    });
    return select;
  },
  //create ITEMS TYPE SELECTOR
  createItemTypeSelector: function (ItemsNames, id) {
    const select = utilities.createTag("select", "selector", id, "");

    ItemsNames.forEach((name) => {
      const option = utilities.createTag("option", "option-class", name, name);
      select.append(option);
    });
    return select;
  },
  createLoggedHeader: function () {
    const header = utilities.createTag(
      "header",
      "main-header",
      "networth-header",
      ""
    );

    const menuDivs = utilities.createDiv("menu", "header-menu");
    menuDivs.append(
      utilities.createAnchor(
        "auth-anchor",
        "header-sign-up",
        "assets.html",
        "Your Assets"
      ),
      utilities.createAnchor(
        "auth-anchor",
        "header-sign-out",
        "index.html",
        "Log Out"
      )
    );
    header.append(
      utilities.createAnchor(
        "header-title",
        "register-header-anchor",
        "index.html",
        "Networth"
      ),
      menuDivs
    );

    return header;
  },
  createHeader: function () {
    const header = utilities.createTag(
      "header",
      "main-header",
      "networth-header",
      ""
    );

    const menuDivs = utilities.createDiv("menu", "header-menu");
    menuDivs.append(
      utilities.createAnchor(
        "auth-anchor",
        "header-sign-in",
        "../authentication client/html/login.html",
        "Sign In"
      ),
      utilities.createAnchor(
        "auth-anchor",
        "header-sign-up",
        "../authentication client/html/signup.html",
        "Sign Up"
      )
    );
    header.append(
      utilities.createAnchor(
        "header-title",
        "register-header-anchor",
        "index.html",
        "Networth"
      ),
      menuDivs
    );

    return header;
  },
  createMobileForm: function (brand) {
    const form = utilities.createForm(
      "device-form",
      "mobile-form",
      " ",
      "POST"
    );

    const div = utilities.createDiv("device-form-div", "mobile-div");
    div.append(
      utilities.createTag(
        "h1",
        "form-header",
        "mobile-form-header",
        "Input your phone data"
      ),
      brand,
      utilities.createInput(
        "form-input",
        "mobile-model-input",
        "text",
        "model",
        "Model",
        true
      ),
      utilities.createInput(
        "form-input",
        "mobile-age-input",
        "text",
        "age",
        "Age",
        true
      ),
      utilities.createInput(
        "form-input",
        "mobile-os-input",
        "text",
        "os",
        "OS e.g. Android",
        true
      ),
      utilities.createInput(
        "form-input",
        "mobile-os-version-input",
        "text",
        "os-version",
        "OS Version e.g. 11",
        true
      ),
      utilities.createInput(
        "form-input",
        "mobile-price-input",
        "text",
        "price",
        "Price in USD",
        true
      ),
      utilities.createButton(
        "btn-primary",
        "mobile-form-btn",
        "submit",
        "Find Worth"
      )
    );
    form.append(div);
    return form;
  },
  RegisterForm: function () {
    const formBody = utilities.createForm("form", "register-form", "__", "__");
    formBody.append(
      utilities.createTag("h1", "form-header", "register-header", "Register"),
      utilities.createLabel(
        "form-lable",
        "register-label-username",
        "UserName",
        "Username: "
      ),
      utilities.createInput(
        "form-input",
        "register-input-username",
        "text",
        "userName",
        "Username",
        true
      ),
      utilities.createLabel(
        "form-label",
        "register-label-email",
        "email",
        "Email: "
      ),
      utilities.createInput(
        "form-input",
        "register-input-email",
        "email",
        "email",
        "Email",
        true
      ),
      utilities.createLabel(
        "form-label",
        "register-label-password",
        "password",
        "Password: "
      ),
      utilities.createInput(
        "form-input",
        "register-input-password",
        "password",
        "password",
        "Password",
        true
      ),
      utilities.createLabel(
        "form-label",
        "register-label-confirm-password",
        "confirm-password",
        "Confirm password: "
      ),
      utilities.createInput(
        "form-input",
        "register-input-confirm-password",
        "confirm-password",
        "confirm-password",
        "Confirm Password",
        true
      ),
      utilities.createButton(
        "btn-primary",
        "register-form-button",
        "submit",
        "Register"
      )
    );
    return formBody;
  },
  createLaptopForm: function (brand, itemTypeSelector) {
    const form = utilities.createForm(
      "device-form",
      "laptop-form",
      "submit",
      "POST"
    );

    const div = utilities.createDiv("device-form-div", "laptop-div");
    div.append(
      utilities.createTag(
        "h1",
        "form-header",
        "laptop-form-header",
        "Input your laptop data"
      ),
      brand,
      utilities.createInput(
        "form-input",
        "laptop-model-input",
        "text",
        "model",
        "Model",
        true
      ),
      utilities.createInput(
        "form-input",
        "laptop-age-input",
        "text",
        "age",
        "Age",
        true
      ),
      utilities.createInput(
        "form-input",
        "laptop-os-input",
        "text",
        "os",
        "OS e.g. Windows",
        true
      ),
      utilities.createInput(
        "form-input",
        "laptop-os-version-input",
        "text",
        "os_version",
        "OS Version e.g. 11",
        true
      ),
      utilities.createInput(
        "form-input",
        "laptop-ram-size-input",
        "text",
        "ram_size",
        "Ram Size",
        true
      ),
      utilities.createInput(
        "form-input",
        "laptop-cpu-cores-input",
        "text",
        "cpu_cores",
        "CPU Cores",
        true
      ),
      utilities.createInput(
        "form-input",
        "laptop-drive-storage-input",
        "text",
        "drive_storage",
        "Drive Storage",
        true
      ),
      utilities.createInput(
        "form-input",
        "mobile-price-input",
        "text",
        "price",
        "Price in USD",
        true
      ),
      itemTypeSelector,
      utilities.createButton(
        "btn-primary",
        "laptop-form-button",
        "submit",
        "Find Worth"
      )
    );
    form.append(div);
    return form;
  },

  createFooter: function () {
    const footer = utilities.createDiv("main-footer", "page-footer");
    footer.append(
      utilities.createTag(
        "p",
        "copyrights",
        "networth-copyrights",
        `Copyright Reserved.2023, Networth By Uracline Space. Website By UraclineSpace`
      )
    );
    return footer;
  },

  buildMobile: function (
    brand,
    model,
    age,
    os,
    osVersion,
    price,
    marketDemand,
    productUpdateRate,
    warranty
  ) {
    const mobile = new Mobile(marketDemand, warranty, productUpdateRate);
    mobile.setBrand(brand);
    mobile.setModel(model);
    mobile.setAge(age);
    mobile.setOs(os);
    mobile.setOSVersion(osVersion);
    mobile.setPrice(price);
    mobile.setMarketDemand(marketDemand);
    mobile.setProductUpdateRate(productUpdateRate);
    mobile.setWarranty(warranty);
    mobile.setColor("Default");

    return mobile;
  },

  buildLaptop: function (
    brand,
    model,
    age,
    os,
    os_version,
    ramSize,
    cpuCores,
    driveStorage,
    driveType,
    price,
    marketDemand,
    productUpdateRate,
    warranty
  ) {
    const laptop = new Laptop(marketDemand, warranty, productUpdateRate);
    laptop.setBrand(brand);
    laptop.setModel(model);
    laptop.setAge(age);
    laptop.setOs(os);
    laptop.setOSVersion(os_version);
    laptop.setRamSize(ramSize);
    laptop.setCPUCores(cpuCores);
    laptop.setDiscStorage(driveStorage);
    laptop.setDiscStorageType(driveType);
    laptop.setPrice(price);
    laptop.setColor("default");
    return laptop;
  },

  createPhoneList: function (phoneData) {
    const outerDiv = utilities.createDiv("item-List", " ");
    const mainHeader = utilities.createDiv("list-item", "list-item-header");
    mainHeader.append(
      utilities.createTag("p", "item-name", "asset", "Item Name"),
      utilities.createTag("p", "item-name", "asset", "Current Price"),
      utilities.createTag("p", "item-name", "asset", "Trend")
    );
    outerDiv.append(mainHeader);
    let index = 0;
    phoneData.forEach((dataElement) => {
      const mobile = utilityComponents.buildMobile(
        dataElement.phone_brand,
        dataElement.phone_model,
        dataElement.phone_age,
        dataElement.phone_os,
        dataElement.phone_os_version,
        dataElement.phone_price,
        dataElement.phone_market_demand,
        dataElement.phone_update_rate,
        dataElement.phone_warranty
      );
      index++;
      let item;
      if (index % 2 === 0) {
        item = utilities.createDiv("list-item", "even-item");
      } else {
        item = utilities.createDiv("list-item", "odd-item");
      }

      const name = utilities.createTag(
        "p",
        "item-name",
        "asset",
        mobile.getBrand() + " " + mobile.getModel()
      );
      const currentPrice = utilities.createTag(
        "p",
        "item-name",
        "asset",
        `$${(
          mobile.getPrice() -
          (mobile.calculateDepreciationPercentage() / 100) * mobile.getPrice()
        ).toFixed(2)}`
      );
      const observeAssetTrend = utilities.createButton(
        "btn-secondary",
        `${mobile.getBrand}-trend`,
        "button",
        "See Trend"
      );

      item.append(name, currentPrice, observeAssetTrend);
      outerDiv.append(item);
    });

    return outerDiv;
  },

  clearInputFields: function () {
    const inputFields = document.querySelectorAll(".form-input");
    inputFields.forEach((input) => {
      input.value = "";
    });
  },

  createAssets: function () {},
};

export default utilityComponents;
