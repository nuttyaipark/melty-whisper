/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./utils/**/*.{js,ts,jsx,tsx}",
        "./services/**/*.{js,ts,jsx,tsx}",
        "./data/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#0dccf2",
                "background-light": "#f5f8f8",
                "background-dark": "#0a0a0f",
                "violet-deep": "#1a0b2e",
                "cyan-glow": "#0dccf2",
                "deep-pool": "#081315",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "Noto Sans JP", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
            animation: {
                'meltyFlow': 'meltyFlow 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                meltyFlow: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
