const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routerFilmes = require('./routes/filmes');
const routerSeries = require('./routes/series');
const routerUsuarios = require('./routes/usuarios');

app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); //deixar uploads publico
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
    );
    if (req.method === 'OPTIONS') {
        Response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/filmes', routerFilmes);
app.use('/series', routerSeries);
app.use('/usuarios', routerUsuarios);


// QUANDO Ñ ENCONTRA ROUTER
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            mensagem: error.message
        }
    });
});

module.exports = app;