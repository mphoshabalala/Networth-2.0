import Mobile from "../Classes/Phone.js";
import Laptop from "../Classes/Laptop.js";
import utilities from "./utilities.js";
import utilityComponents from "./utilityComponents.js";
import api from "./apiRequests.js";
const uri = "http://localhost:5000";

//global variables
let userAssetsList;
let user_id;
const token = localStorage.getItem("token");
//GLOBAL EVENT LISTENERS
const userData = document.createElement("p");

const body = document.querySelector(".body");
const indexBody = document.querySelector("#index-body");
const formContainer = document.querySelector(".form-container");
const loggedBody = document.querySelector("#logged");
const assets = document.querySelector("#main-assets");
const outerBodyAssets = document.querySelector("#assets");
//GLOBAL VARIABLES AND CONSTANTS
const ItemNamesList = ["Select Device", Mobile.name, Laptop.name];

// HTML BODY ENTRY ELEMENTS
if (body) {
  if (indexBody) {
    indexBody.append(
      utilityComponents.createHeader(),
      utilityComponents.createItemTypeSelector(ItemNamesList, "device-type"),
      formContainer
    );
  } else if (loggedBody) {
    loggedBody.append(
      utilityComponents.createLoggedHeader(),
      utilityComponents.createItemTypeSelector(ItemNamesList, "device-type"),
      formContainer
    );
  } else if (assets) {
    assets.append(utilityComponents.createLoggedHeader());
    api.fetchAssets(uri, token).then((data) => {
      console.log(data);
      assets.append(utilityComponents.createPhoneList(data.assets));
    });
  }

  body.append(utilityComponents.createFooter());
}

//APPEND DATA ASYNCHRONOUSLY
api
  .fetchAdminData(uri)
  .then((data) => {
    const itemTypesSelector = document.querySelector("#device-type");
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

          const mobile = utilityComponents.buildMobile(
            brand,
            model,
            age,
            os,
            osVersion,
            price,
            marketDemand,
            productUpdateRate,
            warranty
          );
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

          utilityComponents.clearInputFields();

          // send the data to the server
          api
            .postData(uri + "/phone-data", phoneData)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Unable to connect to the server");
              }
              return response.json();
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      } else if (objectToCreate === "Laptop") {
        formContainer.innerHTML = " ";
        e.preventDefault();
        //append laptop form inputs
        formContainer.append(
          utilityComponents.createLaptopForm(
            utilityComponents.createBrandSelector(data),
            utilityComponents.createItemTypeSelector(
              ["Select drive type", "HDD", "SSD"],
              "drive-type"
            )
          )
        );

        const laptopForm = document.querySelector("#laptop-form");
        laptopForm.addEventListener("submit", (e) => {
          e.preventDefault();
          //get form data
          const brandSelector = document.querySelector("#brand-selection");
          const brand = brandSelector.value;
          const selectedData = data.find((item) => item.item_name === brand);
          const marketDemand = selectedData.market_demand;
          const productUpdateRate = selectedData.product_update_rate;
          const warranty = selectedData.warranty;
          const driveTypeSelector = document.querySelector("#drive-type");
          const formData = new FormData(laptopForm);
          const driveType = driveTypeSelector.value;
          const model = formData.get("model");
          const age = formData.get("age");
          const os = formData.get("os");
          const os_version = formData.get("os_version");
          const ramSize = formData.get("ram_size");
          const cpuCores = formData.get("cpu_cores");
          const driveStorage = formData.get("drive_storage");
          const price = formData.get("price");

          const laptop = utilityComponents.buildLaptop(
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
          );
          const color = laptop.getColor();

          const laptopData = {
            brand,
            model,
            age,
            os,
            os_version,
            productUpdateRate,
            warranty,
            marketDemand,
            color,
            price,
            ramSize,
            cpuCores,
            driveStorage,
            driveType,
            user_id,
          };
          console.log(laptopData);
          utilityComponents.clearInputFields();

          //send the data to the server
          api
            .postData(uri + "/laptop-data", laptopData)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Unable to connect to the server");
              }
              return response.json();
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching admin data:", error);
  });

// const loggedInPage = document.querySelector(".logged-in");

if (token) {
  if (!token) {
    alert("You need to be logged in to access the protected content.");
  }

  api
    .fetchLoggedInUserData(uri, token)
    .then((data) => {
      user_id = data.user_id;
    })
    .catch((error) => {
      console.error("Error fetching authenticated user data:", error);
    });
}
