// App.js

import React, { useState, useEffect } from 'react';
// import './App.css';
import './Message.css'
function Message() {
   const [messages, setMessages] = useState([]);
   const [currentMessage, setCurrentMessage] = useState('');

   const fetchMessages = async () => {
      try {
         const response = await fetch('https://im-be.vercel.app/api/v1/res'); // Update with your server's URL
         const data = await response.json();
         console.log(data.data)
         setMessages(data.data);
         setCurrentMessage(data.currentMessage);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   useEffect(() => {
      fetchMessages(); // Fetch messages when component mounts

      // Set up interval to fetch messages every minute
      const intervalId = setInterval(fetchMessages, 10000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
   }, []);

   return (
      <div className='container-full'>
      <div className="message-container">
      <div className="current-message">
      
        <p>Papa I ❤️ 👉</p>
      </div>
      <div className="message-list">
        <h2>U are My World🌏</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="message-item">{msg}</li>
          ))}
        </ul>
      </div>
    </div>
    
    </div>

   );
}

export default Message;
