
import React, { useState, useCallback } from 'react';
import { generateClinicalInsights } from '../services/geminiService';
import { ClinicalInsight } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import InsightSection from '../components/InsightSection';

const DoctorPortal: React.FC = () => {
    const [notes, setNotes] = useState('');
    const [insights, setInsights] = useState<ClinicalInsight | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!notes.trim()) {
            setError('Please enter consultation notes.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setInsights(null);

        try {
            const results = await generateClinicalInsights(notes);
            setInsights(results);
        } catch (err) {
            setError('Failed to generate insights. The AI model may be overloaded. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [notes]);
    
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-800">Clinical Insight Generator</h1>
                <p className="text-md text-slate-600 mt-2">Paste your consultation notes to generate a structured summary and suggestions.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
                            Consultation Notes <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="notes"
                            rows={10}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Patient presents with..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Generating...' : 'Generate Insights'}
                        </button>
                    </div>
                </form>
            </div>
            
            {error && <div className="mt-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-md">{error}</div>}

            <div className="mt-10">
                {isLoading && <LoadingSpinner />}
                {insights && (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">AI-Generated Insights</h2>
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
                                <div className="flex items-center mb-3">
                                    <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                                    <h3 className="text-xl font-semibold text-slate-800">Clinical Summary</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{insights.summary}</p>
                            </div>
                            <InsightSection title="Differential Diagnoses" items={insights.differentialDiagnoses} icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} />
                            <InsightSection title="Suggested Tests" items={insights.suggestedests} icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>} />
                            <InsightSection title="Next Steps" items={insights.nextSteps} icon={<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DoctorPortal;
