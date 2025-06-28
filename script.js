const searchInput = document.getElementById("search-input");
const searchSuggestions = document.getElementById("search-suggestions");
const books = document.getElementsByClassName("overlay-text");
const titles = [];

for (let i = 0; i < books.length; i++) {
    titles[i] = books[i].textContent;
}

searchInput.addEventListener("input", function () {
    const value = searchInput.value.toLowerCase().replaceAll(' ', '');
    searchSuggestions.innerHTML = "";
    if (value === "") {
        searchSuggestions.classList.remove("active");
        return;
    }
    let matches = titles.filter(title =>
        title.toLowerCase().replaceAll(' ', '').includes(value)
    );
    if (matches.length > 0) {
        matches.forEach(match => {
            const div = document.createElement("div");
            div.textContent = match;
            div.onclick = function () {
                searchInput.value = match;
                searchSuggestions.classList.remove("active");

                // Hide all books except the one that matches
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
            searchSuggestions.appendChild(div);
        });
        searchSuggestions.classList.add("active");
    } else {
        searchSuggestions.classList.remove("active");
    }
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
    if (!searchSuggestions.contains(e.target) && e.target !== searchInput) {
        searchSuggestions.classList.remove("active");
    }
});

// Add Book Modal Logic
const addBookBtn = document.querySelector('.addBook');
const addBookModal = document.getElementById('addBookModal');
const closeModal = document.getElementById('closeModal');
const addBookForm = document.getElementById('addBookForm');
const shelf = document.querySelector('.shelf');

addBookBtn.parentElement.addEventListener('click', function (e) {
    e.preventDefault();
    addBookModal.style.display = 'flex';
});

closeModal.onclick = function () {
    addBookModal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === addBookModal) {
        addBookModal.style.display = 'none';
    }
};

addBookForm.onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('bookName').value.trim();
    const imageInput = document.getElementById('bookImage');
    const file = imageInput.files[0];
    if (!name || !file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
        // Create new book div
        const bookDiv = createBookElement(name, evt.target.result);
        // Insert before the last "Add Book" button
        shelf.insertBefore(bookDiv, shelf.lastElementChild);

        // Update search titles
        titles.push(name);

        // Reset and close modal
        addBookForm.reset();
        addBookModal.style.display = 'none';
    };
    reader.readAsDataURL(file);
};

function createBookElement(name, imgSrc) {
    const bookDiv = document.createElement('a');
    bookDiv.href = "";
    bookDiv.style.textDecoration = "none";
    bookDiv.style.color = "inherit";
    bookDiv.innerHTML = `
        <div class="book">
            <button class="delete-book" title="Delete Book" style="position:absolute;top:8px;right:8px;z-index:2;">&times;</button>
            <img class="imagePos" src="${imgSrc}" alt="${name}">
            <p class="overlay-text">${name}</p>
        </div>
    `;
    // Delete logic
    bookDiv.querySelector('.delete-book').onclick = function (e) {
        e.preventDefault();
        if (confirm("Delete this book?")) {
            bookDiv.remove();
            removeBookFromStorage(name);
        }
    };
    return bookDiv;
}

function saveBooksToStorage() {
    const books = [];
    document.querySelectorAll('.shelf .book').forEach(book => {
        const name = book.querySelector('.overlay-text').textContent;
        const img = book.querySelector('img').src;
        if (name !== "+") { // skip the addBook button
            books.push({ name, img });
        }
    });
    localStorage.setItem('bookshelf', JSON.stringify(books));
}

function loadBooksFromStorage() {
    const books = JSON.parse(localStorage.getItem('bookshelf') || "[]");
    const shelf = document.querySelector('.shelf');
    // Remove all books except the addBook button
    shelf.querySelectorAll('a').forEach(a => {
        if (!a.querySelector('.addBook')) a.remove();
    });
    books.forEach(book => {
        const bookDiv = createBookElement(book.name, book.img);
        shelf.insertBefore(bookDiv, shelf.lastElementChild);
    });
}
function removeBookFromStorage(name) {
    let books = JSON.parse(localStorage.getItem('bookshelf') || "[]");
    books = books.filter(book => book.name !== name);
    localStorage.setItem('bookshelf', JSON.stringify(books));
}