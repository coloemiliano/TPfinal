const pool = require('../utils/basededatos')
const T_paradise = "paradise"
const T_rolzvz = "rolzvz"

const get = async() =>{
    const query = "SELECT * FROM ??"
    const params = [T_rolzvz];
    return await pool.query(query, params)
}

const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [T_paradise, obj];
    return await pool.query(query, params);
}

const eliminar = async(id) => {
    const query = "UPDATE ?? SET eliminado = 1 WHERE id_miembro = ?"
    const params = [T_paradise, id];
    return await pool.query(query, params);
}
const editar = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id_miembro = ?";
    const params = [T_paradise, obj, id];
    return await pool.query(query, params);
}

const auth = async(username, pass) => {
    const query = "SELECT id_miembro, admin FROM ?? WHERE usuario = ? AND contraseña = ? AND habilitado = 1 AND eliminado = 0 AND admin = 1";
    const params = [T_paradise, username, pass];
    return await pool.query(query, params);
}


module.exports = {get, create, eliminar, editar,auth};