const pool = require('../utils/basededatos')
const T_paradise = "paradise"
const T_rolzvz = "rolzvz"

const getall= async() => {
    const query = "SELECT p.id_miembro, p.usuario, p.Rango, r.Rol_zvz FROM ?? AS p JOIN ?? AS r ON p.Rol_principal = r.id_rol WHERE p.eliminado = 0";
    const params = [T_paradise,T_rolzvz];
    return await pool.query(query, params);    
}

const getsingle = async(id) => {
    const query = "SELECT p.id_miembro, p.usuario, r.Rol_zvz, p.Rango, p.Rol_principal FROM ?? AS p JOIN ?? AS r ON p.Rol_principal = r.id_rol WHERE p.id_miembro = ? AND p.eliminado = 0"
    const params = [T_paradise,T_rolzvz, id];
    return await pool.query(query, params);
}


module.exports = {getall,getsingle}