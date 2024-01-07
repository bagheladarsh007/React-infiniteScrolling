import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?query=${searchTerm}&page=${page}&client_id=9kpim9H0g16FNM63x0uIeVQaia3P1lWhGr8Vc7181ak`
      );
      setImages((prevImages) => [...prevImages, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]); // Fetch data when the search term changes

  return (
    <div>
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchData}
        hasMore={true} // Set to true if there are more images to load, otherwise false
        loader={<h4>Loading...</h4>}
      >
        <div className="image-container">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.regular}
              alt={image.alt_description}
              style={{ width: '300px', height: '400px', objectFit: 'cover', border:'2px solid white' }}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ImageGallery;
