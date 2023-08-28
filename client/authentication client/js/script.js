// select signup form
const signupForm = document.querySelector(".sign-up-form");
const loginForm = document.querySelector(".login-form");
const protectedContent = document.querySelector(".logged-user");
const body = document.querySelector(".home-body");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const userData = { name, email, password, confirmPassword };

    fetch("http://localhost:5000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("newtwork response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
//get admin data
// fetchAdminData()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("Error fetching admin data:", error);
//   });

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const userData = { email, password };

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("newtwork response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "../../html/logged.html";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// // fetch data from the admin
// function fetchAdminData() {
//   return fetch("http://localhost:5000")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           "Unable to get data from the server, Error: " + response.message
//         );
//       }
//       // console.log(response.jscon());
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Error fetching admin data:", error);
//     });
// }
