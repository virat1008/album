import React, { useState, useEffect } from 'react';
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/albums';

function App() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ title: '' });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const addAlbum = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(newAlbum),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add album');
      }
      const data = await response.json();
      setAlbums([...albums, data]);
      setNewAlbum({ title: '' });
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  const updateAlbum = async (album) => {
    try {
      const response = await fetch(`${API_URL}/${album.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...album, title: 'Updated Title' }), // Replace 'Updated Title' with your new title
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to update album');
      }
      
      // Find the index of the updated album in the array
      const updatedAlbumIndex = albums.findIndex((a) => a.id === album.id);
  
      // Create a copy of the albums array with the updated album
      const updatedAlbums = [...albums];
      updatedAlbums[updatedAlbumIndex] = { ...album, title: 'Updated Title' }; // Replace 'Updated Title' with your new title
  
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };
  

  const deleteAlbum = async (album) => {
    try {
      const response = await fetch(`${API_URL}/${album.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete album');
      }
      setAlbums(albums.filter((a) => a.id !== album.id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div className="App">
      <h1>Album Manager</h1>
      <div>
        <h2>Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.title}
              <button onClick={() => updateAlbum(album)}>Update</button>
              <button onClick={() => deleteAlbum(album)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Album</h2>
        <input
          type="text"
          placeholder="Album title"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ title: e.target.value })}
        />
        <button onClick={addAlbum}>Add</button>
      </div>
    </div>
  );
}

export default App;
