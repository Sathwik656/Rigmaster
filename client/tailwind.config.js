/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#135bec",
                "secondary": "#9333ea", // Purple accent
                "background-light": "#f6f6f8",
                "background-dark": "#0a0a0a", // Deeper black for gaming feel
                "surface-dark": "#161b22",
                "border-dark": "#282e39",
                "amd-red": "#EF4444",
                "amd-orange": "#F97316",
                "card-dark": "#1c1f27",
                "text-secondary": "#9da6b9",
            },
            fontFamily: {
                "display": ["Space Grotesk", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
}
