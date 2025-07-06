import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm({ onBookAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        publishedYear: ''
    });

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
            await axios.post('http://localhost:8081/api/books', {
                ...formData,
                publishedYear: parseInt(formData.publishedYear)
            });
            setFormData({
                title: '',
                author: '',
                category: '',
                publishedYear: ''
            });
            onBookAdded(); // Listeyi güncelle
        } catch (error) {
            console.error('Kitap eklenirken hata oluştu:', error);
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
            />
            <input
                type="text"
                name="author"
                placeholder="Yazar"
                value={formData.author}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="category"
                placeholder="Kategori"
                value={formData.category}
                onChange={handleChange}
            />
            <input
                type="number"
                name="publishedYear"
                placeholder="Yayın Yılı"
                value={formData.publishedYear}
                onChange={handleChange}
            />
            <button type="submit">Kitap Ekle</button>
        </form>
    );
}

export default AddBookForm;