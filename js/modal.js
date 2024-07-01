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
const modalValidBtn = document.querySelector(".btn-submit");

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



// check required input in modal form
function validate() {
  // Get form values
  const firstName = document.getElementById('first');
  const lastName = document.getElementById('last');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const quantity = document.getElementById('quantity');
  const location = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById('checkbox1').checked;

  // Remove previous error messages and classes
  document.querySelectorAll('.formData').forEach(el => {
      el.removeAttribute('data-error');
      el.removeAttribute('data-error-visible');
  });

  // Validation flags
  let isValid = true;

  // Helper function to add error message
  function addErrorMessage(element, message) {
      const parent = element.closest('.formData');
      parent.setAttribute('data-error', message);
      parent.setAttribute('data-error-visible', 'true');
      element.classList.add('invalid');
  }

  // Validate first name
  if (firstName.value.length < 2) {
      addErrorMessage(firstName, "Le prénom doit comporter au moins 2 caractères.");
      isValid = false;
  } else {
      firstName.classList.add('valid');
  }

  // Validate last name
  if (lastName.value.length < 2) {
      addErrorMessage(lastName, "Le nom doit comporter au moins 2 caractères.");
      isValid = false;
  } else {
      lastName.classList.add('valid');
  }

  // Validate email
  if (email.value.trim() === '') {
    addErrorMessage(email, "L'adresse email est requise.");
    isValid = false;
  } else {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email.value)) {
      addErrorMessage(email, "L'adresse email n'est pas valide.");
      isValid = false;
    } else {
      setValid(email);
    }
  }

  // Validate quantity
  if (isNaN(quantity.value) || quantity.value < 0 || quantity.value > 99) {
      addErrorMessage(quantity, "La quantité doit être un nombre entre 0 et 99.");
      isValid = false;
  } else {
      quantity.classList.add('valid');
  }

  // Validate location
  if (!location) {
      addErrorMessage(document.querySelector('input[name="location"]'), "Veuillez sélectionner un lieu.");
      isValid = false;
  } else {
      document.querySelectorAll('input[name="location"]').forEach(el => el.classList.add('valid'));
  }

  // Validate checkbox1
  if (!checkbox1) {
      addErrorMessage(document.getElementById('checkbox1'), "Vous devez accepter les conditions d'utilisation.");
      isValid = false;
  } else {
      document.getElementById('checkbox1').classList.add('valid');
  }

  // Prevent form submission if validation fails
  return isValid;
}


