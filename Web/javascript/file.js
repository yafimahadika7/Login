document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameInput = document.querySelector('input[type="text"]').value;
    const passwordInput = document.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(user => user.username === usernameInput && user.password === passwordInput);

    if (userFound) {
        const successNotification = document.getElementById("login-success");
        successNotification.style.display = "block";

        setTimeout(() => {
            successNotification.style.display = "none";
            window.location.href = "/html/web/index.html";
        }, 2000);
    } else {
        const errorNotification = document.getElementById("login-error");
        errorNotification.style.display = "block";

        setTimeout(() => {
            errorNotification.style.display = "none";
        }, 2000);
    }
});
