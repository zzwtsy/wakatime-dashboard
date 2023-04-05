/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'media',
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: '2rem'
        }
    },
    plugins: [],
}
