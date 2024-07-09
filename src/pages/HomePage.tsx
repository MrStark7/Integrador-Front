import React from 'react';
import ServiceList from '../components/Service/ServiceList';
import ServiceSearch from '../components/Service/ServiceSearch';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Service App</h1>
      <ServiceSearch />
      <ServiceList />
    </div>
  );
};

export default HomePage;
