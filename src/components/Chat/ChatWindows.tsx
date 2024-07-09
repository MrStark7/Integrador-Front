import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ChatMessage from './ChatMessage';

const GET_CHAT_MESSAGES = gql`
  query GetChatMessages($senderId: Int!, $recipientId: Int!) {
    chatMessages(senderId: $senderId, recipientId: $recipientId) {
      id
      sender {
        username
      }
      content
      timestamp
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($senderId: Int!, $recipientId: Int!, $content: String!) {
    sendMessage(senderId: $senderId, recipientId: $recipientId, content: $content) {
      id
      content
      timestamp
      sender {
        username
      }
    }
  }
`;

interface ChatWindowProps {
  senderId: number;
  recipientId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ senderId, recipientId }) => {
  const { data, loading, error, refetch } = useQuery(GET_CHAT_MESSAGES, {
    variables: { senderId, recipientId },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [content, setContent] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleSendMessage = async () => {
    await sendMessage({ variables: { senderId, recipientId, content } });
    setContent('');
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        {data.chatMessages.map((message: any) => (
          <ChatMessage
            key={message.id}
            sender={message.sender.username}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
      </div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
