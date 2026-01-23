import React from 'react';
import ReactDOM from 'react-dom/client';
// Fix: Use named import for App as it does not have a default export
import { App } from './App';

console.log('Starting index.tsx execution');
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (!rootElement) {
  console.error('Root element missing!');
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
console.log('Created root, rendering App...');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('Render call completed');