const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (email === "" || password === "") {
      alert("Please fill in all login fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (email === "gideonrey@gmail.com" && password === "676767") {
      localStorage.setItem("userRole", "admin");
      window.location.href = "admin.html";
      return;
    }

    localStorage.setItem("userRole", "user");
    window.location.href = "profile.html";
  });
}

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document
      .getElementById("signupConfirmPassword")
      .value.trim();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      e.preventDefault();
      alert("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      e.preventDefault();
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      alert("Passwords do not match.");
      return;
    }
  });
}

const nav = document.querySelector(".nav-buttons");
const role = localStorage.getItem("userRole");

if (nav && role === "admin") {
  const adminLink = document.createElement("a");
  adminLink.href = "admin.html";
  adminLink.textContent = "Admin Dashboard";
  nav.appendChild(adminLink);
}

let currentMeal = null;

function searchMeal() {
  const input = document.getElementById("mealInput").value;
  const result = document.getElementById("mealResult");

  if (!input) {
    result.innerHTML = "<p>Please enter a food or drink.</p>";
    return;
  }

  result.innerHTML = "<p>Loading menu...</p>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.meals) {
        result.innerHTML = "<p>No items found.</p>";
        return;
      }

      const meal = data.meals[0];

      currentMeal = {
        name: meal.strMeal,
        category: meal.strCategory,
        image: meal.strMealThumb,
      };

      result.innerHTML = `
        <div class="profile-card">
          <img src="${currentMeal.image}">
          <h2>${currentMeal.name}</h2>
          <p><strong>Category:</strong> ${currentMeal.category}</p>
          <div class="profile-actions">
            <button onclick="saveMeal()">Save</button>
          </div>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = "<p>Error loading menu.</p>";
    });
}

function saveMeal() {
  let saved = JSON.parse(localStorage.getItem("meals")) || [];

  if (saved.some((m) => m.name === currentMeal.name)) {
    alert("Already saved");
    return;
  }

  saved.push(currentMeal);
  localStorage.setItem("meals", JSON.stringify(saved));

  alert("Saved to favorites");
}
