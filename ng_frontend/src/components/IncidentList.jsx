import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await axios.get('/api/incidents');
                console.log('API Response:', response.data); // Debugging log
                if (Array.isArray(response.data)) {
                    setIncidents(response.data); // Use data directly
                } else {
                    setIncidents([]); // Fallback
                }
            } catch (error) {
                console.error('Error fetching incidents:', error.message);
                setError('Failed to fetch incidents. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f9f9f9',
                width: '100vw',
                padding: '1rem',
            }}
        >
            <div
                style={{
                    width: '90%',
                    maxWidth: '1200px',
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', color: '#E36120', marginBottom: '1.5rem' }}>
                    Incident List
                </h2>
                {loading ? (
                    <p style={{ textAlign: 'center', color: '#999' }}>Loading incidents...</p>
                ) : error ? (
                    <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                ) : incidents.length > 0 ? (
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            textAlign: 'left',
                            fontSize: '16px',
                            color: '#333',
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>ID</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Title</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Description</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Priority</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Status</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidents.map((incident) => (
                                <tr key={incident.id}>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{incident.id}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{incident.title}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{incident.description}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{incident.priority || 'N/A'}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{incident.status || 'N/A'}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                        {new Date(incident.created_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ textAlign: 'center', color: '#999' }}>No incidents to display.</p>
                )}
            </div>
        </div>
    );
};

export default IncidentList;
