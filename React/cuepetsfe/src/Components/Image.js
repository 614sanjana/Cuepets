import React, { useState, useEffect } from 'react';

const Image = ({ recordID }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the health record image from the API
    const fetchImage = async () => {
      try {
        // Make a GET request to the viewImage endpoint
        const response = await fetch(`http://localhost:8080/api/v1/healthrecord/viewImage/11faa6e1-d828-4dd2-b457-8d5198214985`);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Image not found or an error occurred');
        }

        // Create a URL for the image
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the image URL in the state
        setImageUrl(imageUrl);
      } catch (err) {
        // Set the error message in the state if something goes wrong
        setError(err.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchImage();
  }, [recordID]);

  // Render the image or an error message
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {imageUrl ? (
        <img src={imageUrl} alt="Health Record" style={{ width: '100%', height: 'auto' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default Image;
