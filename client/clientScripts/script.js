import Mobile from "../Classes/Phone.js";
import Laptop from "../Classes/Laptop.js";
import utilities from "./utilities.js";

const indexBody = document.querySelector(".index-body");

// indexBody.append(createHeader(), RegisterForm());

//utilities

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
      "#",
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
