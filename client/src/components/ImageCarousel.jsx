import { useState } from 'react';

export default function ImageCarousel({ images, width, height }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  function goNext() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  function goPrev() {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div className="carousel">
      <img src={images[current]} alt={`photo ${current + 1}`} width={width} height={height} style={{ objectFit: 'cover' }} />
      {images.length > 1 && (
        <div className="carousel-controls">
          <button onClick={goPrev}>‹</button>
          <span>{current + 1} / {images.length}</span>
          <button onClick={goNext}>›</button>
        </div>
      )}
    </div>
  );
}