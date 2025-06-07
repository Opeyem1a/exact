import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Options } from './App';
import './options.css';

const root = document.getElementById('root');

createRoot(root!).render(
    <StrictMode>
        <Options />
    </StrictMode>
);
