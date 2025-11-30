module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: 'rgba(15,23,42,0.85)',
        accent: '#22d3ee'
      },
      boxShadow: {
        glass: '0 0 25px rgba(15,23,42,0.85)'
      }
    }
  },
  plugins: []
};
