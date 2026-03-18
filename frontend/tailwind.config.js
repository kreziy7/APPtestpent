/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': '#000000',
                'bg-secondary': '#111111',
                'text-primary': '#ffffff',
                'text-secondary': '#a1a1aa',
                'border-color': '#27272a',
                'accent-color': '#ffffff',
                'accent-secondary': '#3f3f46',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            backgroundImage: {
                'dark-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                'white-gradient': 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
            }
        },
    },
    plugins: [],
}
