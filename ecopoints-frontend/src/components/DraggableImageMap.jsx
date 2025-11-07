// src/components/DraggableImageMap.jsx
import React, { useState, useRef, useEffect } from 'react';

// Importamos la imagen que se va a mover
import mapaImage from '../assets/images/index1.jpg';

function DraggableImageMap() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const boundsRef = useRef({ maxX: 0, maxY: 0 });

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const imgRect = imageRef.current.getBoundingClientRect();
        boundsRef.current = {
          maxX: Math.max(0, imgRect.width - containerRect.width),
          maxY: Math.max(0, imgRect.height - containerRect.height),
        };
      }
    };

    const imageElement = imageRef.current;
    if (imageElement.complete) {
        updateBounds();
    } else {
        imageElement.onload = updateBounds;
    }
    window.addEventListener('resize', updateBounds);

    return () => {
      imageElement.onload = null;
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    startPosRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handleDragMove = (clientX, clientY) => {
    if (!isDragging) return;
    const newX = clientX - startPosRef.current.x;
    const newY = clientY - startPosRef.current.y;
    setPosition({
      x: clamp(newX, -boundsRef.current.maxX, 0),
      y: clamp(newY, -boundsRef.current.maxY, 0),
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="draggable-container bg-white border border-gray-200 rounded-3xl shadow-xl w-full h-72 sm:h-96 flex items-center justify-center mb-12 overflow-hidden relative"
      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
    >
      <img
        ref={imageRef}
        src={mapaImage}
        alt="Mapa de puntos verdes"
        className="draggable-image w-full h-auto min-h-full z-0"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div className="absolute bottom-3 right-3 bg-white bg-opacity-80 rounded-full p-2 shadow-md bubble z-10">
        <p className="text-xs text-gray-600">📍 Activa tu ubicación</p>
      </div>
    </div>
  );
}

export default DraggableImageMap;