import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Terminal from './components/Terminal';
import Professional from './pages/Professional';
import VideoTransition from './components/VideoTransition';
import './App.css';

function AppContent() {
  const [showTransition, setShowTransition] = useState(false);
  const [targetRoute, setTargetRoute] = useState(null);
  const navigate = useNavigate();

  const handleNavigateWithTransition = (route) => {
    setTargetRoute(route);
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    if (targetRoute) {
      navigate(targetRoute);
      setTargetRoute(null);
    }
  };

  return (
    <>
      {showTransition && <VideoTransition onComplete={handleTransitionComplete} />}
      
      <Routes>
        <Route 
          path="/" 
          element={<Terminal onNavigateToProfessional={() => handleNavigateWithTransition('/professional')} />} 
        />
        <Route 
          path="/professional" 
          element={<Professional />} 
        />
      </Routes>
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;