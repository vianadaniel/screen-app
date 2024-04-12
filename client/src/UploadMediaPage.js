import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080"

function UploadMediaPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        console.log("iniciando")
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                const base64data = reader.result.split(',')[1];
                const filename = selectedFile.name;
                console.log(filename, base64data)
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
                    })
                    .catch(error => {
                        console.error('Erro ao enviar o arquivo:', error);
                    });
            };
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>Upload de Arquivos</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadMediaPage;