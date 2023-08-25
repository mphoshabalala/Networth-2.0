import Mobile from "../Classes/Phone.js";
import Laptop from "../Classes/Laptop.js";
import utilities from "./utilities.js";

//GLOBAL EVENT LISTENERS
const indexBody = document.querySelector(".index-body");
const formContainer = document.querySelector(".form-container");

//GLOBAL VARIABLES AND CONSTANTS
const ItemNamesList = ["Select Device", Mobile.name, Laptop.name];

// HTML BODY ENTRY ELEMENTS
indexBody.append(
  createHeader(),
  createItemTypeSelector(ItemNamesList),
  formContainer
);

//APPEND DATA ASYNCHRONOUSLY
fetchAdminData()
  .then((data) => {
    const itemTypesSelector = document.querySelector("#item-type");
    itemTypesSelector.addEventListener("change", (e) => {
      const objectToCreate = itemTypesSelector.value;
      if (objectToCreate === "Mobile") {
        formContainer.innerHTML = " ";
        e.preventDefault();
        formContainer.append(createMobileForm(createBrandSelector(data)));

        const mobileSelector = document.querySelector("#mobile-form");
        mobileSelector.addEventListener("submit", (e) => {
          e.preventDefault();
          const brandSelector = document.querySelector("#brand-selection");
          const brand = brandSelector.value;
          const formData = new FormData(mobileSelector);
          const model = formData.get("model");
          const age = formData.get("age");
          const os = formData.get("os");
          const osVersion = formData.get("os-version");
          const price = formData.get("price");
          const selectedData = data.find((item) => item.item_name === brand);
          const marketDemand = selectedData.market_demand;
          const productUpdateRate = selectedData.product_update_rate;
          const warranty = selectedData.warranty;
          console.log({
            brand,
            model,
            age,
            os,
            osVersion,
            price: `$${price}`,
            marketDemand,
            productUpdateRate,
            warranty,
          });

          //instantiate the mobile object
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

          console.log(mobile.calculateDepreciationPercentage());
        });
      } else if (objectToCreate === "Laptop") {
        formContainer.innerHTML = " ";
        formContainer.append(createLaptopForm(createBrandSelector(data)));
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching admin data:", error);
  });

// UTILITIES
function createHeader() {
  const header = utilities.createTag(
    "header",
    "main-header",
    "networth-header",
    ""
  );

  const menuDivs = utilities.createDiv("menu", "header-menu");
  menuDivs.append(
    utilities.createAnchor("auth-anchor", "header-sign-in", "#", "Sign In"),
    utilities.createAnchor("auth-anchor", "header-sign-up", "#", "Sign Up")
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
}

function RegisterForm() {
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
}

// create select tag
function createBrandSelector(DataObject) {
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
}

// fetch data from the admin server
function fetchAdminData() {
  return fetch("http://localhost:5000/admin")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Unable to get data from the server, Error: " + response.message
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching admin data:", error);
    });
}

//create ITEMS TYPE SELECTOR
function createItemTypeSelector(ItemsNames) {
  const select = utilities.createTag("select", "selector", "item-type", "");

  ItemsNames.forEach((name) => {
    const option = utilities.createTag("option", "option-class", name, name);
    select.append(option);
  });
  return select;
}

//create a form for mobile
function createMobileForm(brand) {
  const form = utilities.createForm("device-form", "mobile-form", " ", "POST");

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
}

function createLaptopForm(brand) {
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
    // utilities.createInput(
    //   "form-input",
    //   "laptop-form-input",
    //   "text",
    //   "model",
    //   "Model",
    //   true
    // ),
    utilities.createInput(
      "form-input",
      "laptop-ram-size-input",
      "text",
      "ramSize",
      "Ram Size",
      true
    ),
    utilities.createInput(
      "form-input",
      "laptop-cpu-cores-input",
      "text",
      "cpuCores",
      "CPU Cores",
      true
    ),
    utilities.createInput(
      "form-input",
      "laptop-drive-storage-input",
      "text",
      "driveStorage",
      "Drive Storage",
      true
    ),
    createItemTypeSelector(["Select Disc Type", "SSD", "HDD", "Both"]),
    utilities.createButton(
      "btn-primary",
      "laptop-form-btn",
      "submit",
      "Find Worth"
    )
  );
  form.append(div);
  return form;
}
