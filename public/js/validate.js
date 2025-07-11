function validateLoginForm() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pwd").value.trim();
  const errorDiv = document.getElementById("loginError");

  errorDiv.classList.add("d-none");
  errorDiv.textContent = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email && !password) {
    errorDiv.textContent = "Email and Password are required!";
  } else if (!email) {
    errorDiv.textContent = "Email is required!";
  } else if (!password) {
    errorDiv.textContent = "Password is required!";
  }
  else if (email && !emailPattern.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
  }

  if (errorDiv.textContent !== "") {
    errorDiv.classList.remove("d-none");
    return false; 
  }

  return true; 
}


function validateSignupForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pwd').value.trim();
  const errorDiv = document.getElementById('error');

  
  errorDiv.classList.add("d-none");
  errorDiv.textContent = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name && !email && !password) {
    errorDiv.textContent = "All fields are required!";
  } else if (name && !email && !password) {
    errorDiv.textContent = "Email and password are required!";
  } else if (name && email && !password) {
    errorDiv.textContent = "Password is required!";
  } else if (email && !emailPattern.test(email)) {
    errorDiv.textContent = "Please enter a valid email address.";
  }

  
  if (errorDiv.textContent !== "") {
    errorDiv.classList.remove("d-none");
    return false;
  }

  return true;
}

