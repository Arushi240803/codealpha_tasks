const registerForm =
  document.getElementById("register-form");


registerForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();


    const name =
      document.getElementById("name").value;

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;


    try {

      const response = await fetch(
        `${BASE_URL}/auth/register`,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );


      const data =
        await response.json();


      alert(data.message);


      // REDIRECT TO LOGIN
      window.location.href =
        "./login.html";

    } catch (error) {

      console.log(error);
    }
  }
);