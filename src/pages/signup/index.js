import {
  required,
  minLength,
  validate,
  fieldMatches,
  includes,
} from "../../form/validators.js";

const validations = {
  name: minLength(5, "Name must be at least 5 characters long"),
  password: minLength(8, "Password must be at least 8 characters"),
  passwordConfirmation: fieldMatches("password", "Passwords don't match"),
  email: includes("@", "Email must be valid"),
  phoneNumber: required("Phone number must be informed"),
  gender: required("Gender must be informed"),
  contacts: minLength(1, "Choose at least one contact"),
  addressType: required("Address type must be informed"),
  address: required("Address must be informed"),
};

const getFormValues = () => {
  const getGender = () =>
    Array.from(document.getElementsByName("gender"))
      .filter((element) => element.checked)
      .map((element) => element.id)
      .pop();

  const getContacts = () =>
    Array.from(document.getElementsByName("contact"))
      .filter((element) => element.checked)
      .map((element) => element.id);

  const getAddressType = () => {
    const element = document.querySelector("#addressType");
    return element[element.selectedIndex].value;
  };

  return {
    name: document.querySelector("#name").value,
    password: document.querySelector("#password").value,
    passwordConfirmation: document.querySelector("#passwordConfirmation").value,
    email: document.querySelector("#email").value,
    phoneNumber: document.querySelector("#phoneNumber").value,
    gender: getGender(),
    contacts: getContacts(),
    addressType: getAddressType(),
    address: document.querySelector("#address").value,
  };
};

const displayErrors = (errors) => {
  const errorMap = Object.fromEntries(
    errors.map((error) => [error.field, error.message])
  );

  for (const field of Object.keys(validations)) {
    const element = document.querySelector(`#${field}ErrorMessage`);

    if (element) {
      element.innerText = errorMap[field] ? errorMap[field] : "";
    }
  }
};

const onSubmit = (event) => {
  event.preventDefault();

  validate(validations, getFormValues()).then(displayErrors);
};

document.querySelector("#sign-up-form").addEventListener("submit", onSubmit);
