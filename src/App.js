import CarouselComponent from './carousel';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import UploadMediaPage from './UploadMediaPage';

function App() {
  useEffect(() => {
    const handleResize = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    };

    document.addEventListener('dblclick', handleResize);

    return () => {
      document.removeEventListener('dblclick', handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/upload" element={<UploadMediaPage />} />
          {/* Outras rotas da sua aplicação */}
        </Routes>
      </Router>

      <div style={{ width: '100vw', height: '100vh', backgroundColor: 'lightblue' }}>
        <CarouselComponent />
      </div>
    </>
  );

}

export default App;
