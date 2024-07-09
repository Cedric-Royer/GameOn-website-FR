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
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// add close button to modal
modalCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// check if all data format is correct before validate
function validate() {

  const formElements = {
    firstName: { element: document.getElementById('first'), required: true },
    lastName: { element: document.getElementById('last'), required: true },
    email: { element: document.getElementById('email'), required: true },
    birthdate: { element: document.getElementById('birthdate'), required: true },
    quantity: { element: document.getElementById('quantity'), required: true},
    location: { element: document.querySelector('input[name="location"]'),
                elementDetails: document.querySelector('input[name="location"]:checked'),
                required: true },
    useConditions: { element: document.getElementById('checkbox1'), required: true }
  };

  let isValid = true;

  clearData();

  if (formElements.firstName.required === true) {
    checkFirstName();
  }
  if (formElements.lastName.required === true){
    checkLastName();
  }
  if (formElements.email.required === true){
    checkEmail();
  }
  if (formElements.birthdate.required === true){
    checkBirthday();
  }
  if (formElements.quantity.required === true){
    checkTournoiQuantity();
  }
  if (formElements.location.required === true){
    checkLocation();
  }
  if (formElements.useConditions.required === true){
    checkUseConditions();
  }
  
  if (isValid) {
    submitForm();
  }
  
  function submitForm() {
      const reservationForm = document.getElementById("form-reservation");
      const submitForm = document.getElementById("form-submit");
      submitForm.setAttribute("type", "submit");
      reservationForm.submit();
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
    if (firstName.value.length < 2) {
      addErrorMessage(firstName, "Le prénom doit comporter au moins 2 caractères.");
      isValid = false;
  } else {
      addValidInput(firstName);
    }
  }

  // Validate last name
  function checkLastName() {
    const lastName = formElements.lastName.element;
    if (lastName.value.length < 2) {
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
    const parent = element.closest('.formData');
    parent.setAttribute('data-error', message);
    parent.setAttribute('data-error-visible', 'true');
  }

  // Change color if it's valid
  function addValidInput(element) {
    const parent = element.closest('.formData');
    parent.setAttribute('data-valid', 'true');
  }
}

