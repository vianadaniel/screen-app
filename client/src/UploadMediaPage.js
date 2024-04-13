import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080"

function UploadMediaPage({ setCarouselInterval }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [newInterval, setNewInterval] = useState("");
    const [uploadStatus, setUploadStatus] = useState(null); // Estado para armazenar o status do upload

    const handleIntervalChange = (event) => {
        setNewInterval(event.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSetInterval = () => {
        if (!isNaN(newInterval) && newInterval !== "") {
            setCarouselInterval(parseInt(newInterval));
        }
    };

    const handleUpload = () => {
        console.log("iniciando");
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                const base64data = reader.result.split(',')[1];
                const filename = selectedFile.name;
                console.log(filename, base64data);
                fetch(apiUrl + '/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filename, base64data }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Arquivo enviado com sucesso:', data);
                        setUploadStatus("success"); // Define o status do upload como sucesso
                    })
                    .catch(error => {
                        console.error('Erro ao enviar o arquivo:', error);
                        setUploadStatus("error"); // Define o status do upload como erro
                    });
            };
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    };

    useEffect(() => {
        if (uploadStatus === "success") {
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, [uploadStatus]);

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>Upload de Arquivos</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && (
                <p style={{ color: uploadStatus === "success" ? "green" : "red" }}>
                    {uploadStatus === "success" ? "Arquivo enviado com sucesso!" : "Erro ao enviar o arquivo."}
                </p>
            )}
            <div style={{ marginTop: '20px' }}>
                <label htmlFor="intervalInput">Intervalo do Carrossel (padrão: 5000ms): </label>
                <input id="intervalInput" type="number" value={newInterval} onChange={handleIntervalChange} />
                <button style={{ marginBottom: '10px', marginLeft: '10px' }} onClick={handleSetInterval}>Definir Intervalo</button>
            </div>
        </div>
    );
}

export default UploadMediaPage;
