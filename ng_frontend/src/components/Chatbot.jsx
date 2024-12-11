import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        const botResponse = await getBotResponse(input);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);

        setInput('');
    };

    const getBotResponse = async (message) => {
        try {
            console.log('Sending message to chatbot API:', message);

            const response = await fetch('http://localhost:3074/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: message }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from chatbot API.');
            }

            const result = await response.json();
            console.log('Chatbot API response:', result);

            if (result.type === 'assets') {
                return result.data.map(asset => `ID: ${asset.id}, Name: ${asset.name}`).join('\n');
            } else if (result.type === 'requests') {
                return result.data.map(request => `ID: ${request.id}, Title: ${request.title}`).join('\n');
            } else if (result.type === 'incidents') {
                return result.data.map(incident => `ID: ${incident.id}, Title: ${incident.title}, Priority: ${incident.priority}`).join('\n');
            } else {
                return result.message || 'I can only answer about assets, requests, or incidents.';
            }
        } catch (error) {
            console.error('Error getting bot response:', error.message);
            return 'Sorry, there was an error processing your request.';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
            <div style={{
                maxWidth: '500px', // Increase width for better readability
                width: '100%',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <div style={{ backgroundColor: '#E36120', color: '#fff', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>Chatbot</div>
                <div style={{
                    flex: 1,
                    padding: '1rem',
                    overflowY: 'auto', // Allow scrolling for large messages
                    maxHeight: '900px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    {messages.map((message, index) => (
                        <div key={index} style={{
                            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            backgroundColor: message.sender === 'user' ? '#E36120' : '#f2f2f2',
                            color: message.sender === 'user' ? '#fff' : '#333',
                            padding: '0.75rem 1rem',
                            borderRadius: '15px',
                            maxWidth: '75%',
                            whiteSpace: 'pre-wrap', // Preserve line breaks for multi-line messages
                            wordBreak: 'break-word',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderTop: '1px solid #ddd',
                    padding: '0.5rem',
                    gap: '0.5rem'
                }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '20px', outline: 'none' }}
                    />
                    <button
                        onClick={handleSend}
                        style={{ backgroundColor: '#E36120', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
