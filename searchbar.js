const searchButton = document.getElementById("s-button");
searchButton.addEventListener('click', function(){
    alert("Button Clicked");
})
let searchedText = document.querySelector("search-container").innerHTML;
alert(searchedText);

/*const books = {
    acotar: { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    acomaf: { name: "A Court of Mist and Fury", author: "Sarah J. Maas" },
    acowar: { name: "A Court of Wings and Ruin", author: "Sarah J. Maas" },
};*/