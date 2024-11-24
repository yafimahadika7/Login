function validateForm() {
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Fullname:", fullname);
    console.log("Username:", username);
    console.log("Password:", password);

    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (!usernamePattern.test(username)) {
        showError("Username tidak boleh mengandung spasi atau simbol!");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = { fullname: fullname, username: username, password: password };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    showSuccess("Pendaftaran Berhasil!");
    console.log("Data tersimpan di localStorage");
    return false;
}

function showSuccess(message) {
    const successMessage = document.getElementById("register-success");
    successMessage.style.display = "block";
    successMessage.querySelector("p").textContent = message;

    setTimeout(() => {
        successMessage.style.display = "none";
        window.location.href = "index.html";
    }, 3000);
}

function showError(message) {
    const errorMessage = document.getElementById("register-error");
    errorMessage.style.display = "block";
    errorMessage.querySelector("p").textContent = message;

    setTimeout(() => {
        errorMessage.style.display = "none";
    }, 3000);
}