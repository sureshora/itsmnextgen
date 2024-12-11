import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        incidents: 0,
        changeRequests: 0,
        assets: 0,
    });

    useEffect(() => {
        // Fetch data from the API
        axios.get('/api/dashboard-stats')
            .then((response) => {
                setStats(response.data);
            })
            .catch((error) => {
                console.error("Error fetching statistics:", error);
            });
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Welcome to the ITSM NextGen Dashboard</h1>
            <p>Use the navigation links to create or view incidents.</p>

            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '2rem',
            }}>
                {/* Incident Stats */}
                <div style={{
                    backgroundColor: '#f4a261',
                    color: '#fff',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '30%',
                }}>
                    <h2>{stats.incidents}</h2>
                    <p>Number of Incidents</p>
                </div>

                {/* Change Request Stats */}
                <div style={{
                    backgroundColor: '#2a9d8f',
                    color: '#fff',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '30%',
                }}>
                    <h2>{stats.changeRequests}</h2>
                    <p>Number of Change Requests</p>
                </div>
                 {/* Asset Stats */}
                <div style={{
                    backgroundColor: '#e76f51',
                    color: '#fff',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '30%',
                }}>
                    <h2>{stats.assets}</h2>
                    <p>Number of Assets</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;