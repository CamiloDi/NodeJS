const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar!');
    });
}
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (desc) => {
    cargarDB();
    let porHacer = {
        desc,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
const getListado = () => {
    cargarDB();
    if (listadoPorHacer.length == 0) console.log('Sin Tareas Por Hacer!')
    return listadoPorHacer;
}

const actualizar = (desc, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.desc === desc);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }

}
const borrar =(desc)=>{
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea=>{
        return tarea.desc !== desc;
    });

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}