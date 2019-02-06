const form = document.getElementById("signUp");
const statusDiv = document.getElementById("status");

const handleFormSubmit = event => {
  event.preventDefault();

  const data = toJSONString(form);
  const url = "https://questioner-app-api.herokuapp.com/api/v1/auth/signup";
  fetch(url, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 201) {
        localStorage.setItem("token", JSON.stringify(response.data[0].token));
        statusDiv.innerHTML = `<div class="success"><h4>Account created Sucessfully</h4></div>`;
        setTimeout(() => {
          window.location.href = "signin.html";
        }, 2000);
      }
      if (response.error) {
        if (response.error.user === "username or email exist") {
          statusDiv.innerHTML = `<div class="error"><h4>${Object.values(
            response.error
          )}</h4></div>`;
          setTimeout(() => {
            window.location.href = "signin.html";
          }, 2000);
        }
        statusDiv.innerHTML = `<div class="error"><h4>${Object.values(response.error)}</h4></div>`;
      }
    });
};

form.addEventListener("submit", handleFormSubmit);