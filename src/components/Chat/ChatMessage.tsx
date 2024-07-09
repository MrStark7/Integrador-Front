import React from 'react';

interface ChatMessageProps {
  sender: string;
  content: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, content, timestamp }) => {
  return (
    <div>
      <strong>{sender}</strong>: {content} <small>{timestamp}</small>
    </div>
  );
};

export default ChatMessage;
