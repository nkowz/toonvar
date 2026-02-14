let mode = "signup";

const title = document.getElementById("title");
const toggle = document.getElementById("toggle");
const submit = document.getElementById("submit");
const passInput = document.getElementById("pass");
const pfpInput = document.getElementById("pfpInput");
const pfpPreview = document.getElementById("pfpPreview");
const pfpSection = document.getElementById("pfpSection");

// Switch mode
toggle.onclick = () => {
  mode = mode === "signup" ? "login" : "signup";

  title.innerText = mode === "signup" ? "Create Account" : "Log In";
  submit.innerText = mode === "signup" ? "Sign Up" : "Log In";
  toggle.innerText = mode === "signup" ? "Log In" : "Sign Up";

  // Hide profile pic when logging in
  pfpSection.style.display = mode === "signup" ? "block" : "none";
};

// Show password toggle
document.getElementById("togglePass").onclick = () => {
  passInput.type = passInput.type === "password" ? "text" : "password";
};

// Profile picture preview
pfpInput.onchange = e => {
  const reader = new FileReader();
  reader.onload = () => pfpPreview.src = reader.result;
  reader.readAsDataURL(e.target.files[0]);
};

// Submit form
submit.onclick = () => {
  const name = document.getElementById("name").value;
  const pass = passInput.value;
  if(!name || !pass) return alert("Fill everything");

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if(mode === "signup"){
    if(users[name]) return alert("User exists");
    users[name] = { pass, pfp: pfpPreview.src };
  } 
  else {
    if(!users[name] || users[name].pass !== pass) return alert("Wrong login");
  }

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedUser", name);
  location.href = "toonvar.html";
};

// Auto login
if(localStorage.getItem("loggedUser")) {
  location.href = "dashboard.html";
}

// Toast function
function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
