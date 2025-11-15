import React from 'react';
import { View } from '../types';

interface HomePageProps {
    onNavigate: (view: View) => void;
}

// FIX: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
const PortalCard: React.FC<{title: string, description: string, icon: React.ReactNode, onClick: () => void}> = ({ title, description, icon, onClick }) => (
    <div 
        className="bg-white rounded-lg shadow-lg p-8 text-center flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-200"
        onClick={onClick}
    >
        <div className="bg-blue-100 rounded-full p-4 mb-4">
            {icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Welcome to CuraLink</h1>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Your AI-powered connection to better healthcare. Choose your portal below to get started.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
                <PortalCard
                    title="For Patients"
                    description="Find the right doctor based on your symptoms, location, and preferences with our intelligent matching system."
                    icon={<svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                    onClick={() => onNavigate('patient')}
                />
                <PortalCard
                    title="For Doctors"
                    description="Generate clinical summaries, differential diagnoses, and test suggestions from your consultation notes in seconds."
                    icon={<svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                    onClick={() => onNavigate('doctor')}
                />
            </div>
        </div>
    );
};

export default HomePage;
