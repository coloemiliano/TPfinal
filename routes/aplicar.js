const express = require('express');
const router = express.Router();
const { send } = require ('./../service/mail');

const showAplicar = (req, res) => {
    res.render('aplicar')
};

const aplicar = (req, res) => {
const {body: usuario} = req;
console.log(usuario);
send (usuario.mail,`Gracias ${usuario.name} por aplicar a Paradise`,'<h2>Aca te dejamos el link de <a href="https://discord.gg/S9PHw8ekwh">discord</a> para que veas los requicitos y puedas entrar a nuestro gremio</h2>');
res.redirect('/');
}



router.get('/', showAplicar);
router.post('/mandar', aplicar);
module.exports = router;