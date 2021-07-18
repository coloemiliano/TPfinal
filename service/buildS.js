const {crear,crearImagen,editar,editarImagen} = require('./../modelos/buildsM');
const {imgFile} = require('./../utils/fileHandler');

const crearBuild = async(body, file) => {
    try {
        const {insertId : id_build} = await crear(body);
        const uid = imgFile(file);
        const obj = {id_build, uid};
        const {insertId : idImg} = await crearImagen(obj);
        return idImg;
    } catch (error) {
        console.error(error);
    }
}
const editarBuild = async(id, body, file) => {
    try {
        const id_build = await editar(id,body);
        if (file){
            const uid = imgFile(file);
            const obj = {uid};
            const idImg = await editarImagen(id, obj);
            return idImg;
        }
        else{
            return id_build;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = {crearBuild, editarBuild}