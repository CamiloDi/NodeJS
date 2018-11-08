const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const argv = require('yargs').options({
    direccion:{
        alias:'d',
        desc:'Direccion de la ciudad para obtener el clima',
        demand:true
    }
}).argv;

let getInfo =async (direccion)=>{
    try{
        let coors = await lugar.getLugarLAtLng(direccion);

    let temp = await clima.getClima(coors.lat,coors.lng);
    return `La temperatura en ${coors.direccion}, es de ${temp}°C.`;
    }catch(e){
        return `no se pudo determinar el clima en ${direccion}.`;
    }
}
getInfo(argv.direccion)
    .then(mensaje=>{console.log(mensaje)})
    .catch(e=>{console.log(e)})

// lugar.getLugarLAtLng(argv.direccion)
//         .then(resp=>{
            
//         })
//         .catch(e=>console.log(e))
// //console.log(argv.direccion);
// clima.getClima(resp.lat,resp.lng)
//         .then(temp=>console.log(`La temperatura en ${resp.direccion}, es de ${temp}°C`))
//         .catch(e=>console.log(e));


