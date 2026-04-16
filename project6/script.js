document.getElementById("getBtn").addEventListener("click",getdata);
  async function getdata() {
    try{
        let response = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
        let data = await response.json();
        document.getElementById("status").innerText = data.rates.INR;
    }
    catch(error){
        document.getElementById("status").innerText = error;    
    }
  }
