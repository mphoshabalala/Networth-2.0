import Mobile from "../Classes/Phone.js";
import Laptop from "../Classes/Laptop.js";
import utilities from "./utilities.js";

const uri = "http://localhost:5000";
let user_id;
console.log(user_id);
//GLOBAL EVENT LISTENERS
const indexBody = document.querySelector(".index-body");
const formContainer = document.querySelector(".form-container");
const loggedBody = document.querySelector(".dashboard-body");
//GLOBAL VARIABLES AND CONSTANTS
const ItemNamesList = ["Select Device", Mobile.name, Laptop.name];

// HTML BODY ENTRY ELEMENTS
if (indexBody) {
  indexBody.append(
    createHeader(),
    createItemTypeSelector(ItemNamesList),
    formContainer
  );
}

if (loggedBody) {
  loggedBody.append(
    createLoggedHeader(),
    createItemTypeSelector(ItemNamesList),
    formContainer
  );
}
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
          const color = mobile.getColor();

          const phoneData = {
            brand,
            model,
            age,
            os,
            osVersion,
            productUpdateRate,
            warranty,
            color,
            marketDemand,
            price,
            user_id,
          };

          const inputFields = document.querySelectorAll(".form-input");
          inputFields.forEach((input) => {
            input.value = "";
          });

          // send the data to the server
          fetch(uri + "/phone-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(phoneData),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Unable to connect to the server");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Response data: " + data);
            })
            .catch((err) => {
              console.log(err.message);
            });
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

const loggedInPage = document.querySelector(".logged-in");
const token = localStorage.getItem("token");

if (token) {
  if (!token) {
    alert("You need to be logged in to access the protected content.");
  }

  fetch("http://localhost:5000/just", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      user_id = data.user_id;
    })
    .catch((error) => {
      console.error("Error fetching authenticated user data:", error);
    });
}
//fetching protected pages
// function fetchProtectedContent(token) {
//   if (!token) {
//     alert("You need to be logged in to access the protected content.");
//     return;
//   }

//   fetch("http://localhost:5000/just", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Couldnt fetch data");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching protected content:", error);
//     });
// }

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
}

function createLoggedHeader() {
  const header = utilities.createTag(
    "header",
    "main-header",
    "networth-header",
    ""
  );

  const menuDivs = utilities.createDiv("menu", "header-menu");
  menuDivs.append(
    utilities.createAnchor("auth-anchor", "header-sign-up", "#", "Your Assets"),
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
  return fetch(uri + "/admin")
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
