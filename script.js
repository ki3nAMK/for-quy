function handleQuery(role) {
  const query =
    role === "admin"
      ? document.getElementById("admin-query").value
      : document.getElementById("user-query").value;

  if (query.trim()) {
    alert(`${role.toUpperCase()} Query Submitted: ${query}`);
    fetch("http://your-node-server/api/submit-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, query }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Please enter a query before submitting.");
  }
}

document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("token", data.token);
        window.location.href = data.redirect;
      } else {
        alert("Đăng nhập thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi đăng nhập");
    }
  });
