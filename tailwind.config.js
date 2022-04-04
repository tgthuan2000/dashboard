module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            inherit: 'inherit',
            white: '#fff',
            gray: '#878a99',
            'gray-light': '#f3f6f9',
            'gray-dark': '#343a40',
            'dark-white': '#ced4da',
            primary: '#405189',
            secondary: '#3577f1',
            dark: '#212529',
            success: '#0ab39c',
            danger: '#f06548',
            warning: '#f7b84b',
            info: '#299cdb',
        },
        fontFamily: {
            base: ['Poppins', 'sans-serif'],
        },
        extend: {
            boxShadow: {
                flatpickr: '-5px 0 0 #f3f6f9, 5px 0 0 #f3f6f9',
                'flatpickr-dark': '-5px 0 0 #343a40, 5px 0 0 #343a40',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
