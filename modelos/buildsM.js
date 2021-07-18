const pool = require('../utils/basededatos')
const T_rolzvz = "rolzvz"
const T_builds = "buildzvz"
const Tbuildsimg = "imgbuildzvz"

const getall= async() => {
    const query = "SELECT b.id_build, b.Arma_principal, r.Rol_zvz, ib.uid FROM ?? AS b JOIN ?? AS r ON b.Rol_build = r.id_rol JOIN ?? AS ib WHERE b.eliminado = 0 AND b.id_build=ib.id_build";
    const params = [T_builds,T_rolzvz,Tbuildsimg];
    return await pool.query(query, params);    
}
const get = async() =>{
    const query = "SELECT * FROM ??"
    const params = [T_rolzvz];
    return await pool.query(query, params)
}

const getsingle = async(id) => {
    const query = "SELECT b.id_build, b.Arma_principal, r.Rol_zvz, ib.uid FROM ?? AS b JOIN ?? AS r ON b.Rol_build = r.id_rol JOIN ?? AS ib ON b.id_build = ib.id_build WHERE b.id_build = ? AND b.eliminado = 0"
    const params = [T_builds,T_rolzvz,Tbuildsimg,id];
    return await pool.query(query, params);
}

const crear = (obj) => 
    pool.query("INSERT INTO ?? SET ?", [T_builds, obj]).then(response => response).catch(err => console.error(err));

const crearImagen = (obj) =>
    pool.query("INSERT INTO ?? SET ?", [Tbuildsimg, obj]).then(response => response).catch(err => console.error(err));

    const deletebuild = async(id) => {
        try {
            const query = "UPDATE ?? SET eliminado = 1 WHERE id_build = ?";
            const params = [T_builds, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    const deleteImg = async(id) => {
        try {
            const query = "UPDATE ?? SET eliminado = 1 WHERE id_build = ?";
            const params = [Tbuildsimg, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    const editar = async(id, obj) => {
        try {
            const query = "UPDATE ?? SET ? WHERE id_build = ?";
            const params = [T_builds, obj, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    
    const editarImagen = async(id, obj) => {
        try {
            const query = "UPDATE ?? AS ib SET ? WHERE ib.id_build = ?";
            const params = [Tbuildsimg, obj, id];
            return await pool.query(query, params);
        } catch (error) {
            console.error(error);
        }
    }
    const getRol = async(rol) => {
        const query = "SELECT b.id_build, b.Arma_principal, r.Rol_zvz, ib.uid FROM ?? AS b JOIN ?? AS r ON b.Rol_build = r.id_rol JOIN ?? AS ib ON b.id_build = ib.id_build WHERE r.Rol_zvz LIKE ? AND b.eliminado = 0"
        const params = [T_builds,T_rolzvz,Tbuildsimg,rol];
        return await pool.query(query, params);
    }



    module.exports = {getall,crear,crearImagen,editar,editarImagen,deletebuild,deleteImg,getsingle, get, getRol}

