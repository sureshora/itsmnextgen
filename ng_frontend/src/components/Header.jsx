import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header
            style={{
                padding: '1rem',
                backgroundColor: '#282c34',
                color: '#fff',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
            }}
        >
            <nav style={{ textAlign: 'center' }}>
                <Link to="/" style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}>
                    Dashboard
                </Link>
                <Link
                    to="/create-incident"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    Create Incident
                </Link>
                <Link
                    to="/incidents"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    View Incidents
                </Link>
                <Link
                    to="/core-features"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    Core Features
                </Link>
                <Link
                    to="/create-assets"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    Create Assets
                </Link>
                <Link
                    to="/view-assets"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    View Assets
                </Link>
                <Link
                    to="/change-requests"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    Change Requests
                </Link>
                <Link
                    to="/view-requests"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    View Requests
                </Link>
                <Link
                    to="/chatbot"
                    style={{ margin: '0 1rem', color: '#61dafb', textDecoration: 'none' }}
                >
                    Chatbot
                </Link>
            </nav>
        </header>
    );
};

export default Header;
