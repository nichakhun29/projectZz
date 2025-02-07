const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
console.log(`Name: ${name}, Email:${email}`);

function verifyJWT(token,secret) {
    const [header,body,signature] = token.split(".");
    const validSignature = btoa(`${header}.${body}.${secret}`) ;
    if (signature !== validSignature ) {
        return {valid: false,reason:"Invalid signature"};
    }
    const payload = JSON.parse(atob(body));
    if (Date.now()> payload.exp) {
        return {valid: false,reason:"Token expired"};
    }
    return{valid: true,payload}
}

document.getElementById("checkJwtBtn").addEventListener("click",function(){
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No token found . Please login");
        window.location.href = "index.html"
        return;
    }
    const result = verifyJWT(token,"mysecret");
    if (!result.valid) {
        if(result.reason === "Token expired") {
            alert("Token expired. Please login again."); 
            localStorage.removeItem("token");
        } else {
            alert("Invalid token.Please login again.");
        }
        window.location.href ="index.html";
    } else {
        alert("Token is valid! Welcome Back, " + result.payload.username);
    }
});

document.getElementById("logoutBtn").addEventListener("click",function () {
    localStorage.removeItem("token");
    alert("Logged out succesfully! ");
    window.location.href = "index.html";
});