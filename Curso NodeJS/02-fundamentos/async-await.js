// let getNombre = async()=>{
//     return 'Camilo';
// };


let getNombre = ()=>{
    return new Promise( (resolve,reject)=>{

        setTimeout(() => {
            resolve('Camilo');
        }, 3000);
        
    });
}

let saludo= async()=>{
    //console.log(new Date());
    let nombre = await getNombre();
    
    return `hola ${nombre}`;
}

saludo().then(mensaje=>{
    //console.log(new Date());
    console.log(mensaje);
}).catch(e=>{
    console.log('Error de AWAIT',e);
})