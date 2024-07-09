import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      name
      description
    }
  }
`;

const ServiceList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_SERVICES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.services.map((service: any) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
          <Link to={`/service/${service.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
