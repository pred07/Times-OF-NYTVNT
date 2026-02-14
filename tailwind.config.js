/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--accent-primary)',
                secondary: 'var(--accent-secondary)',
                background: 'var(--bg-primary)',
                surface: 'var(--bg-surface)',
                'text-main': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                muted: 'var(--text-muted)',
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
