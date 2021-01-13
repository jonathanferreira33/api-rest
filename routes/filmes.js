const express = require('express');
const router = express.Router();
// const mysql = require('../mysql').pool;
const multer = require('multer');

const login = require('../middleware/login')

const FilmesController = require('../controllers/filmes-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
            cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
})

const fileFilter = (req, file, cb) => { //objeto para analisar e determinar tipos aceitos
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ //objeto para analisar tamanho max aceito
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //valor em bytes, 5mb
    },
    fileFilter: fileFilter
    
});


router.get('/', FilmesController.getFilmes);

router.post(
    '/',
    login.obrigatorio,
    upload.single('imagem_poster'),
    FilmesController.postFilmes
);

router.get('/:id_filmes', FilmesController.getFilmeId);

router.patch(
    '/',
    login.obrigatorio,
    FilmesController.updateFilme
);

router.delete(
    '/',
    login.obrigatorio,
    FilmesController.deleteFilme
);

module.exports = router;