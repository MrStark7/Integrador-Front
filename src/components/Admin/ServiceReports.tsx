import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_SERVICE_REPORTS = gql`
  query GetServiceReports($userId: Int!) {
    serviceReports(userId: $userId) {
      service {
        id
        name
      }
      totalSales
      monthlySales {
        month
        sales
      }
      topServices {
        id
        name
        request_count
      }
    }
  }
`;

const ServiceReports: React.FC<{ userId: number }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_SERVICE_REPORTS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.serviceReports.map((report: any) => (
        <div key={report.service.id}>
          <h2>{report.service.name}</h2>
          <p>Total Sales: {report.totalSales}</p>
          <h3>Monthly Sales</h3>
          <ul>
            {report.monthlySales.map((month: any) => (
              <li key={month.month}>{month.month}: {month.sales}</li>
            ))}
          </ul>
          <h3>Top Services</h3>
          <ul>
            {report.topServices.map((service: any) => (
              <li key={service.id}>{service.name} ({service.request_count} requests)</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ServiceReports;
