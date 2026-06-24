'use client';

import { useState } from 'react';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ imageUrls, name }: { imageUrls: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(imageUrls[0] || '');

  if (imageUrls.length === 0) {
    return (
      <div className={styles.mainImageContainer}>
        <div className={styles.fallbackContainer}>
          <span>No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.mainImageContainer}>
        <img
          alt={name}
          className={styles.mainImage}
          src={activeImage}
        />
      </div>
      {imageUrls.length > 1 && (
        <div className={styles.thumbnailsGrid}>
          {imageUrls.map((url, idx) => (
            <div
              key={idx}
              className={`${styles.thumbnailContainer} ${activeImage === url ? styles.activeThumbnail : ''}`}
              onClick={() => setActiveImage(url)}
            >
              <img
                alt={`Detail ${idx + 1}`}
                className={styles.thumbnail}
                src={url}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
