const express = require("express");
const { json } = require("express/lib/response");
const route = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hola123',
    database: 'creditos'
});

connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Conexion establecida con la BD");
    }
})

route.get('/', (req, res)=>{
    res.send('Server Corriendo');
})

route.post('/api/users', (req, res)=>{
    let nombre = req.body.nombre;
    let direccion = req.body.direccion;
    let edad = req.body.edad;
    let genero = req.body.genero;
    let insertQuery = `INSERT INTO usuario(nombre, direccion, edad, genero) VALUES ('${nombre}', '${direccion}', ${edad}, '${genero}')`;
 
    connection.query(insertQuery, (err, result)=>{
        if(err){
            res.status(500).json({
                response: null,
                msg: 'Ocurrio un error al ejecutar la consulta en la BD'
            });
        }else{
            res.status(200).json({
                response: result,
                msg: 'consulta ejecutada'
            });
        }
    }); 
});

route.get('/api/users', (req, res)=>{
    let consultQuery = "SELECT * FROM usuario";
    connection.query(consultQuery, (err, result)=>{
        if(err){
            res.status(500).json({
                response: null,
                msg: 'Ocurrio un error al ejecutar la consulta en la BD'
            });
        }else{
            res.status(200).json({
                response: result,
                msg: 'consulta ejecutada'
            });
        }
    })
})

module.exports = route;


