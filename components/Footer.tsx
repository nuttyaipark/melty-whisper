import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 p-4 text-center z-50 pointer-events-none">
            <div className="inline-block px-4 py-2 rounded-full glass-panel opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
                <p className="text-[10px] text-white/50 tracking-widest font-light">
                    MELTY WHISPER © 2026 NUTTY AI PARK
                    <span className="mx-2">|</span>
                    POWERED BY GEMINI
                </p>
            </div>
        </footer>
    );
};

export default Footer;
