import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const SEARCH_SERVICES = gql`
  query SearchServices($name: String, $category: String) {
    searchServices(name: $name, category: $category) {
      id
      name
      description
    }
  }
`;

const ServiceSearch: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const { loading, error, data, refetch } = useQuery(SEARCH_SERVICES, {
    variables: { name, category },
    skip: true,
  });

  const handleSearch = () => {
    refetch({ name, category });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by name"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Search by category"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {data?.searchServices.map((service: any) => (
          <div key={service.id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSearch;
