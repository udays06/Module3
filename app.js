const API_URL = "http://localhost:5000/api";
let token = localStorage.getItem("token") || "";

function showMessage(text, isError = false) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.style.color = isError ? "red" : "green";
}

async function registerUser() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (response.ok) {
    showMessage(data.message);
  } else {
    showMessage(data.message, true);
  }
}

async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    token = data.token;
    localStorage.setItem("token", token);
    showMessage(`Welcome, ${data.user.name}`);
  } else {
    showMessage(data.message, true);
  }
}

async function createBlog() {
  if (!token) {
    showMessage("Please login first", true);
    return;
  }

  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;

  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });

  const data = await response.json();

  if (response.ok) {
    showMessage(data.message);
    document.getElementById("blogTitle").value = "";
    document.getElementById("blogContent").value = "";
    getBlogs();
  } else {
    showMessage(data.message, true);
  }
}

async function getBlogs() {
  const response = await fetch(`${API_URL}/blogs`);
  const data = await response.json();

  const blogsContainer = document.getElementById("blogs");
  blogsContainer.innerHTML = "";

  if (!response.ok) {
    showMessage(data.message, true);
    return;
  }

  data.blogs.forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = "blog";
    blogElement.innerHTML = `
      <h3><a href="blog.html?id=${blog._id}">${blog.title}</a></h3>
      <p>${blog.content.substring(0, 120)}...</p>
      <small>By ${blog.author?.name || "Unknown"}</small>
    `;
    blogsContainer.appendChild(blogElement);
  });
}
