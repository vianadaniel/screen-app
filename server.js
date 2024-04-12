const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.static(path.join(__dirname, 'upload')));

// Rota para listar os arquivos
app.get('/api/listfiles', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Erro ao listar os arquivos:', err);
            res.status(500).json({ error: 'Erro ao listar os arquivos.' });
            return;
        }


        const filesData = [];


        files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            const fileData = fs.readFileSync(filePath, { encoding: 'base64' });
            filesData.push({ filename: file, base64data: fileData });
        });

        res.json({ files: filesData });
    });
});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});



app.post('/api/upload', (req, res) => {

    const { filename, base64data } = req.body;
    const filePath = path.join(__dirname, 'uploads', filename);

    const buffer = Buffer.from(base64data, 'base64');

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            res.status(500).json({ error: 'Erro ao salvar o arquivo.' });
            return;
        }
        console.log('Arquivo salvo com sucesso:', filePath);
        res.json({ message: 'Arquivo recebido e salvo com sucesso.' });
    });
});

app.delete('/api/deletefiles', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Erro ao listar os arquivos:', err);
            res.status(500).json({ error: 'Erro ao listar os arquivos.' });
            return;
        }

        files.forEach(file => {
            const filePath = path.join(uploadDir, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Erro ao apagar o arquivo:', err);
                    return;
                }
                console.log('Arquivo apagado com sucesso:', filePath);
            });
        });

        res.json({ message: 'Todos os arquivos foram apagados com sucesso.' });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
