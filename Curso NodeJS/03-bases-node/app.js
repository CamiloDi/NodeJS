const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: 'l',
            default: 10
        }
    })
    .help()
    .argv;

const {
    crearArchivo
} = require('./multiplicar/multiplicar')



let argv2 = process.argv;

// let param= argv[2];
// let base =param.split('=')[1];


crearArchivo(base)
    .then(archivo => console.log(`archivo creado ${archivo}`))
    .catch(err => console.log(err));