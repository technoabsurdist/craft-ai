import React, { useState, useEffect } from "react";
import styles from './PromptInput.module.css';

export const PromptInput = ({ prompt }) => {
  const [value, setValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const deselectImage = () => {
    setSelectedImage(null);
  };

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
          setImageData([...imageData, { url: response.image_url, prompt: value }]);
          setLoading(false);
          setValue('');
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
      <div className={styles.imageGrid}>
        {selectedImage ? (
          <div className={styles.selectedImageWrapper}>
            <img src={selectedImage.url} alt="Selected" className={styles.selectedImage} />
            <button className={styles.button} onClick={deselectImage}>Back</button>
          </div>
        ) : (
          imageData.map((data, index) => (
            <div className={styles.hoverEffect} onClick={() => setSelectedImage(data)} key={index}>
              <img src={data.url} alt={`Generated ${index}`} className={styles.generatedImage} />
              <div className={styles.hoverText}>{data.prompt}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
