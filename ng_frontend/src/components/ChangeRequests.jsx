import React, { useState } from 'react';
import axios from '../services/api';

const CreateRequests = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requested_by: '',
        requested_date: '',
        change_type: '',
        priority: '',
        impact: '',
        risk_level: '',
        planned_start_date: '',
        planned_end_date: '',
        implementation_plan: '',
        backout_plan: '',
        approvers: '',
        affected_services: '',
        change_status: 'New',
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

        // Validate required fields
        if (!formData.title || !formData.description || !formData.requested_by || !formData.change_type) {
            setMessage('All required fields must be filled.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/requests', formData);
            setMessage('Request created successfully!');
            setFormData({
                title: '',
                description: '',
                requested_by: '',
                requested_date: '',
                change_type: '',
                priority: '',
                impact: '',
                risk_level: '',
                planned_start_date: '',
                planned_end_date: '',
                implementation_plan: '',
                backout_plan: '',
                approvers: '',
                affected_services: '',
                change_status: 'New',
            });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.error || 'Error creating request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '280vh',
                width: '100vw',
                marginTop: '20px',
                backgroundColor: '#f9f9f9',
            
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '80%',
                    maxWidth: '800px',
                    padding: '2rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#E36120' }}>Create Request</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Field</th>
                            <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: 'Title', name: 'title', type: 'text', placeholder: 'Enter request title', required: true },
                            { label: 'Description', name: 'description', type: 'textarea', placeholder: 'Enter request description', required: true },
                            { label: 'Requested By', name: 'requested_by', type: 'text', placeholder: 'Enter requester name', required: true },
                            { label: 'Requested Date', name: 'requested_date', type: 'datetime-local', required: false },
                            { label: 'Change Type', name: 'change_type', type: 'text', placeholder: 'Enter change type (e.g., Normal, Emergency)', required: true },
                            { label: 'Priority', name: 'priority', type: 'text', placeholder: 'Enter priority (e.g., High, Low)', required: false },
                            { label: 'Impact', name: 'impact', type: 'text', placeholder: 'Enter impact level (e.g., Critical, Moderate)', required: false },
                            { label: 'Risk Level', name: 'risk_level', type: 'text', placeholder: 'Enter risk level (e.g., High, Low)', required: false },
                            { label: 'Planned Start Date', name: 'planned_start_date', type: 'datetime-local', required: false },
                            { label: 'Planned End Date', name: 'planned_end_date', type: 'datetime-local', required: false },
                            { label: 'Implementation Plan', name: 'implementation_plan', type: 'textarea', placeholder: 'Enter implementation plan', required: false },
                            { label: 'Backout Plan', name: 'backout_plan', type: 'textarea', placeholder: 'Enter backout plan', required: false },
                            { label: 'Approvers', name: 'approvers', type: 'text', placeholder: 'Enter approvers', required: false },
                            { label: 'Affected Services', name: 'affected_services', type: 'text', placeholder: 'Enter affected services', required: false },
                            { label: 'Change Status', name: 'change_status', type: 'text', placeholder: 'Enter change status (e.g., New, Approved)', required: false },
                        ].map((field, index) => (
                            <tr key={index}>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: 'bold' }}>
                                    {field.label}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name]}
                                            placeholder={field.placeholder}
                                            onChange={handleChange}
                                            required={field.required}
                                            style={{
                                                width: '95%',
                                                height: '80px',
                                                padding: '0.5rem',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                            }}
                                        ></textarea>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name]}
                                            placeholder={field.placeholder}
                                            onChange={handleChange}
                                            required={field.required}
                                            style={{
                                                width: '95%',
                                                padding: '0.5rem',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
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

export default CreateRequests;
