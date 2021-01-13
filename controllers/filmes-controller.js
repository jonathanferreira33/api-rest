const express = require('express');

const mysql = require('../mysql').pool;



exports.getFilmes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM filmes;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    filmes: result.map(film => {
                        return {
                            id_filmes: film.id_filmes,
                            titulo: film.titulo,
                            ano: film.ano,
                            categoria : film.id_categoria,
                            imagem_poster : film.imagem_poster,
                            request: {
                                tipo: 'GET',
                                descricao: 'retorna todos os filmes',
                                url: 'http://127.0.0.1:3000/filmes/' 
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        )
    });
}

exports.postFilmes = (req, res, next) => {
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(501).send({ error: error}) } // retorna o erro da conexao
        conn.query(
            'INSERT INTO filmes (titulo, ano, id_categoria, imagem_poster) VALUES (?,?,?,?);',
            [   req.body.titulo,
                req.body.ano,
                req.body.id_categoria,
                req.file.path
            ],
            (error, result, field) => {
                conn.release(); // para que não ocorra exintão de conexões 

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Filme catalogado com sucesso',
                    filmeCatalogado: {
                        id_filmes: result.id_filmes,
                        titulo: req.body.titulo,
                        ano: req.body.ano,
                        categoria : req.body.id_categoria,
                        imagem_poster: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Lista de filmesimagem_poster',
                            url: 'http://127.0.0.1:3000/filmes'
                        }
                    }   
                }
                return res.status(201).send(response);
            }
        )
    });
};

exports.getFilmeId = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM filmes WHERE id_filmes = ?;',
            [req.params.id_filmes],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if(result.length == 0){ // tratamento para id inexistente
                    return res.status(404).send({
                        mensagem: 'Filme inexistente'
                    })
                }
                const response = {
                    filme: {
                        id_filmes: result[0].id_filmes,
                        titulo: result[0].titulo,
                        ano: result[0].ano,
                        categoria : result[0].id_categoria,
                        imagem_poster : result[0].imagem_poster,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um filme especifico',
                            url: 'http://127.0.0.1:3000/filmes' 
                        }
                    }   
                }
                return res.status(200).send(response);
            }
        )
    });
};

exports.updateFilme = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) } // retorna o erro da conexao
        conn.query(
            `UPDATE filmes SET titulo=?, ano=?, id_categoria=? WHERE id_filmes = ?`,
            [
                req.body.titulo,
                req.body.ano,
                req.body.id_categoria,
                req.body.id_filmes
                
            ],
            (error, result, field) => {
                conn.release(); // para que não ocorra exintão de conexões 

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Filme catalogado com sucesso',
                    filmeAtualizado: {
                        id_filmes: req.body.id_filmes,
                        titulo: req.body.titulo,
                        ano: req.body.ano,
                        categoria : req.body.id_categoria,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um filme especifico',
                            url: 'http://127.0.0.1:3000/filmes' + req.body.id_filmes
                        }
                    }   
                }
                return res.status(202).send(response);
            }
        )
    });
};

exports.deleteFilme = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) } // retorna o erro da conexao
        conn.query(
            `DELETE FROM filmes WHERE id_filmes=?;`,
            [req.body.id_filmes],

            (error, resultado, field) => {
                conn.release(); // para que não ocorra exintão de conexões 

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Filme excluido',
                    request: {
                        tipo: 'POST',
                        descricao: 'Lista de filmes',
                        url: 'http://127.0.0.1:3000/filmes',
                        body: {
                            titulo: 'String',
                            ano: 'Number',
                            categoria: 'Number'
                        } 
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};