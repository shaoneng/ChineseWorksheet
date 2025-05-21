import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Flashcard from './Flashcard'; // Added Flashcard import
import reportWebVitals from './reportWebVitals';
// Removed App and ChineseWorksheet imports as they are no longer used

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Flashcard /> {/* Changed to render Flashcard */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
