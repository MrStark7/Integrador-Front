import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceDetails from '../components/Service/ServiceDetails';
import AppointmentForm from '../components/Appointment/AppointmentForm';

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <ServiceDetails serviceId={parseInt(id)} />
      <AppointmentForm serviceId={parseInt(id)} />
    </div>
  );
};

export default ServiceDetailsPage;
