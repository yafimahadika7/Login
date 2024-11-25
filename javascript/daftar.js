// Validasi Formulir Pendaftaran
function validateForm() {
    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Fullname:", fullname);
    console.log("Username:", username);
    console.log("Password:", password);

    // Pola validasi username (hanya huruf dan angka, tanpa spasi/simbol)
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (fullname === "" || username === "" || password === "") {
        showError("Semua kolom harus diisi!");
        return false;
    }

    if (!usernamePattern.test(username)) {
        showError("Username tidak boleh mengandung spasi atau simbol!");
        return false;
    }

    if (password.length < 8) {
        showError("Password harus memiliki minimal 8 karakter!");
        return false;
    }

    // Ambil data pengguna dari localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah username sudah ada
    if (users.some(user => user.username === username)) {
        showError("Username sudah digunakan!");
        return false;
    }

    // Hash password menggunakan crypto-js (harus ditambahkan di HTML)
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Simpan pengguna baru ke localStorage
    const newUser = { fullname: fullname, username: username, password: hashedPassword };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showSuccess("Pendaftaran Berhasil!");
    console.log("Data tersimpan di localStorage:", users);
    return false; // Agar tidak melakukan submit form secara default
}

// Menampilkan pesan sukses
function showSuccess(message) {
    const successMessage = document.getElementById("register-success");
    successMessage.classList.add("show");
    successMessage.querySelector("p").textContent = message;

    setTimeout(() => {
        successMessage.classList.remove("show");
        window.location.href = "index.html"; // Redirect ke halaman login
    }, 3000);
}

// Menampilkan pesan error
function showError(message) {
    const errorMessage = document.getElementById("register-error");
    errorMessage.classList.add("show");
    errorMessage.querySelector("p").textContent = message;

    setTimeout(() => {
        errorMessage.classList.remove("show");
    }, 3000);
}