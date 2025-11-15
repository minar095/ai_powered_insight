
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import Header from './components/Header';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderView = () => {
    switch (currentView) {
      case 'patient':
        return <PatientPortal />;
      case 'doctor':
        return <DoctorPortal />;
      case 'home':
      default:
        return <HomePage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header onLogoClick={() => setCurrentView('home')} />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <footer className="text-center py-4 mt-8 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} CuraLink. All rights reserved.</p>
        <p className="mt-1">This is a conceptual application. AI-generated content may be inaccurate. Not for medical use.</p>
      </footer>
    </div>
  );
};

export default App;
