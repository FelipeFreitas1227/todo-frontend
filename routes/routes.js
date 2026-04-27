const express = require('express');
const router = express.Router();
const modeloTarefa = require('../models/tarefa');


router.post('/post', async (req, res) => {
    const objetoTarefa = new modeloTarefa({
        descricao: req.body.descricao,
        statusRealizada: req.body.statusRealizada
    });

    try {
        const tarefaSalva = await objetoTarefa.save();
        res.status(200).json(tarefaSalva);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const resultados = await modeloTarefa.find();
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await modeloTarefa.findByIdAndDelete(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dadosAtualizados = req.body;
        const opcoes = { new: true }; 

        const resultado = await modeloTarefa.findByIdAndUpdate(
            id, 
            dadosAtualizados, 
            opcoes
        );

        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;