const mysql = require('mysql2');

// =====================================
// SINGLETON DB
// =====================================

const conexion = mysql.createConnection({

  host: 'localhost',

  user: 'root',

  password: '',

  database: 'nutriscan_db'

});

conexion.connect((err) => {

  if (err) {

    console.log(err);
    return;

  }

  console.log('MySQL conectado');

});

// =====================================
// EXPORTAR CONEXION
// =====================================

module.exports = conexion;