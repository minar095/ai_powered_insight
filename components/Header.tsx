
import React from 'react';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center">
                <div 
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={onLogoClick}
                >
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h1 className="text-2xl font-bold text-slate-800">CuraLink</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
