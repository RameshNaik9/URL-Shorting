import React from 'react';

function URLList({ urls, onRefresh }) {
  return (
    <div className="url-list">
      <h2>
        Shortened URLs 
        <button onClick={onRefresh} style={{ marginLeft: '20px' }}>
          Refresh
        </button>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.slice().reverse().map((url, index) => (
            <tr key={index}>
              {/* <td>{url.originalUrl}</td> */}
              <td>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                  {url.originalUrl}
                </a>
              </td>
              <td>
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                  {url.shortUrl}
                </a>
              </td>
              {/* <td>{url.shortUrl}</td> */}
              <td>
                <a className="buttona" href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                  Go to Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default URLList;
