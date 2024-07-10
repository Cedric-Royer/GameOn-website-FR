function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formDataClass = '.formData';
const formData = document.querySelectorAll(formDataClass);
const modalCloseCross = document.getElementById("close-modal");
const validationCloseCross = document.getElementById("close-validation");
const validationCloseBtn = document.getElementById("btn-close");
const validationMessage = document.getElementById("validation-message");
const body = document.querySelector("body")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// add close event to exit cross modal
modalCloseCross.addEventListener("click", closeModal);

// add close event to exit cross validation message
validationCloseCross.addEventListener("click", closeValidationMessage);

// add close event to exit button validation message
validationCloseBtn.addEventListener("click", closeValidationMessage);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  window.scroll(0, 1);
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close validation message
function closeValidationMessage() {
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.delete('success');

  const nouvelleURL = window.location.pathname + '?' + urlParams.toString();

  window.location.href = nouvelleURL;
}

body.onload = printValidationMessage();

// Print validation message if form is valide
function printValidationMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const first = urlParams.get('first');

  if (success === 'true') {
    validationMessage.style.display = "block";
    outputFirstName.textContent = first
  }
}

// check if all data format is correct before validate
function validate(e) {

  const formElements = {
    firstName: { element: document.getElementById('first'), required: true },
    lastName: { element: document.getElementById('last'), required: false },
    email: { element: document.getElementById('email'), required: false },
    birthdate: { element: document.getElementById('birthdate'), required: false },
    quantity: { element: document.getElementById('quantity'), required: false},
    location: { element: document.querySelector('input[name="location"]'),
                elementDetails: document.querySelector('input[name="location"]:checked'),
                required: false },
    useConditions: { element: document.getElementById('checkbox1'), required: true }
  };

  let isValid = true;

  clearData();

  if (formElements.firstName.required === true) {checkFirstName()}
  if (formElements.lastName.required === true) {checkLastName()}
  if (formElements.email.required === true) {checkEmail()}
  if (formElements.birthdate.required === true) {checkBirthday()}
  if (formElements.quantity.required === true) {checkTournoiQuantity()}
  if (formElements.location.required === true) {checkLocation()}
  if (formElements.useConditions.required === true){checkUseConditions()}
  
  if (isValid) {
    submitForm();
  }

  else {
    e.preventDefault();
  }

  // Send the reservation form
  function submitForm() {
      const sucessSubmit = document.getElementById('success')
      const reservationForm = document.getElementById("form-reservation");
      const submitForm = document.getElementById("form-submit");
      console.log("envoi réussi -2");
      console.log("envoi réussi -1");
      sucessSubmit.value = 'true';
      closeModal()
      console.log(first.value);
      outputFirstName.textContent = first.value;
  }

  // Remove previous error messages and classes
  function clearData() {
    formData.forEach(el => {
      el.removeAttribute('data-error');
      el.removeAttribute('data-error-visible');
      el.removeAttribute('data-valid');
    });
  }

  // Validate first name
  function checkFirstName() {
    const firstName = formElements.firstName.element;
    if (firstName.value.trim() === '') {
      addErrorMessage(firstName, "Veuillez saisir votre prénom.");
      isValid = false;
    } 
    else if (firstName.value.length < 2) {
      addErrorMessage(firstName, "Le prénom doit comporter au moins 2 caractères.");
      isValid = false;
  } else {
      addValidInput(firstName);
    }
  }

  // Validate last name
  function checkLastName() {
    const lastName = formElements.lastName.element;
    if (lastName.value.trim() === '') {
      addErrorMessage(lastName, "Veuillez saisir votre nom.");
      isValid = false;
    } else if (lastName.value.length < 2) {
      addErrorMessage(lastName, "Le nom doit comporter au moins 2 caractères.");
      isValid = false;
  } else {
      addValidInput(lastName);
    }
  }

  // Validate email
  function checkEmail() {
    const email = formElements.email.element;
    if (email.value.trim() === '') {
      addErrorMessage(email, "Veuillez saisir votre adresse email.");
      isValid = false;
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email.value)) {
        addErrorMessage(email, "L'adresse email n'est pas valide.");
        isValid = false;
      } else {
        addValidInput(email);
      }
    }
  }

  //Validate birthday
  function checkBirthday() {
    const birthdate = formElements.birthdate.element;
    if (birthdate.value.trim() === '') {
      addErrorMessage(birthdate, "Veuillez remplir votre date de naissance.");
      isValid = false;
    } else {
      addValidInput(birthdate);
    }
  }

  // Validate numbers tournois
  function checkTournoiQuantity() {
    const quantity = formElements.quantity.element;
    if (quantity.value.trim() === '') {
      addErrorMessage(quantity, "Veuillez saisir le nombre de tournois auxquels vous avez participé.");
      isValid = false;
    }
    else if (isNaN(quantity.value)) {
      addErrorMessage(quantity, "Le nombre ne doit pas être écris en lettres.");
      isValid = false;
    } 
    else if (quantity.value < 0 || quantity.value > 99) {
      addErrorMessage(quantity, "Le nombre doit être compris entre 0 et 99.");
      isValid = false;
    } else {
      addValidInput(quantity);
    }
  }  

  // Validate location
  function checkLocation() {
    const location = formElements.location.element;
    const locationDetails = formElements.location.elementDetails;
    if (!locationDetails) {
      addErrorMessage(location, "Veuillez sélectionner un lieu.");
      isValid = false;
    } 
  }

  // Validate use conditions checked
  function checkUseConditions() {
    const useConditions = formElements.useConditions.element;
    if (!useConditions.checked) {
      addErrorMessage(useConditions, "Vous devez accepter les conditions d'utilisation.");
      isValid = false;
    } 
  }

  // Add error message
  function addErrorMessage(element, message) {
    const parent = element.closest(formDataClass);
    parent.setAttribute('data-error', message);
    parent.setAttribute('data-error-visible', 'true');
  }

  // Change color if it's valid
  function addValidInput(element) {
    const parent = element.closest(formDataClass);
    parent.setAttribute('data-valid', 'true');
  }

}