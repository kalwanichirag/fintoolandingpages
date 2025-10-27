// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "tw-",
    content: [
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
        "./src/pages/**/*.{js,jsx,ts,tsx}",
    ],
    corePlugins: {
        preflight: false, // keep Bootstrap's base styles
    },
    safelist: [
        'tw-bg-fintoo-blue',
        'tw-bg-fintoo-orange',
        'tw-bg-green-600',
        'tw-bg-purple-600',
        'tw-bg-indigo-600',
        'tw-bg-teal-600',
        'tw-from-blue-50',
        'tw-from-orange-50',
        'tw-from-green-50',
        'tw-from-purple-50',
        'tw-from-indigo-50',
        'tw-from-teal-50',
        'bg-gray-100',
        'from-bg-gray-100',
    ],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 15s linear infinite',
            },
            colors: {
                "fintoo-blue": "#042b62",
                "fintoo-orange": "#dd7300",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
