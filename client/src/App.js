import React, { useState, useEffect } from 'react';
import URLForm from './components/URLForm';
import './App.css';
import axios from 'axios';
import Footer from './components/Footer'; 
import favicon from './favicon.ico'; 
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/url`); 
      const formattedUrls = response.data.map(url => ({
        originalUrl: url.redirectURL,
        shortUrl: `${API_BASE_URL}/${url.shortId}`,
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
