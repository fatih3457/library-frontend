import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBookForm from './AddBookForm';

function BookList() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTitle, setSearchTitle] = useState('');

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/books', {
                params: {
                    page,
                    size: 5,
                    title: searchTitle
                }
            });
            setBooks(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Kitaplar alınamadı:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page, searchTitle]);

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
        setPage(0); // Arama yaparken sayfayı sıfırla
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (page > 0) setPage(prev => prev - 1);
    };

    return (
        <div>
            <AddBookForm onBookAdded={fetchBooks} />

            <input
                type="text"
                placeholder="Kitap adına göre ara..."
                value={searchTitle}
                onChange={handleSearchChange}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />

            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> - {book.author} ({book.publishedYear}) [{book.category}]
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
                <button onClick={handlePrev} disabled={page === 0}>⬅️ Önceki</button>
                <span style={{ margin: '0 1rem' }}>Sayfa {page + 1} / {totalPages}</span>
                <button onClick={handleNext} disabled={page + 1 >= totalPages}>Sonraki ➡️</button>
            </div>
        </div>
    );
}

export default BookList;