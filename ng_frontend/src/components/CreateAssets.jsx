import React, { useState } from 'react';
import axios from '../services/api';

const CreateAssets = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        ownername: '',
        location: '',
        created_at: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!formData.name || !formData.type || !formData.description || !formData.ownername || !formData.location || !formData.created_at) {
            setMessage('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/assets', formData);
            setMessage('Asset created successfully!');
            setFormData({ name: '', type: '', description: '', ownername: '', location: '', created_at: '' });
            setLoading(false);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.error || 'Error creating asset. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                marginTop: '50px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '80%',
                    maxWidth: '600px',
                    padding: '2rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#E36120' }}>Create Asset</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Field</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Name</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Enter asset name"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '95%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Type</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    placeholder="Enter asset type"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '95%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Description</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    placeholder="Enter asset description"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '95%',
                                        height: '80px',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Owner Name</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <input
                                    type="text"
                                    name="ownername"
                                    value={formData.ownername}
                                    placeholder="Enter owner name"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '95%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Location</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    placeholder="Enter location"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '95%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Created At</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <input
                                    type="datetime-local"
                                    name="created_at"
                                    value={formData.created_at}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '95%',
                                        padding: '0.5rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#E36120',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
                {message && (
                    <p style={{
                        marginTop: '1rem',
                        color: message.includes('success') ? 'green' : 'red',
                        textAlign: 'center',
                    }}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CreateAssets;
