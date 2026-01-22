import React from 'react';

const MeltyBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* @ts-ignore */}
            <lottie-player
                src={`${import.meta.env.BASE_URL}background.lottie.json`.replace('//', '/')}
                background="transparent"
                speed="1"
                loop
                autoplay
                preserveAspectRatio="xMidYMid slice"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />

            {/* Optional Overlay to blend it better with the app theme if needed */}
            <div className="absolute inset-0 bg-background-dark/20 mix-blend-overlay"></div>
        </div>
    );
};

export default MeltyBackground;
