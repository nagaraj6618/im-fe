import React, { useState, useEffect } from 'react';
import './Message.css';
import axios from 'axios';

function Message() {
   const [messages, setMessages] = useState([]);
   const [buttonName, setButtonName] = useState('Start');
   const [intervalId, setIntervalId] = useState(null);

   const fetchMessages = async () => {
      try {
         const response = await fetch('https://im-be.vercel.app/api/v1/res'); // Update with your server's URL
         const data = await response.json();
         console.log(data.data);
         setMessages(data.data || []);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   const startHandler = async () => {
      let status = "";
      if (buttonName === "Start") {
         status = "start";
         setButtonName("Please Accept My Apology to stop");

         // Start fetching messages every 4 seconds
         const id = setInterval(fetchMessages, 4000);
         setIntervalId(id);
      } else {
         // Confirm before stopping
         const confirmStop = window.confirm("Are u accepting my appologize.");
         if (confirmStop) {
            status = "stop";
            setButtonName("Start");

            // Stop fetching messages
            if (intervalId) {
               clearInterval(intervalId);
               setIntervalId(null);
            }
            setMessages([]);
         } else {
            // If the user cancels, no need to change the button state or stop the interval
            return;
         }
      }

      try {
         const response = await axios.post('https://im-be.vercel.app/api/v1/res', { status });
         console.log(response.data);
      } catch (error) {
         console.error('Error sending status:', error);
      }
   };

   useEffect(() => {
      // Cleanup interval on component unmount
      return () => {
         if (intervalId) {
            clearInterval(intervalId);
         }
      };
   }, [intervalId]);

   return (
      <div className='container-full'>
         <div className="message-container">
            <div className="current-message">
               <p>Papa I ❤️ 👉</p>
            </div>
            <div className="message-list">
               <h2>You are My World🌏</h2>
               <button onClick={startHandler}>{buttonName}</button>
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
