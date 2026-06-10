const loginForm =
  document.getElementById("login-form");


loginForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();


    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;


    try {

      const response = await fetch(
        `${BASE_URL}/auth/login`,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );


      const data =
        await response.json();


      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );


      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      alert(data.message);


      // REDIRECT
      window.location.href =
        "./products.html";

    } catch (error) {

      console.log(error);
    }
  }
);