import React from 'react';
import { gql, useQuery } from '@apollo/client';
import .ReviewForm from '../Review/ReviewForm';

const GET_SERVICE = gql`
  query GetService($id: Int!) {
    service(id: $id) {
      id
      name
      category
      description
      contact
      reviews {
        id
        rating
        comment
        user {
          username
        }
      }
    }
  }
`;

interface ServiceDetailsProps {
  serviceId: number;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ serviceId }) => {
  const { loading, error, data } = useQuery(GET_SERVICE, {
    variables: { id: serviceId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const service = data.service;

  return (
    <div>
      <h1>{service.name}</h1>
      <p>Category: {service.category}</p>
      <p>Description: {service.description}</p>
      <p>Contact: {service.contact}</p>
      <h3>Reviews</h3>
      {service.reviews.map((review: any) => (
        <div key={review.id}>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
          <p>By: {review.user.username}</p>
        </div>
      ))}
      <ReviewForm serviceId={service.id} />
    </div>
  );
};

export default ServiceDetails;
