import utilities from "./utilities.js";
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
  createItemTypeSelector: function (ItemsNames) {
    const select = utilities.createTag("select", "selector", "item-type", "");

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
        "#",
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
};

export default utilityComponents;
