/** @type {HTMLInputElement} */

const searchButton = document.getElementById("s-button");
const searchInput = document.querySelector('input[type="text"]');
const books = document.getElementsByClassName("overlay-text");
const titles = [];

for (let i = 0; i < books.length; i++) {
  titles[i] = books[i].textContent.toLowerCase().replaceAll(' ', '');
}

function showOnlyMatchedBook(searchedBook, bookTitles) {
  const booksArr = document.getElementsByClassName("book");
  let found = false;
  for (let i = 0; i < bookTitles.length; i++) {
    if (bookTitles[i] === searchedBook) {
      booksArr[i].style.display = "flex";
      booksArr[i].style.margin = "auto";
      found = true;
    } else {
      booksArr[i].style.display = "none";
    }
  }
  if (!found) {
    alert("Book not found!");
    // Optionally, show all books again if not found:
    for (let i = 0; i < booksArr.length; i++) {
      booksArr[i].style.display = "flex";
      booksArr[i].style.margin = "";
    }
  }
}

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let processedInput = searchInput.value.toLowerCase().replaceAll(' ', '');
    showOnlyMatchedBook(processedInput, titles);
  }
});

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  let processedInput = searchInput.value.toLowerCase().replaceAll(' ', '');
  showOnlyMatchedBook(processedInput, titles);
});