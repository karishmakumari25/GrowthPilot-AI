// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: '/GrowthPilot-AI/',

//   plugins: [react()],

//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],

//   base: '/GrowthPilot-AI/',

//   server: {
//     host: '0.0.0.0',
//     port: 3000,
//   },
// });