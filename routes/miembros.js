const express = require('express');
const router = express.Router();
const {getall,getsingle} = require ('./../modelos/miembrosM')

const mostrarM = async(req,res) => {
    const miembros = await getall();
    console.log(miembros)
    res.render('miembros', {miembros});
}
const mostrarUN = async(req,res) => {
    const id = req.params.id;
    const [miembro] = await getsingle(id);
    res.render('usuario', {miembro});
}   
    



router.get('/', mostrarM)
router.get('/single/:id', mostrarUN)
module.exports = router;