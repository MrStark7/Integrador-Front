import React from 'react';
import ChatWindow from '../components/Chat/ChatWindows';

const ChatPage: React.FC = () => {
  // Replace these IDs with the actual sender and recipient IDs
  const senderId = 1; 
  const recipientId = 2; 

  return (
    <div>
      <h1>Chat</h1>
      <ChatWindow senderId={senderId} recipientId={recipientId} />
    </div>
  );
};

export default ChatPage;
