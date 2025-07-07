import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddBookForm({ onBookAdded, editingBook }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        publishedYear: ''
    });

    // Eğer bir kitap düzenleniyorsa formu doldur
    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                category: editingBook.category,
                publishedYear: editingBook.publishedYear
            });
        } else {
            setFormData({
                title: '',
                author: '',
                category: '',
                publishedYear: ''
            });
        }
    }, [editingBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBook) {
                // Güncelleme işlemi
                await axios.put(`http://localhost:8081/api/books/${editingBook.id}`, {
                    ...formData,
                    publishedYear: parseInt(formData.publishedYear)
                });
                toast.success('Kitap güncellendi!');
            } else {
                // Yeni kitap ekleme
                await axios.post('http://localhost:8081/api/books', {
                    ...formData,
                    publishedYear: parseInt(formData.publishedYear)
                });
                toast.success('Kitap eklendi!');
            }

            setFormData({
                title: '',
                author: '',
                category: '',
                publishedYear: ''
            });
            onBookAdded(); // Listeyi yenile
        } catch (error) {
            console.error('İşlem sırasında hata:', error);
            toast.error('Bir hata oluştu!');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <input
                type="text"
                name="title"
                placeholder="Başlık"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <input
                type="text"
                name="author"
                placeholder="Yazar"
                value={formData.author}
                onChange={handleChange}
                required
                style={{ marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <input
                type="text"
                name="category"
                placeholder="Kategori"
                value={formData.category}
                onChange={handleChange}
                style={{ marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <input
                type="number"
                name="publishedYear"
                placeholder="Yayın Yılı"
                value={formData.publishedYear}
                onChange={handleChange}
                style={{ marginRight: '0.5rem', padding: '0.5rem', width: '100px' }}
            />
            <button
                type="submit"
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: editingBook ? '#f39c12' : '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                {editingBook ? 'Güncelle' : 'Kitap Ekle'}
            </button>
        </form>
    );
}

export default AddBookForm;