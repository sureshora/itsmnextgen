import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ViewRequests = () => {
    const [requests, setRequests] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/api/requests');
                console.log('API Response:', response.data); // Debug the response
                setRequests(response.data.data || []); // Adjust to API structure
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError('Failed to fetch requests. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                marginTop: '50px',
                backgroundColor: '#f9f9f9',
                padding: '2rem',
            }}
        >
            <h2 style={{ marginBottom: '1rem', color: '#E36120' }}>View Requests</h2>
            {loading ? (
                <p style={{ color: '#333', fontSize: '1.2rem' }}>Loading requests...</p>
            ) : error ? (
                <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>
            ) : (
                <table
                    style={{
                        width: '100%',
                        maxWidth: '1000px',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Title</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Requested By</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Priority</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Change Type</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(requests) && requests.length > 0 ? (
                            requests.map((request) => (
                                <tr key={request.id}>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{request.id}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{request.title}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{request.requested_by}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{request.priority || 'N/A'}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{request.change_type}</td>
                                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{request.change_status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewRequests;
