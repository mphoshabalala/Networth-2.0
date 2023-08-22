import utilities from "../client/clientScripts/utilities.js";
const adminSubmitform = document.querySelector("form");

if (adminSubmitform) {
  adminSubmitform.addEventListener("submit", (e) => {
    const adminData = new FormData(adminSubmitform);
    const brand = adminData.get("brand");
    const marketDemand = adminData.get("marker-demand");
    const warranty = adminData.get("warranty");
    const updateRate = adminData.get("update-rate");
    const itemData = { brand, marketDemand, warranty, updateRate };

    //post itemData into the database
    fetch("http://localhost:5000/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to connect to the server");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log("Error posting data: ", err.message);
      });
  });
}

fetchAdminData()
  .then((data) => {
    const table = createTable(data);
    adminSubmitform.append(table);
  })
  .catch((error) => {
    console.error("Error fetching admin data:", error);
  });

//utilities
function createTable(DataObject) {
  const table = utilities.createTag(
    "table",
    "data-table",
    "admin-data-table",
    ""
  );
  table.border = 3;
  const trHead = utilities.createTag("tr", "tr-class", "admin-tr", "");
  trHead.append(
    utilities.createTag("th", "th-class", "admin-th", "ID"),
    utilities.createTag("th", "th-class", "admin-th", "Brand"),
    utilities.createTag("th", "th-class", "admin-th", "Market Demand"),
    utilities.createTag("th", "th-class", "admin-th", "Warranty"),
    utilities.createTag("th", "th-class", "admin-th", "Product Update Rate")
  );
  table.append(trHead);

  DataObject.forEach((object) => {
    const tr = utilities.createTag("tr", "tr-class", "admin-tr", "");
    tr.append(
      utilities.createTag("td", "td-class", "admin-td", object.data_id),
      utilities.createTag("td", "td-class", "admin-td", object.item_name),
      utilities.createTag("td", "td-class", "admin-td", object.market_demand),
      utilities.createTag("td", "td-class", "admin-td", object.warranty),
      utilities.createTag(
        "td",
        "td-class",
        "admin-td",
        object.product_update_rate
      )
    );
    table.append(tr);
  });

  return table;
}

function fetchAdminData() {
  return fetch("http://localhost:5000/admin")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Unable to get data from the server, Error: " + response.message
        );
      }
      // console.log(response.jscon());
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching admin data:", error);
    });
}
