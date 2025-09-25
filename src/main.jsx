import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const Root = () => {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Start opening doors after a short delay
    const openTimer = setTimeout(() => setDoorsOpen(true), 500); // small delay for animation

    // Remove loader after animation duration
    const removeTimer = setTimeout(() => setShowLoader(false), 1300); // match CSS transition (1.2s)

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <App />
      {showLoader && (
        <div className={`elevator-doors ${doorsOpen ? 'open' : ''}`}>
          <div className="door left-door"><span></span></div>
          <div className="door right-door"><span></span></div>
        </div>
      )}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
