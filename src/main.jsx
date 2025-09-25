import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const Root = () => {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const openTimer = setTimeout(() => setDoorsOpen(true), 2000);
    const removeTimer = setTimeout(() => setShowLoader(false), 5000);
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
          <div className="door left-door">
            <span></span>
            <div className="door-text left-text">GIT</div>
          </div>
          <div className="door right-door">
            <span></span>
            <div className="door-text right-text">FLOORS</div>
          </div>
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
