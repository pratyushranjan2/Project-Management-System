module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        borderWidth: {
            DEFAULT: '1px',
            0: '0',
            2: '2px',
            3: '3px',
            4: '4px',
            6: '6px',
            8: '8px',
        },
        backgroundImage: {
            'dark-mode': 'url(./endless-constellation.svg)',
            // 'light-mode': 'url(./subtle-prism.svg)',
        },
    },
    plugins: [require('@tailwindcss/forms'), require('daisyui')],
};
