import React from 'react';
import './App.css';
import Message from './Message';

function App() {
  const hearts = Array.from({ length: 9 }).map((_, index) => (
    <div className="heart" key={index}></div>
  ));

  return (
    <div>
    <div className="container">
      <div className="message">
        <h1>💖 You are the light of my life 💖</h1>
        <p>🌟 Every moment with you is a treasure 🌟</p>
      </div>
      <div className="heart-container">
        {hearts}
      </div>
      <Message />
    </div>
    {/* <Message/> */}
    </div>
  );
}

export default App;
