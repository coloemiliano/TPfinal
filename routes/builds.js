const express = require('express');
const router = express.Router();
const {getsingle, getall, getRol} = require ('./../modelos/buildsM')

const mostrarTB = async(req,res) => {
    const Tbuilds = await getall();
    console.log(Tbuilds)
    res.render('builds', {Tbuilds});
} 
const mostrarB = async(req,res) => {
    const id = req.params.id;
    console.log(id)
    const [builds] = await getsingle(id);
    res.render('Rbuild', {builds});
}   
const buscador = async(req, res) => {
    let {aBuscar} = req.body;
    aBuscar = '%' + aBuscar + '%';
    const Tbuilds = await getRol(aBuscar);
    console.log(Tbuilds);
    res.render('builds', {Tbuilds});
}

router.get('/', mostrarTB)
router.post('/', buscador);
module.exports = router;