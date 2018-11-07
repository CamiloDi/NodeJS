const descripcion ={
        demand: true,
        alias: 'd',
        desc : 'descripcion de la tarea'
    
}
const   completado= {
        alias: 'c',
        default: true,
        desc : 'descripcion de la tarea'
    
}

const argv = require('yargs')
    //.command('listar', 'Imprime en consola la tabla de multiplicar', opts)
    .command('crear', 'Crear elemento por hacer', {descripcion})
    .command('actualizar', 'Actualizar el estado completado de una tarea', {descripcion,completado})
    .command('borrar', 'borra elemento por hacer', {descripcion})
    .help()
    .argv;

module.exports={
    argv
}