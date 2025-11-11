import { terser } from 'rollup-plugin-terser';

export default {
  input: 'scripts/pages/homepage.js', // Point d'entrée (ajustez si nécessaire)
  output: {
    file: 'dist/app.min.js',
    format: 'iife', // Format compatible navigateur
  },
  plugins: [terser()],
};
