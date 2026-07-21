// In `npm run dev`, leave this empty so requests go through the Vite proxy (/api → lab server).
// To hit a local Express server instead: VITE_API_URL=http://localhost:8181 npm run dev
export const API_URL = import.meta.env.VITE_API_URL || '';

console.log('API_URL :', API_URL || '(same-origin / Vite proxy)');
