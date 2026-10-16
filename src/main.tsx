import React from 'react';
import {createRoot} from 'react-dom/client';
import {TechPortal} from './TechPortal';
import './styles.css';
document.addEventListener('contextmenu',event=>event.preventDefault(),{capture:true});
createRoot(document.getElementById('root')!).render(<React.StrictMode><TechPortal/></React.StrictMode>);
