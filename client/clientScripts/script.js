import Mobile from "../Classes/Phone.js";
import Laptop from "../Classes/Laptop.js";
import utilities from "./utilities.js";
import utilityComponents from "./utilityComponents.js";

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
    utilityComponents.createHeader(),
    utilityComponents.createItemTypeSelector(ItemNamesList),
    formContainer
  );
}

if (loggedBody) {
  loggedBody.append(
    utilityComponents.createLoggedHeader(),
    utilityComponents.createItemTypeSelector(ItemNamesList),
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
        formContainer.append(
          utilityComponents.createMobileForm(
            utilityComponents.createBrandSelector(data)
          )
        );

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
        formContainer.append(
          utilityComponents.createLaptopForm(
            utilityComponents.createBrandSelector(data),
            utilityComponents.createItemTypeSelector([
              "Select drive type",
              "HDD",
              "SSD",
            ])
          )
        );
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

  fetchLoggedInUserData()
    .then((data) => {
      user_id = data.user_id;
    })
    .catch((error) => {
      console.error("Error fetching authenticated user data:", error);
    });
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

function fetchLoggedInUserData() {
  return fetch(uri + "/user-data", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}
