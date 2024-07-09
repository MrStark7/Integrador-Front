import React from 'react';
import ServiceForm from '../components/Service/ServiceForm';
import ServiceReports from '../components/Admin/ServiceReports';

const AdminPage: React.FC = () => {
  const userId = 1; // Reemplazar con el ID del usuario autenticado

  return (
    <div>
      <h1>Admin Page</h1>
      <ServiceForm />
      <ServiceReports userId={userId} />
    </div>
  );
};

export default AdminPage;
