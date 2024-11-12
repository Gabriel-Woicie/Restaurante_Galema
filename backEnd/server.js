import express from 'express';

const app = express();

app.get('/teste', (request, response) => {
    response.status(200).send('Requisição recebida.');
});

app.listen(3001);