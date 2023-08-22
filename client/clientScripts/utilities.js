// returns a form with parameters as attributes

const utilities = {
  /**
   * Create and return a form and add form attributes.
   *
   * @param {string} className - Class name attribute of this form.
   * @param {string} id - Id attribute of this form.
   * @param {string} action - Type of action the form perfom when when button is clicked e.g. 'submit', etc.
   * @param {string} method - Type of method the form perfom when triggered e.g. 'post', 'get., etc.
   * @returns {form} The form, with all attributes added.
   */
  createForm: function (className, Id, action, method) {
    const form = document.createElement("form");
    form.classList.add(className);
    form.setAttribute("id", Id);
    form.setAttribute("action", action);
    form.setAttribute("method", method);
    return form;
  },

  /**
   * Create and return a button and add button attributes.
   *
   * @param {string} className - Class name attribute of this button.
   * @param {string} id - Id attribute of this button.
   * @param {string} type - Type of this button e.g. submit.
   * @param {string} innerText - Button label.
   * @returns {button} The button, with all attributes added.
   */
  createButton: function (className, id, type, innerText) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.setAttribute("id", id);
    button.setAttribute("type", type);
    button.innerText = innerText;
    return button;
  },

  /**
   * Create and return a div  and add attributes.
   *
   * @param {string} className - Class name attribute of this div.
   * @param {string} id - Id attribute of this div.
   * @returns {div} The div, with all attributes added.
   */
  createDiv: function (className, id) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.setAttribute("id", id);
    return div;
  },

  /**
   * Create and return an anchor tag and add attributes.
   *
   * @param {string} className - Class name attribute of this anchor.
   * @param {string} id - Id attribute of this anchor.
   * @param {string} href - The link to the next page.
   * @param {string} innerText - The anchor label.
   * @returns {a} The anchor, with all attributes added.
   */
  createAnchor: function (className, id, href, innerText) {
    const a = document.createElement("a");
    a.classList.add(className);
    a.setAttribute("id", id);
    a.href = href;
    a.innerText = innerText;
    return a;
  },

  /**
   * Create and return any tag you choose and add attributes.
   *
   * @param {string} tagType - Any html tag you wish to create e.g. h1, p, header, tr, etc...
   * @param {string} className - Class name attribute of this anchor.
   * @param {string} id - Id attribute of this anchor.
   * @param {string} innerText - The tag inner content.
   * @returns {tag} The tag, with all attributes added.
   */
  createTag: function (tagType, className, id, innerText) {
    const tag = document.createElement(tagType);
    tag.classList.add(className);
    tag.setAttribute("id", id);
    tag.innerText = innerText;

    return tag;
  },

  /**
   * Create and return an input tag and add attributes.
   *
   * @param {string} className - Class name attribute of this input.
   * @param {string} id - Id attribute of this input.
   * @param {string} inputType - The type of values the input accept e.g. text. password, email, etc.
   * @param {string} name - The value for the name attribute of an input tag
   * @param {string} placeholder - The value placeholder attribute of the input.
   * @param {string} isRequired - The attribute that determine if the input is required or not, takes true or false values
   * @returns {input} The input, with all attributes added.
   */
  createInput: function (
    className,
    id,
    inputType,
    name,
    placeholder,
    isRequired
  ) {
    const input = document.createElement("input");

    input.setAttribute("class", className);
    input.setAttribute("id", id);
    input.setAttribute("type", inputType);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    if (isRequired) {
      input.setAttribute("required", "required");
    }
    return input;
  },

  /**
   * Create and return an input tag and add attributes.
   *
   * @param {string} className - The value of this className attribute.
   * @param {string} id - The id value of this attribute.
   * @param {string} forAttr - The input to which this label belong
   * @param {string} innerText - The content value of this label
   * @returns {label} The label, with all attributes added.
   */
  createLabel: function (className, id, forAttr, innerText) {
    const label = document.createElement("label");
    label.classList.add(className);
    label.setAttribute("id", id);
    label.setAttribute("for", forAttr);
    label.innerText = innerText;
    return label;
  },
};

export default utilities;
