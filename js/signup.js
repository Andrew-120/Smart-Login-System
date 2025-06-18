const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const form = document.getElementById("signupForm");
const signInLink = document.querySelector("span a");

const messageName = document.getElementById("messageName");
const messageEmail = document.getElementById("messageEmail");
const messagePassword = document.getElementById("messagePassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (nameValue === "" || emailValue === "" || passwordValue === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: `Please enter your <b>name</b>, <b>email</b>, and <b>password</b>`,
    });
    return;
  }

  if (!validationName() || !validationEmail() || !validationPassword()) {
    Swal.fire({
      icon: "warning",
      title: "Invalid input",
      text: "Please enter valid details.",
    });
    return;
  }

  const user = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
  };

  let userList = JSON.parse(localStorage.getItem("userList")) || [];

  const isDuplicate = userList.some(
    (u) => u.email.toLowerCase() === emailValue.toLowerCase()
  );

  if (isDuplicate) {
    Swal.fire({
      icon: "info",
      title: "Email already exists",
      text: "Try logging in again.",
    });
    return;
  }

  userList.push(user);
  localStorage.setItem("userList", JSON.stringify(userList));
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("name", nameValue);

  clearForm();

  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Registration successful!",
  }).then(() => {
    window.location.href = "../index.html";
  });
});

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  nameInput.classList.remove("is-valid", "is-invalid");
  emailInput.classList.remove("is-valid", "is-invalid");
  passwordInput.classList.remove("is-valid", "is-invalid");

  messageName.classList.add("d-none");
  messageEmail.classList.add("d-none");
  messagePassword.classList.add("d-none");
}

function validationName() {
  const regex = /^[A-Z][a-z]{3,10}$/;
  if (regex.test(nameInput.value)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    messageName.classList.add("d-none");
    return true;
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
    messageName.classList.remove("d-none");
    return false;
  }
}

function validationEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    messageEmail.classList.add("d-none");
    return true;
  } else {
    emailInput.classList.remove("is-valid");
    emailInput.classList.add("is-invalid");
    messageEmail.classList.remove("d-none");
    return false;
  }
}

function validationPassword() {
  const regex = /^[0-9]{8}$/;
  if (regex.test(passwordInput.value)) {
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    messagePassword.classList.add("d-none");
    return true;
  } else {
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
    messagePassword.classList.remove("d-none");
    return false;
  }
}

nameInput.addEventListener("input", validationName);
emailInput.addEventListener("input", validationEmail);
passwordInput.addEventListener("input", validationPassword);

signInLink.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "../index.html";
});
