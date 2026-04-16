function createCounter(){
    let count = 10;
    return function(){
        count+=2;
        document.getElementById("count").innerText=count;
    }
}

const counter = createCounter();

document.getElementById("btn").addEventListener("click",counter);   