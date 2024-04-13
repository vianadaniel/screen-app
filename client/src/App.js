import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConfigPage from './ConfigPage';
import UploadMediaPage from './UploadMediaPage';
import CarouselComponent from './CarouselComponent';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080"

function App() {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [carouselInterval, setCarouselInterval] = useState(() => {
    // Tenta recuperar o intervalo do localStorage, ou usa o valor padrão (5000)
    const storedInterval = localStorage.getItem('carouselInterval');
    return storedInterval ? parseInt(storedInterval) : 5000;
  });

  const [uploadLink, setUploadLink] = useState("/");

  const handleUploadClick = () => {
    setUploadLink(uploadLink === "/" ? "/upload" : "/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (document.fullscreenElement) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleResize);

    return () => {
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, []);

  const handleDivClick = () => {
    setNavbarVisible(true);
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleDeleteFiles = () => {
    fetch(apiUrl + '/api/deletefiles', { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); // Exibe a mensagem de sucesso no console
        window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao apagar os arquivos:', error);
        // Aqui você pode lidar com o erro de forma adequada
      });
  };

  useEffect(() => {
    localStorage.setItem('carouselInterval', carouselInterval.toString());
  }, [carouselInterval]);

  const [licenseExpired, setLicenseExpired] = useState(false);

  useEffect(() => {

    const checkLicenseValidity = () => {

      const expirationDate = new Date('2025-04-12');
      const currentDate = new Date();
      if (currentDate > expirationDate) {
        setLicenseExpired(true);
      }
    };

    checkLicenseValidity();
  }, []);

  if (licenseExpired) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50vh' }}>
        <h1>A licença expirou</h1>
      </div>
    );
  }

  return (
    <>
      <Router>
        {!fullscreen && navbarVisible && (
          <nav>
            <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
              <li style={{ marginRight: '30px' }}>
                <Link to={uploadLink} onClick={handleUploadClick}>
                  {uploadLink === "/" ? "Upload" : "Upload"}
                </Link>
              </li>
              <li style={{ marginRight: '30px' }}>
                <Link onClick={handleDeleteFiles}>Apagar Arquivos</Link>
              </li>
            </ul>
          </nav>
        )}

        <Routes>
          <Route path="/upload" element={<UploadMediaPage setCarouselInterval={setCarouselInterval} />} />
          <Route path="/config" element={<ConfigPage />} />
        </Routes>
      </Router >

      <div
        style={{ width: '100vw', height: '100vh', backgroundColor: 'lightblue' }}
        onClick={handleDivClick}
        onDoubleClick={handleFullscreen}
      >
        <CarouselComponent interval={carouselInterval} />
      </div>
    </>
  );
}

export default App;
