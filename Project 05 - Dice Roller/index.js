
var random1 = Math.floor(Math.random()*6+1)
var random2 = Math.floor(Math.random()*6+1)


if (random1>random2) {
    document.querySelector("h1").textContent="🚩Player 1 Win";
}else if (random1<random2){
    document.querySelector("h1").textContent="Player 2 Win🚩";
}else{
    document.querySelector("h1").textContent="Draw... !";
}


document.querySelector(".img1").setAttribute("src", "images/dice"+random1+".png");
document.querySelector(".img2").setAttribute("src", "images/dice"+random2+".png");