import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USER_SERVICES = gql`
  query GetUserServices($userId: Int!) {
    user(id: $userId) {
      services {
        id
        name
        description
      }
    }
  }
`;

const CREATE_SERVICE = gql`
  mutation CreateService($name: String!, $category: String!, $description: String!, $contact: String!, $userId: Int!) {
    createService(name: $name, category: $category, description: $description, contact: $contact, userId: $userId) {
      id
      name
    }
  }
`;

const AdminServiceManagement: React.FC = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_USER_SERVICES, {
    variables: { userId: user.id }
  });
  const [createService] = useMutation(CREATE_SERVICE);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createService({
        variables: {
          name,
          category,
          description,
          contact,
          userId: user.id
        },
        refetchQueries: [{ query: GET_USER_SERVICES, variables: { userId: user.id } }]
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Your Services</h1>
      {data.user.services.map((service: any) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
        </div>
      ))}
      <h2>Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Service Name"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact"
        />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AdminServiceManagement;
