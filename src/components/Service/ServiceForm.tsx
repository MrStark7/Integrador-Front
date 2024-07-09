import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const GET_SERVICE = gql`
  query GetService($id: Int!) {
    service(id: $id) {
      id
      name
      category
      description
      contact
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

const UPDATE_SERVICE = gql`
  mutation UpdateService($id: Int!, $name: String, $category: String, $description: String, $contact: String) {
    updateService(id: $id, name: $name, category: $category, description: $description, contact: $contact) {
      id
      name
    }
  }
`;

const DELETE_SERVICE = gql`
  mutation DeleteService($id: Int!) {
    deleteService(id: $id)
  }
`;

const ServiceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const userId = 1; // Reemplazar con el ID del usuario autenticado
  const isEdit = Boolean(id);

  const { data: serviceData } = useQuery(GET_SERVICE, {
    variables: { id: id ? parseInt(id) : 0 },
    skip: !isEdit,
  });

  const [createService] = useMutation(CREATE_SERVICE);
  const [updateService] = useMutation(UPDATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);

  useEffect(() => {
    if (isEdit && serviceData) {
      const { name, category, description, contact } = serviceData.service;
      setName(name);
      setCategory(category);
      setDescription(description);
      setContact(contact);
    }
  }, [isEdit, serviceData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isEdit) {
        await updateService({
          variables: {
            id: id ? parseInt(id) : 0,
            name,
            category,
            description,
            contact,
          },
        });
      } else {
        await createService({
          variables: {
            name,
            category,
            description,
            contact,
            userId,
          },
        });
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService({ variables: { id: id ? parseInt(id) : 0 } });
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Service Name"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Contact"
        required
      />
      <button type="submit">{isEdit ? 'Update Service' : 'Create Service'}</button>
      {isEdit && <button type="button" onClick={handleDelete}>Delete Service</button>}
    </form>
  );
};

export default ServiceForm;
