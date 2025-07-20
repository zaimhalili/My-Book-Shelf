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

div.onclick = function () {
  searchInput.value = match;
  searchSuggestions.classList.remove("active");
  const link = getBookLink(match);
  if (link) {
    window.location.href = link;
    return;
  }

  // If not found in mapping, just show/hide books as before
  for (let j = 0; j < books.length; j++) {
    const bookDiv = books[j].closest('.book');
    if (books[j].textContent === match) {
      if (bookDiv) {
        bookDiv.style.display = "flex";
        bookDiv.style.margin = "auto";
      }
    } else {
      if (bookDiv) {
        bookDiv.style.display = "none";
      }
    }
  }
};

// When pressing Enter, redirect if the book exists
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const value = searchInput.value.trim();
    const link = getBookLink(value);
    if (link) {
      window.location.href = link;
    }
  }
});

// Map book titles to their HTML filenames
const bookLinks = {
  "A Court of Thorns and Roses": "indexACOTAR.html",
  "A Court of Mist and Fury": "indexACOMAF.html",
  "A Court of Wings and Ruin": "indexACOWAR.html",
  "The Name of the Wind": "tnotw.html",
  "The Wise Man's Fear": "twmf.html",
  "The Way of Kings": "twok.html"
};

// Helper to get the correct path from any location
function getBookLink(title) {
  const filename = bookLinks[title];
  if (!filename) return null;
  // If already in Pages, just use filename
  if (window.location.pathname.includes('/Pages/')) {
    return filename;
  } else {
    // From root, go into Pages/
    return "Pages/" + filename;
  }
}