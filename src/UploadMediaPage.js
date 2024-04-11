import React, { useState } from 'react';

function UploadMediaPage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Aqui você pode enviar o arquivo para o servidor
            console.log('Arquivo selecionado:', selectedFile);
        } else {
            console.log('Nenhum arquivo selecionado.');
        }
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <h1>Upload de Fotos</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadMediaPage;