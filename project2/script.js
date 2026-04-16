function calculateGST(price){
    return price *0.18;
}

document.getElementById("btn").addEventListener("click",function(){
    let price =document.getElementById("price").value;
    let gst = calculateGST(price);
    document.getElementById("result").innerText="Total price is:"+ (Number(price)+ Number(gst));
});