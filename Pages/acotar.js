document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.comment-input');
    const savedComment = document.getElementById('savedComment');
    const form = document.querySelector('.personal-comment');
    const bookTitle = document.querySelector('.book-title');
    //savedComment.textContent = 'Personal Comment on the Book "' + bookTitle.textContent + '"';
    // Load saved comment from localStorage
    if(localStorage.getItem('acotarComment')) {
        savedComment.textContent = localStorage.getItem('acotarComment');
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        savedComment.textContent += textarea.value;
        localStorage.setItem('acotarComment', textarea.value);
        textarea.value = '';
    });

    form.addEventListener('reset', function() {
        savedComment.textContent = '';
        localStorage.removeItem('acotarComment');
    });
});
