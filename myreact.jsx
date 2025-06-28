import React, { useState } from "react";

export default function MyReact() {
    const [name, setName] = useState("");
    const [favoriteBook, setFavoriteBook] = useState("");
    const [books, setBooks] = useState([
        "A Court of Thorns and Roses",
        "The Name of the Wind",
        "The Way of Kings",
        "The Wise Man's Fear"
    ]);

    return (
        <div style={{ margin: "32px auto", maxWidth: 400, padding: 24, background: "#f7f7f7", borderRadius: 12 }}>
            <h2>React Demo Component</h2>
            <div style={{ marginBottom: 16 }}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ marginRight: 8, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                />
                {name && <span>Hello, {name}!</span>}
            </div>
            <div style={{ marginBottom: 16 }}>
                <select
                    value={favoriteBook}
                    onChange={e => setFavoriteBook(e.target.value)}
                    style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                >
                    <option value="">Select your favorite book</option>
                    {books.map(book => (
                        <option key={book} value={book}>{book}</option>
                    ))}
                </select>
            </div>
            {favoriteBook && (
                <div style={{ marginTop: 12, color: "#333" }}>
                    Your favorite book is: <b>{favoriteBook}</b>
                </div>
            )}
        </div>
    );
}