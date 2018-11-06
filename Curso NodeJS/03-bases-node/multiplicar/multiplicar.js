//Requireds

const fs = require('fs');

//module.exports.crearArchivo

let listarTabla = (base, limite)=>{
return new Promise((resolve,reject)=>{
    if(!Number(base)){
        reject(`El valor ingresado de la base: ${base}, no es un numero`);return;
    }
    if(!Number(limite)){
        reject(`El valor ingresado del limite : ${base}, no es un numero`);return;
    }
    let data='';

        for(let i=0;i<=limite;i++){
         data+=`${base}*${i}=${base*i}\n`;
            
        }
        resolve(`${data}`);
});
}


let crearArchivo = (base,limite=10)=>{
    return new Promise((resolve,reject)=>{
        if(!Number(base)){
            reject(`El valor ingresado: ${base}, no es un numero`);return;
        }
        if(!Number(limite)){
            reject(`El valor ingresado del limite : ${base}, no es un numero`);return;
        }
        let data='';

        for(let i=0;i<=limite;i++){
         data+=`${base}*${i}=${base*i}\n`;
            
        }
        fs.writeFile('tablas/tabla-'+base+'.txt', data, (err) => {
            if (err) reject(err);
            else
            resolve(`tabla-${base}.txt`)
          });

    });
}
module.exports={crearArchivo,listarTabla}



