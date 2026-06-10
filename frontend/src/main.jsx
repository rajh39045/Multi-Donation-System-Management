import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import gsap from 'gsap';

// Initialize GSAP Cursor Effect
const initCursor = () => {
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    });
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cursor-active'));
};

if (window.innerWidth >= 1024) {
  initCursor();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
