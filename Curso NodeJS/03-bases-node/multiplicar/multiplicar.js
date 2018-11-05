//Requireds

const fs = require('fs');

//module.exports.crearArchivo

let crearArchivo = (base)=>{

    return new Promise((resolve,reject)=>{
        if(!Number(base)){
            reject(`El valor ingresado: ${base}, no es un numero`);return;
        }
        let data='';

        for(let i=0;i<11;i++){
         data+=`${base}*${i}=${base*i}\n`;
            
        }
        fs.writeFile('tablas/tabla-'+base+'.txt', data, (err) => {
            if (err) reject(err);
            else
            resolve(`tabla-${base}.txt`)
          });

    });
}
module.exports={crearArchivo}



