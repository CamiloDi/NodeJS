const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');
//console.log(argv);


let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea=porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        for(let tarea of listado){
            console.log('=======Por Hacer========'.green);
            console.log(tarea.desc);
            if(tarea.completado)
            console.log('Estado: ',colors.blue(tarea.completado));
            else
            console.log('Estado: ',colors.red(tarea.completado));
            console.log('========================'.green);
        }
        
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion,argv.completado);
        if(actualizado)console.log('Se Actualizo la lista de tareas'.blue);
        else console.log('No se actulizo nada.'.red);
        break;
        case 'borrar':
        let borrado=porHacer.borrar(argv.descripcion);
        if(borrado)console.log('Se borro de la lista de tareas'.blue);
        else console.log('No se borro nada.'.red);
        break; 
    default:
        console.log('Comando no reconocido');
}
