const nameSpan = document.getElementById("nameSpan");
const name = localStorage.getItem("name");

if (nameSpan && name) {
  nameSpan.textContent = name;
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  window.location.href = "../index.html";
});
