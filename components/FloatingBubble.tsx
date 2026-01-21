import React, { useRef, useEffect, useState } from 'react';

interface FloatingBubbleProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    initialX: number; // Percentage 0-100
    initialY: number; // Percentage 0-100
    delay?: number;
}

const FloatingBubble: React.FC<FloatingBubbleProps> = ({ children, onClick, className, initialX, initialY, delay = 0 }) => {
    const elementRef = useRef<HTMLButtonElement>(null);
    const positionRef = useRef({ x: initialX, y: initialY }); // Current logical position (percentage)
    const velocityRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(Math.random() * 100);

    useEffect(() => {
        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Support touch avoidance as well
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseX = e.touches[0].clientX;
                mouseY = e.touches[0].clientY;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        const animate = () => {
            if (!elementRef.current) return;

            timeRef.current += 0.01;
            const time = timeRef.current;

            // 1. Gentle Floating (Sine waves)
            const floatX = Math.sin(time) * 0.5; // Amplitude 0.5%
            const floatY = Math.cos(time * 0.8) * 0.5;

            // 2. Mouse Avoidance (Escape physics)
            const rect = elementRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = centerX - mouseX;
            const dy = centerY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const threshold = 150; // Distance to start reacting

            if (dist < threshold) {
                const force = (threshold - dist) / threshold; // 0 to 1
                const angle = Math.atan2(dy, dx);

                // Push away
                velocityRef.current.x += Math.cos(angle) * force * 0.2;
                velocityRef.current.y += Math.sin(angle) * force * 0.2;
            }

            // 3. Friction & Spring back to home (optional, or just drift)
            // Let's have them bound slightly loosely to their origin but primarily float
            // Damping
            velocityRef.current.x *= 0.95;
            velocityRef.current.y *= 0.95;

            // Update position (convert velocity which is abstract to percentage-ish or pixels?)
            // Simplest: Apply translation via transform
            // We keep initial position fixed in CSS (top/left), and apply transform for movement.

            // Calculate final translation in px
            const currentTx = floatX * 20 + velocityRef.current.x * 20; // Scale up
            const currentTy = floatY * 20 + velocityRef.current.y * 20;

            elementRef.current.style.transform = `translate(${currentTx}px, ${currentTy}px)`;

            animationFrameId = requestAnimationFrame(animate);
        };

        // Delay start of animation if needed
        setTimeout(() => {
            animate();
        }, delay * 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [delay, initialX, initialY]);

    return (
        <button
            ref={elementRef}
            onClick={onClick}
            className={`absolute ${className}`}
            style={{
                left: `${initialX}%`,
                top: `${initialY}%`,
                transition: 'opacity 0.5s ease-out'
            }}
        >
            {children}
        </button>
    );
};

export default FloatingBubble;
