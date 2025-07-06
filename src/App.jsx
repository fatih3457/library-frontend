import React from 'react';
import BookList from './BookList';

function App() {
    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>📚 Kütüphane Uygulaması</h1>
            <BookList />
        </div>
    );
}

export default App;
