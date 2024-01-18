// /** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
  },
  // ...
}

