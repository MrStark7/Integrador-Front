import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_AVAILABLE_TIMES = gql`
  query GetAvailableTimes($serviceId: Int!, $date: String!) {
    availableTimes(serviceId: $serviceId, date: $date)
  }
`;

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($date: String!, $userId: Int!, $serviceId: Int!) {
    createAppointment(date: $date, userId: $userId, serviceId: $serviceId) {
      id
      date
    }
  }
`;

const AppointmentForm: React.FC<{ serviceId: number }> = ({ serviceId }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const userId = 1; // Reemplazar con el ID del usuario autenticado
  const { loading, error, data, refetch } = useQuery(GET_AVAILABLE_TIMES, {
    variables: { serviceId, date },
    skip: !date,
  });

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createAppointment({
        variables: {
          date: `${date}T${time}:00`,
          userId,
          serviceId,
        },
      });
      setDate('');
      setTime('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Time:
        <select value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="">Select time</option>
          {data?.availableTimes.map((availableTime: string) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
