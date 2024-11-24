async function validateForm() {
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validasi username: tidak boleh ada spasi atau simbol
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
        showError("Username tidak boleh mengandung spasi atau simbol!");
        return false;
    }

    // Validasi fullname dan password tidak kosong
    if (fullname.trim() === "" || password.trim() === "") {
        showError("Fullname dan Password tidak boleh kosong!");
        return false;
    }

    // Kirim data ke server menggunakan POST
    try {
        const response = await fetch("http://104.199.202.44:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullname, username, password }),
        });

        if (!response.ok) {
            const error = await response.text();
            showError(`Gagal mendaftar: ${error}`);
            return false;
        }

        // Jika berhasil, tampilkan pesan sukses dan redirect
        showSuccess("Pendaftaran Berhasil!");
    } catch (error) {
        showError(`Error: ${error.message}`);
    }

    return false; // Mencegah reload form
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