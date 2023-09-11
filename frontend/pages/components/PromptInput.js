import React, { useState, useEffect } from "react";
import styles from './PromptInput.module.css';

export const PromptInput = ({ prompt }) => {
    const [value, setValue] = useState('');
    const [imageURLs, setImageURLs] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
  
    const handleSubmit = async (e) => {
      if (e.key === 'Enter') {
        setLoading(true);
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'User-Agent': 'ImageEditor/1.0' },
          body: JSON.stringify({ prompt: value }),
        };
  
        fetch('http://localhost:5001/generate_image', options)
          .then((response) => response.json())
          .then((response) => {
            setImageURLs([...imageURLs, response.image_url]);
            setLoading(false);
            setShowToast(true);
            setValue(''); // Reset the input value
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }
    };

    // Hide toast after 3 seconds
    useEffect(() => {
      if (showToast) {
        const timer = setTimeout(() => setShowToast(false), 3000);
        return () => clearTimeout(timer);
      }
    }, [showToast]);
  
    const selectImage = (url) => {
      setSelectedImage(url);
    };
  
    return (
      <div className={styles.inputWrapper}>
        <input
          className={styles.titleColorBorder}
          value={value}
          placeholder={selectedImage ? 'Edit this image' : prompt}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleSubmit}
        />
        {loading && <div className={styles.loading}>Generating image...</div>}
        {showToast && <div className={styles.toast}>Image generated!</div>}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected for editing"
            className={styles.selectedImage}
          />
        ) : (
          <div className={styles.imageGrid}>
            {imageURLs.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Generated ${index}`}
                className={styles.generatedImage}
                onClick={() => selectImage(url)}
              />
            ))}
          </div>
        )}
      </div>
    );
};



