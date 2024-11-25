import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetHealthRecords = ({ petId }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch health records when the component mounts
    const fetchHealthRecords = async () => {
      try {
        setLoading(true);
        const petId=819798;
        const response = await axios.get(`http://localhost:8080/api/v1/healthrecord/getRecords/${petId}`);
        setHealthRecords(response.data);
      } catch (err) {
        setError("Failed to fetch health records.");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthRecords();
  }, [petId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading health records...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Health Records for Pet ID: {petId}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-6 text-left">Record Date</th>
              <th className="py-3 px-6 text-left">Clinic ID</th>
              <th className="py-3 px-6 text-left">Report Images</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.length > 0 ? (
              healthRecords.map((record) => (
                <tr key={record.recordID} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{new Date(record.recordDateAndTime).toLocaleDateString()}</td>
                  <td className="py-3 px-6">{record.clinicID}</td>
                  <td className="py-3 px-6">
                    <ul>
                      {record.reportImage.map((image, index) => (
                        <li key={index}>
                          <a
                            href={`http://localhost:8080/assets/${image}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {image}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-3 px-6 text-gray-500">
                  No health records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetHealthRecords;
