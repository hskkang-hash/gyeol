
// Triggering new deployment
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import GoldenDays from './pages/GoldenDays';
import Profile from './pages/Profile'; // Import Profile
import './App.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
    </div>
  );
};


function App() {
  // Check if the user has completed onboarding
  const hasCompletedOnboarding = !!localStorage.getItem('userProfile');

  return (
    <Router>
      <LanguageSwitcher />
      <Routes>
        <Route path="/" element={hasCompletedOnboarding ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/golden-days" element={<GoldenDays />} />
        <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
      </Routes>
    </Router>
  );
}

export default App;
