import React from 'react';

// Type definition for custom element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                background?: string;
                speed?: string | number;
                loop?: boolean;
                autoplay?: boolean;
                mode?: string;
            };
        }
    }
}

const MeltyBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <lottie-player
                src="/background.lottie.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            ></lottie-player>

            {/* Optional Overlay to blend it better with the app theme if needed */}
            <div className="absolute inset-0 bg-background-dark/20 mix-blend-overlay"></div>
        </div>
    );
};

export default MeltyBackground;
