const mockUser = {
    username: "Nichakhun",  
    password: "12345",
    email: "nichakhun@gmail.com"
};

function createJWT(payload, secret, expireSec = 20) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify({
        ...payload,
        exp: Date.now() + expireSec * 1000,  
    }));
    const signature = btoa(`${header}.${body}.${secret}`);
    return `${header}.${body}.${signature}`;  
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === mockUser.username && password === mockUser.password) {  
        const token = createJWT({ username: mockUser.username }, "mysecret", 20);

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);  
        localStorage.setItem("password", password);

        alert("Login successful");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");  
    }
});
