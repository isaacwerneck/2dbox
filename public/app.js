const state = {
  mode: "login"
};

const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const form = document.getElementById("auth-form");
const submitBtn = document.getElementById("submit-btn");
const messageEl = document.getElementById("message");

if (localStorage.getItem("authUser")) {
  window.location.href = "/home.html";
}

function setMode(mode) {
  state.mode = mode;

  const isLogin = mode === "login";
  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);
  submitBtn.textContent = isLogin ? "Login" : "Create account";
  messageEl.textContent = "";
  messageEl.className = "message";
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

async function submitAuth(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !password) {
    showMessage("Name and password are required.", "error");
    return;
  }

  const endpoint = state.mode === "login" ? "/api/login" : "/api/register";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password })
    });

    const payload = await response.json();

    if (!response.ok) {
      showMessage(payload.error || "Request failed.", "error");
      return;
    }

    if (state.mode === "register") {
      showMessage("Account created. You can login now.", "success");
      setMode("login");
      return;
    }

    localStorage.setItem("authUser", payload.user.name);
    window.location.href = "/home.html";
  } catch (_error) {
    showMessage("Network error. Try again.", "error");
  }
}

tabLogin.addEventListener("click", () => setMode("login"));
tabRegister.addEventListener("click", () => setMode("register"));
form.addEventListener("submit", submitAuth);

setMode("login");
