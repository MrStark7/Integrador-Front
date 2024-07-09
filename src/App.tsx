import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';
import ServiceDetailsPage from './pages/ServicesDetailPage';
import { ApolloProvider } from '@apollo/client';
import client from './services/api';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/service/:id" element={<ServiceDetailsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
