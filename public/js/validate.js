function validateLoginForm() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pwd').value.trim();

  if (!email || !password) {
    alert("Email and Password are required!");
    return false;
  }
  return true;
}

function validateSignupForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pwd').value.trim();

  if (!name || !email || !password) {
    alert("All fields are required!");
    return false;
  }
  return true;
}
