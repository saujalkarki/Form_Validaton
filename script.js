const registerUserName = document.querySelector("#registerUserName");
const registerEmail = document.querySelector("#registerEmail");
const registerPhoneNumber = document.querySelector("#registerPhoneNumber");
const registerPassword = document.querySelector("#registerPassword");
const registerConfirmPassword = document.querySelector(
  "#registerConfirmPassword"
);
const registerBtn = document.querySelector(".registerBtn");

const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector(".loginBtn");

// Register
if (window.location.pathname.split("/").pop() === "register.html") {
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let existingErrorMessage;

    // Error function
    function userNameError(elm, msg) {
      existingErrorMessage = document.querySelector(`.${elm.id}`);

      if (existingErrorMessage) {
        existingErrorMessage.textContent = msg;
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = msg;
        errorMessage.className = `${elm.id} error`;
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "0.8em";
        elm.parentNode.insertBefore(errorMessage, elm.nextSibling);
      }
    }

    // remove error function
    function removeErrorMsg(errMsgElm) {
      if (errMsgElm) {
        errMsgElm.parentNode.removeChild(errMsgElm);
      }
    }

    // RegisterUserName validation
    if (registerUserName.value.length < 1) {
      userNameError(registerUserName, "Please enter a username");
    } else if (
      !/[a-zA-Z]/.test(registerUserName.value) ||
      !registerUserName.value.includes(" ")
    ) {
      userNameError(registerUserName, "Please enter a valid username");
    } else {
      let existingErrorMessage = document.querySelector(
        `.${registerUserName.id}`
      );
      removeErrorMsg(existingErrorMessage);
      sessionStorage.setItem("registerUserName", registerUserName.value);

      // RegisterEmail Validation
      if (!registerEmail.value.includes("@gmail.com")) {
        userNameError(registerEmail, "Please Enter a valid Email");
      } else {
        let existingErrorMessage = document.querySelector(
          `.${registerEmail.id}`
        );
        removeErrorMsg(existingErrorMessage);
        sessionStorage.setItem("registerEmail", registerEmail.value);

        sessionStorage.setItem(
          "registerPhoneNumber",
          registerPhoneNumber.value
        );

        // RegisterPassword Validation
        if (registerPassword.value.length < 8) {
          userNameError(
            registerPassword,
            "Password must contain atleast 8 characters"
          );
        } else if (!/[A-Z]/.test(registerPassword.value)) {
          userNameError(registerPassword, "Password must contain an UpperCase");
        } else if (!/[a-z]/.test(registerPassword.value)) {
          userNameError(registerPassword, "Password must contain a LowerCase");
        } else if (!/[1-9]/.test(registerPassword.value)) {
          userNameError(registerPassword, "Password must contain a Number");
        } else if (
          !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(registerPassword.value)
        ) {
          userNameError(registerPassword, "Password must contain a Symbol");
        } else {
          let existingErrorMessage = document.querySelector(
            `.${registerPassword.id}`
          );
          removeErrorMsg(existingErrorMessage);
          sessionStorage.setItem("registerPassword", registerPassword.value);

          // RegisterConfirmPassword Validation
          if (!registerConfirmPassword.value) {
            userNameError(
              registerConfirmPassword,
              "Please Re-enter the password"
            );
          } else if (registerConfirmPassword.value != registerPassword.value) {
            userNameError(
              registerConfirmPassword,
              "Confirm Password doesn't matched"
            );
          } else {
            let existingErrorMessage = document.querySelector(
              `.${registerConfirmPassword.id}`
            );
            removeErrorMsg(existingErrorMessage);
            sessionStorage.setItem(
              "registerConfirmPassword",
              registerConfirmPassword.value
            );
            window.location.href = "login.html";
          }
        }
      }
    }
  });
}
// Login
else if (window.location.pathname.split("/").pop() === "login.html") {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      // Checking Login Email
      loginEmail.value === sessionStorage.getItem("registerEmail") &&
      //Checking Login Password
      loginPassword.value === sessionStorage.getItem("registerPassword") &&
      loginPassword.value === sessionStorage.getItem("registerConfirmPassword")
    ) {
      window.location.href = "successLogin.html";
    } else {
      const errMsg = document.querySelector(".loginErr");

      if (errMsg) return;

      const errorMessageLogin = document.createElement("p");
      errorMessageLogin.textContent = "Login Credentials didn't matched";
      errorMessageLogin.className = `loginErr error`;
      errorMessageLogin.style.color = "red";
      errorMessageLogin.style.fontSize = "0.8em";
      loginPassword.parentNode.insertBefore(
        errorMessageLogin,
        loginPassword.nextSibling
      );
    }
  });
}
// kind of--authorize
else {
  const logInName = document.querySelector(".logInName");
  logInName.textContent = sessionStorage.getItem("registerUserName");
}
