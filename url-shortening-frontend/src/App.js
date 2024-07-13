import React, { useState, useEffect } from 'react';
import URLForm from './components/URLForm';
import './App.css';
import axios from 'axios';
import Footer from './components/Footer'; 
import favicon from './favicon.ico'; 

function App() {
  const [, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('http://localhost:8001/url'); 
      const formattedUrls = response.data.map(url => ({
        originalUrl: url.redirectURL,
        shortUrl: `http://localhost:8001/${url.shortId}`,
      }));
      setUrls(formattedUrls);
    } catch (error) {
      console.error('Error fetching URLs', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const addUrl = (newUrl) => {
    setUrls(prevUrls => [...prevUrls, newUrl]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={favicon} className="App-logo" alt="logo" />
        <h1>URL Shortener</h1>
      </header>
      <URLForm addUrl={addUrl} />
      <Footer />
    </div>
  );
}

export default App;
