
import React, { useState, useCallback } from 'react';
import { findDoctors } from '../services/geminiService';
import { DoctorProfile } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import DoctorCard from '../components/DoctorCard';

const PatientPortal: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [location, setLocation] = useState('');
    const [preferences, setPreferences] = useState('');
    const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms) {
            setError('Please describe your symptoms.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setDoctors([]);

        try {
            const results = await findDoctors(symptoms, location, preferences);
            setDoctors(results);
        } catch (err) {
            setError('Failed to find doctors. The AI model may be overloaded. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [symptoms, location, preferences]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800">AI Doctor Finder</h1>
                <p className="text-md text-slate-600 mt-2">Describe your symptoms to find the best-matched doctors for your needs.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 mb-1">
                            Symptoms or Health Concern <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="symptoms"
                            rows={4}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 'Persistent cough, fever, and chest pain for three days'"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Location (Optional)</label>
                            <input
                                type="text"
                                id="location"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 'New York, NY'"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="preferences" className="block text-sm font-medium text-slate-700 mb-1">Preferences (Optional)</label>
                            <input
                                type="text"
                                id="preferences"
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 'Prefers a female doctor'"
                                value={preferences}
                                onChange={(e) => setPreferences(e.target.value)}
                            />
                        </div>
                    </div>
                   
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Searching...' : 'Find Doctors'}
                        </button>
                    </div>
                </form>
            </div>
            
            {error && <div className="mt-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md">{error}</div>}

            <div className="mt-10">
                {isLoading && <LoadingSpinner />}
                {doctors.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Top Recommendations</h2>
                        <div className="space-y-4">
                            {doctors.map((doc, index) => <DoctorCard key={index} doctor={doc} />)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PatientPortal;
