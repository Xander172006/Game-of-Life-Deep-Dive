import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                playfull: ['Playfair Display', ...defaultTheme.fontFamily.serif],
                pixelify: ['"Pixelify Sans"', 'sans-serif'],
            },
            blur: {
                '14': '3.5rem'
            }
        },
    },

    plugins: [forms],
};
