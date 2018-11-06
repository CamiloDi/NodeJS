const argv= require('./config/yargs').argv;
const colors = require('colors');

const {
    crearArchivo,listarTabla
} = require('./multiplicar/multiplicar')

let comando = argv._[0];

switch(comando){
    case 'listar':
    listarTabla(argv.base,argv.limite)
                        .then(tabla=>console.log(tabla.red))
                        .catch(err=>console.log(err));
    break;

    case 'crear':
    crearArchivo(argv.base,argv.limite)
    .then(archivo => console.log(`archivo creado ${colors.green(archivo)}`.red))
   .catch(err => console.log(err));
    break;

    default:
    console.log('comando no reconocido');
}

// console.log(argv.base);




