import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const ViewAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get('/api/assets');
                console.log('API Response:', response.data); // Debug log
                if (Array.isArray(response.data)) {
                    setAssets(response.data); // Update state with full data array
                } else {
                    setAssets([]); // Fallback to an empty array
                }
            } catch (error) {
                console.error('Error fetching assets:', error.message);
                setError('Failed to fetch assets. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
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
                backgroundColor: '#f9f9f9',
                padding: '2rem',
            }}
        >
            <h2 style={{ marginBottom: '1rem', color: '#E36120' }}>View Assets</h2>
            {loading ? (
                <p style={{ color: '#333', fontSize: '1.2rem' }}>Loading assets...</p>
            ) : error ? (
                <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>
            ) : assets.length === 0 ? (
                <p style={{ color: '#333', fontSize: '1.2rem' }}>No assets found.</p>
            ) : (
                <table
                    style={{
                        width: '100%',
                        maxWidth: '800px',
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
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Type</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Owner</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Location</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <tr key={asset.id}>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{asset.name}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{asset.type}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{asset.ownername}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{asset.location}</td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                    {new Date(asset.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewAssets;
