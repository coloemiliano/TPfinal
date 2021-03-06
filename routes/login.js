  
const express = require('express');
const router = express.Router();
const {auth} = require('../modelos/miembrosABM')
const sha1 = require('sha1');

const showLogin = (req, res) => res.render('login', {mensaje : ''});

const loginAdmin = async (req, res) => {
    let {username, pass} = req.body;
    pass = sha1(pass);
    const logged = await auth(username, pass);
    if (logged.length === 0) {
        res.render('login', {mensaje: 'Usuario o pass incorrectos'});
    }
    else {
        const [{id, admin}] = logged;
        req.session.user = id;
        req.session.admin = admin;
        res.redirect('/admin');

    }
}
router.get('/', showLogin);
router.post('/', loginAdmin);
module.exports = router;