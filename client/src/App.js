import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConfigPage from './ConfigPage';
import UploadMediaPage from './UploadMediaPage';
import CarouselComponent from './CarouselComponent';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080"

function App() {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

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
        // Aqui você pode adicionar lógica adicional, se necessário
      })
      .catch(error => {
        console.error('Erro ao apagar os arquivos:', error);
        // Aqui você pode lidar com o erro de forma adequada
      });
  };

  return (
    <>
      <Router>
        {!fullscreen && navbarVisible && (
          <nav>
            <ul>
              <li>
                <Link to="/upload">Upload</Link>
              </li>
              <li>
                <Link to="/config">Configurações</Link>
              </li>
              <li>
                <Link onClick={handleDeleteFiles}>Apagar Arquivos</Link>
              </li>
            </ul>
          </nav>
        )}

        <Routes>
          <Route path="/upload" element={<UploadMediaPage />} />
          <Route path="/config" element={<ConfigPage />} />
          {/* Outras rotas da sua aplicação */}
        </Routes>
      </Router>

      <div
        style={{ width: '100vw', height: '100vh', backgroundColor: 'lightblue' }}
        onClick={handleDivClick}
        onDoubleClick={handleFullscreen}
      >
        <CarouselComponent />
      </div>
    </>
  );
}

export default App;
