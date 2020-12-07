import React, { useState, useContext, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Context } from "./Proivder";


 function ChatMessages() {    
    const { name } = useContext(Context);
    const [messages, setMessages] = useState([]);
    const getMessagesAPI = process.env.REACT_APP_CHAT_MESSAGES_API;   
    const apiKey = process.env.REACT_APP_MESSAGE_API_KEY;
		const clientId = process.env.REACT_APP_MESSAGE_API_CLIENT_ID;
		const clientSecret = process.env.REACT_APP_MESSAGE_API_CLIENT_SECRET;

    async function getMessages() {
      const response = await fetch(getMessagesAPI,
        {
          method: 'GET',
          headers: new Headers({
            'x-api-key': apiKey,
            'client-id': clientId,
            'client-secret': clientSecret,

          }),
        });
      const parsedResponse = await response.json();
      setMessages(parsedResponse.data || []);
    }  

  useEffect(() => {
    getMessages();
    const pollMessagesInterval = setInterval(getMessages, 1000);
    return () => {
      clearInterval(pollMessagesInterval);
    }
  });  
    
  return <ChatMessage name={name} messages={messages} />
}

export default ChatMessages;








