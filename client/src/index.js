import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import '../../tailwind.css';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);