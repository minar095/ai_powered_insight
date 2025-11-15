
import React from 'react';
import { DoctorProfile } from '../types';

interface DoctorCardProps {
    doctor: DoctorProfile;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 transition-transform hover:scale-105 duration-300">
            <div className="flex items-start space-x-4">
                 <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                 </div>
                 <div>
                    <h3 className="text-xl font-semibold text-slate-800">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    <p className="text-sm text-slate-500 mt-1">{doctor.location}</p>
                 </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 italic">
                    <span className="font-semibold text-slate-700">AI Recommendation:</span> "{doctor.reasonForMatch}"
                </p>
            </div>
        </div>
    );
};

export default DoctorCard;
