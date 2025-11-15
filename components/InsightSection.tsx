import React from 'react';

interface InsightSectionProps {
    title: string;
    items: string[];
    // FIX: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
    icon: React.ReactNode;
}

const InsightSection: React.FC<InsightSectionProps> = ({ title, items, icon }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div className="flex items-center mb-4">
                <div className="h-8 w-8 text-blue-600 mr-3">{icon}</div>
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
            </div>
            {items && items.length > 0 ? (
                <ul className="space-y-2 pl-5 list-disc list-outside text-slate-600">
                    {items.map((item, index) => (
                        <li key={index} className="leading-relaxed">{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500">No information generated.</p>
            )}
        </div>
    );
};

export default InsightSection;
