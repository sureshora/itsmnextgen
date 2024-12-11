import React, { useState } from 'react';
import axios from '../services/api';

const IncidentForm = () => {
    const [formData, setFormData] = useState({ title: '', description: '', priority: 'Low' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!formData.title || !formData.description || !formData.priority) {
            setMessage('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/incidents', formData);
            setMessage('Incident created successfully!');
            setFormData({ title: '', description: '', priority: 'Low' });
            setLoading(false);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.error || 'Error creating incident. Please try again.');
            setLoading(false);
        }
    };

    return (
<div
    style={{
        display: 'flex', // Enables flexbox layout
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center', // Centers content vertically
        height: '100vh', // Full height of the viewport
        width: '100vw', // Full width of the viewport
        backgroundColor: '#f9f9f9', // Background color for contrast
    }}
>
    <form
        onSubmit={handleSubmit}
        style={{
            width: '80%', // Form occupies 80% of the parent container
            maxWidth: '600px', // Maximum width for the form
            padding: '2rem', // Padding inside the form
            backgroundColor: '#fff', // Form background color
            border: '1px solid #ddd', // Light border around the form
            borderRadius: '8px', // Rounded corners for aesthetics
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for elevation effect
        }}
    >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#E36120' }}>Create Incident</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Field</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Title</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    placeholder="Enter title"
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
                                    placeholder="Enter description"
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
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>Priority</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                <label style={{ marginRight: '1rem' }}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Low"
                                        checked={formData.priority === 'Low'}
                                        onChange={handleChange}
                                    />{' '}
                                    Low
                                </label>
                                <label style={{ marginRight: '1rem' }}>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="Medium"
                                        checked={formData.priority === 'Medium'}
                                        onChange={handleChange}
                                    />{' '}
                                    Medium
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="priority"
                                        value="High"
                                        checked={formData.priority === 'High'}
                                        onChange={handleChange}
                                    />{' '}
                                    High
                                </label>
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

export default IncidentForm;
