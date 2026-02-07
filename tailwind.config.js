/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00ff9d',
                secondary: '#0066ff',
                accent: '#ff3366',
                background: '#0a0a0a',
                surface: '#1a1a1a',
                'text-main': '#ffffff',
                'text-secondary': '#a0a0a0',
                muted: '#666666',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                orbitron: ['Orbitron', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
