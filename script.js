const loginForm = document.getElementById("login-form");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const API_URL = "https://reqres.in/api/login";
  const emailInput = loginForm.querySelector("#email");
  const passwordInput = loginForm.querySelector("#password");
  const formData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  sessionStorage.setItem("formData", JSON.stringify(formData));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log(data);

  if (response.ok) {
    alert("successfully logged in, your token is " + data.token);
    // Set the cookie expiration date to 7 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    // Set the cookie value to the user token
    const userToken = data.token;
    document.cookie = `userToken=${userToken}; expires=${expiryDate.toUTCString()}; path=/`;
    window.location = "successPage.html";
  } else {
    alert(data.error);
  }
});
const logOutBtn = document.querySelector(".logOut-btn");
logOutBtn?.addEventListener("click", () => {
  document.cookie =
    "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});
if (document.cookie) {
  const displayUserEmail = document.querySelector(".display-useremail");
  displayUserEmail.innerHTML = `your Email address is ${
    JSON.parse(sessionStorage.getItem("formData")).email
  }`;
}
if (
  window.location.pathname === "/authentication/successPage.html" &&
  !document.cookie
) {
  window.location.pathname = "/authentication/successPage.html";
}
