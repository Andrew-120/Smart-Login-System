const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const form = document.getElementById("signinForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email === "" || password === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: `Please enter your <b>email</b> and <b>password</b>`,
    });
    return;
  }

  const userList = JSON.parse(localStorage.getItem("userList")) || [];

  const matchedUser = userList.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (matchedUser) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("name", matchedUser.name);
    window.location.href = "pages/home.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: `Invalid <b>email</b> or <b>password</b>`,
    });
    clearForm();
  }
});

const signup = document.querySelector("span a");
signup.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "pages/signup.html";
});

function clearForm() {
  emailInput.value = "";
  passwordInput.value = "";
}
