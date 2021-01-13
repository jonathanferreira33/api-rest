const express = require('express');
const router = express.Router();

//RETORNA TODOS AS SERIES
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando GET router series'
    });
});

//INSERE UMA SERIE
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando POST router series'
    });
});


//RETORNA OS DADOS DE UMA SERIE
router.get('/:id_serie', (req, res, next) => {
    const id = req.params.id_serie
        res.status(200).send({
            mensagem: 'Usando GET router serie, com ID exclusivo',
            id: id
        });
});

//ALTERA UMA SERIE
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando PATCH router series'
    });
});

//DELETA UMA SERIE
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando DELETE router series'
    });
});

module.exports = router;