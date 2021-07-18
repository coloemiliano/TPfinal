const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const miembrosM = require('./../../modelos/miembrosM')
const adminABM = require('./../../modelos/miembrosABM')

const get = async(req,res) => {
    const miembros = await miembrosM.getall();
    console.log(miembros)
    res.render('adminMiembros', {miembros});
}

const showAgregar = async (req, res) => {
    const rolzvz = await adminABM.get();
    console.log(rolzvz);
    res.render('agregarMiembro', {rolzvz});
}
const agregar = async (req, res) => {
    const miembrosA = req.body;
    const miembroFinal =  {
        usuario : miembrosA.miembro,
        Rango : miembrosA.Rango,
        contraseña : sha1(miembrosA.contraseña),
        Rol_principal : miembrosA.Rol_principal,
    }
    const agregado = await adminABM.create(miembroFinal);
    res.redirect('/admin/adminMiembros');
}
const editarM = async (req, res) => {
    const {id} = req.params;
    const usuario = req.body;
    console.log(usuario);
    const {insertId} = await adminABM.editar(id, usuario);
    console.log(insertId);
    res.redirect('/admin/adminMiembros');
}
const showEditar = async (req, res) => {
    const {id} = req.params;
    const [usuario] = await miembrosM.getsingle(id);
    const rolzvz = await adminABM.get();
    res.render('editarMiembro', {usuario, rolzvz});
}
const del = async (req, res) => {
    const {id} = req.params;
    const {insertId} = await adminABM.eliminar(id);
    console.log(insertId);
    res.redirect('/admin/adminMiembros');
}
router.get('/', get);
router.get('/agregar', showAgregar);
router.post('/agregar', agregar);
router.get('/editar/:id', showEditar);
router.post('/editar/:id', editarM);
router.get('/eliminar/:id', del);
module.exports = router;