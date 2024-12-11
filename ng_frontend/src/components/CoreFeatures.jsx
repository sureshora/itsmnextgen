import React, { useState } from 'react';

const CoreFeatures = () => {
    const [features, setFeatures] = useState([
        {
            category: "Incident Management",
            items: [
                "AI-based ticket categorization and prioritization.",
                "SLA monitoring with automated escalations.",
            ],
        },
        {
            category: "Change Management",
            items: [
                "Risk analysis and dynamic approvals.",
                "Real-time collaboration for workflow execution.",
            ],
        },
        {
            category: "Asset Management",
            items: [
                "Automated asset discovery and lifecycle management.",
                "Integration with a CMDB for asset tracking.",
            ],
        },
    ]);

    const [newFeature, setNewFeature] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddFeature = (e) => {
        e.preventDefault();

        if (!newFeature || !selectedCategory) {
            alert('Please select a category and enter a new feature.');
            return;
        }

        setFeatures((prevFeatures) =>
            prevFeatures.map((feature) =>
                feature.category === selectedCategory
                    ? { ...feature, items: [...feature.items, newFeature] }
                    : feature
            )
        );

        setNewFeature('');
        setSelectedCategory('');
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <h2 style={{ color: '#E36120', textAlign: 'center', marginBottom: '2rem' }}>Core Features</h2>

            <form
                onSubmit={handleAddFeature}
                style={{
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h3 style={{ color: '#E36120', marginBottom: '1rem' }}>Add New Feature</h3>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                >
                    <option value="" disabled>
                        Select a Category
                    </option>
                    {features.map((feature, index) => (
                        <option key={index} value={feature.category}>
                            {feature.category}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter new feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    style={{
                        width: '96%',
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#E36120',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                >
                    Add Feature
                </button>
            </form>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '1.5rem',
                        }}
                    >
                        <h3
                            style={{
                                color: '#E36120',
                                fontSize: '1.25rem',
                                marginBottom: '1rem',
                                textAlign: 'center',
                            }}
                        >
                            {feature.category}
                        </h3>
                        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                            {feature.items.map((item, i) => (
                                <li
                                    key={i}
                                    style={{
                                        marginBottom: '0.75rem',
                                        fontSize: '1rem',
                                        color: '#333',
                                    }}
                                >
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#E36120',
                                            borderRadius: '50%',
                                            marginRight: '0.5rem',
                                        }}
                                    ></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoreFeatures;
