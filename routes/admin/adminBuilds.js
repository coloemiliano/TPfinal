const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = { dest: './public/tmp'};
const upload = multer(config);
const service  = require('./../../service/buildS');
const model = require('./../../modelos/buildsM');

const create = async (req, res) => {
    console.log(req.body, req.file);
    const idImg = await service.crearBuild(req.body, req.file);
    res.redirect('/admin/adminBuilds');
}

const showAgregar = async (req, res) => {
    const rolzvz = await model.get();
    console.log(rolzvz);
    res.render('adminCrearBuild', {rolzvz});
}

const getAll = async (req, res) => {
    const builds = await model.getall();
    console.log(builds);
    res.render('adminBuilds', {builds})
}
const del = async (req, res) => {
    const {id} = req.params;
    const msgBuilds = await model.deletebuild(id);
    const msgImgBuilds = await model.deleteImg(id);
    res.redirect('/admin/adminBuilds');
}
const editarBU = async (req, res) => {
    const {id} = req.params;
    const buildE = req.body;
    console.log(buildE);
    const {insertId} = await service.editarBuild(id, buildE, req.file);
    console.log(insertId);
    res.redirect('/admin/adminBuilds');
}
const getEditar = async (req, res) => {
    const [build] = await model.getsingle(req.params.id);
    const rolzvz = await model.get();
    console.log(build);
    res.render('editarBuild', {build, rolzvz})
}


router.get('/crear', showAgregar)
router.post('/crear', upload.single("imagen"), create);
router.get('/', getAll);
router.get('/eliminar/:id', del);
router.get('/update/:id', getEditar);
router.post('/update/:id', upload.single("imagen"), editarBU);
module.exports = router;