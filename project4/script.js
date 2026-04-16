document.getElementById("btn").addEventListener("click", function () {
    const name = document.getElementById("placeholder").value;
    document.getElementById("result").innerText = "Hello, " + name;
});