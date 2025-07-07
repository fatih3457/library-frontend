import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBookForm from './AddBookForm';
import { toast } from 'react-toastify';

function BookList() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTitle, setSearchTitle] = useState('');
    const [editingBook, setEditingBook] = useState(null); // Güncelleme modu için

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
            toast.error('Kitaplar alınamadı');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page, searchTitle]);

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
        setPage(0); // Arama yapınca sayfayı sıfırla
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/books/${id}`);
            toast.success('Kitap silindi');
            fetchBooks();
        } catch (error) {
            toast.error('Kitap silinirken hata oluştu');
        }
    };

    const handleEdit = (book) => {
        setEditingBook(book);
    };

    const handleFormSubmit = () => {
        setEditingBook(null);
        fetchBooks();
    };

    return (
        <div>
            <AddBookForm onBookAdded={handleFormSubmit} editingBook={editingBook} />

            <input
                type="text"
                placeholder="Kitap adına göre ara..."
                value={searchTitle}
                onChange={handleSearchChange}
                style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
            />

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {books.map((book) => (
                    <li key={book.id} style={{
                        border: '1px solid #ccc',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <strong>{book.title}</strong> - {book.author} ({book.publishedYear}) [{book.category}]
                        <div style={{ marginTop: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(book)}
                                style={{
                                    marginRight: '0.5rem',
                                    padding: '0.3rem 0.8rem',
                                    backgroundColor: '#f1c40f',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}
                            >
                                Düzenle
                            </button>
                            <button
                                onClick={() => handleDelete(book.id)}
                                style={{
                                    padding: '0.3rem 0.8rem',
                                    backgroundColor: '#e74c3c',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: 'white'
                                }}
                            >
                                Sil
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '1rem' }}>
                <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>⬅️ Önceki</button>
                <span style={{ margin: '0 1rem' }}>Sayfa {page + 1} / {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page + 1 >= totalPages}>Sonraki ➡️</button>
            </div>
        </div>
    );
}

export default BookList;