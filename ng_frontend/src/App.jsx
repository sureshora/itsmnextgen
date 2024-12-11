import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';
import Header from './components/Header';
import CoreFeatures from './components/CoreFeatures'; // Add this import
import CreateAssets from './components/CreateAssets';
import ViewAssets from './components/ViewAssets';
import ChangeRequests from './components/ChangeRequests';
import ViewRequests from './components/ViewRequests';
import Chatbot from './components/Chatbot';


const App = () => {
    return (
        <Router>
            <Header /> {/* Header at the top */}
            <main style={{ padding: '1rem' }}> {/* Main content below the header */}
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create-incident" element={<IncidentForm />} />
                    <Route path="/incidents" element={<IncidentList />} />
                    <Route path="/core-features" element={<CoreFeatures />} />
                    <Route path="/create-assets" element={<CreateAssets />} />
                    <Route path="/view-assets" element={<ViewAssets />} />
                    <Route path="/change-requests" element={<ChangeRequests />} />
                    <Route path="/view-requests" element={<ViewRequests />} />
                    <Route path="/chatbot" element={<Chatbot />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
