/** @type {HTMLInputElement} */

const searchButton = document.getElementById("s-button");
const searchInput = document.querySelector('input[type="text"]');
const titles = [], matchingBooks = [];
const books = document.getElementsByClassName("overlay-text");
var bookFound = false;

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let processedInput = searchInput.value.toLowerCase().replaceAll(' ', '');
    setTimeout(CompareValues(processedInput, titles, books.length, matchingBooks), 500);
    bookFound = false;
  }
});

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  let processedInput = searchInput.value.toLowerCase().replaceAll(' ', '');
  setTimeout(CompareValues(processedInput, titles, books.length, matchingBooks), 500);
  bookFound = false;
});

//Get all book titles
if (books.length > 0) {
  for (let i = 0; i < books.length; i++) {
    titles[i] = books[i].textContent.toLowerCase().replaceAll(' ', '');
  }
}
searchInput = searchInput.value.toLowerCase().replaceAll(' ', '');

//             The searched book//all the book titles// no. of books// books that match with the search 
function CompareValues(searchedBook, bookTitle = [], bookNumber, matchingBooks = []) {
  let searchCharacter, bookCharacter, counter = 0;

  const longestElement = bookTitle.reduce((a, b) => (a.length > b.length ? a : b));

  for (let i = 0; i < longestElement.length; i++) {
    for (let j = 0; j < bookNumber; j++) {
      searchCharacter = searchedBook.charAt(i);
      bookCharacter = bookTitle[j].charAt(i);

      if (searchCharacter === bookCharacter) {//if("t" === "t"){}
        matchingBooks[counter] = bookTitle[j];
        counter++;
      }
      if (matchingBooks.length > 0 && matchingBooks[counter].charAt(i) !== searchCharacter) {
        matchingBooks.pop(matchingBooks[counter]);
      }
    }
  }
  bookFound = matchingBooks.length === 1 ? true : false;

  bookFound ? alert("Book found!") : alert("Book not found!");
}

/*const books = {
    acotar: { name: "A Court of Thorns and Roses", author: "Sarah J. Maas" },
    acomaf: { name: "A Court of Mist and Fury", author: "Sarah J. Maas" },
    acowar: { name: "A Court of Wings and Ruin", author: "Sarah J. Maas" },
};*/