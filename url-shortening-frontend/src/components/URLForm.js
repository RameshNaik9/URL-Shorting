import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URLList from './URLList'; // Import your URLList component

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function URLForm() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/url`);
      const formattedUrls = response.data.map(url => ({
        originalUrl: url.redirectURL,
        shortUrl: `${API_BASE_URL}/${url.shortId}`
      }));
      setUrls(formattedUrls);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleRefresh = () => {
    fetchUrls();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/url`, { url });
      setUrls((prevUrls) => [...prevUrls, response.data]);
      setUrl('');
    } catch (error) {
      console.error('Error creating short URL', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      <URLList urls={urls} onRefresh={handleRefresh} />
    </div>
  );
}

export default URLForm;
