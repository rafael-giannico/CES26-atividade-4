const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Para servir arquivos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Para servir arquivos da pasta 'static'
app.use('/static', express.static(path.join(__dirname, '../static')));

// Rota para processar dados do formulário via GET
app.get('/process-form', (req, res) => {
    const data = req.query;
    res.send(`Dados recebidos: ${JSON.stringify(data)}`);
});

// Rota para realizar upload de arquivo via POST
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Arquivo enviado com sucesso!');
});

// Rota para suportar aplicação AJAX
app.get('/data', (req, res) => {
    const jsonData = {
        message: "Dados em JSON recebidos com sucesso!"
    };
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
