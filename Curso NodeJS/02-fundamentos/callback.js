// setTimeout(() => {
//     console.log('hola');
// }, 3000);

let getUsuarioById =(id,callback)=>{

    let usuario={
        nombre:'camilo',
        id
    }

    if(id===20){
        callback(`El usuario de id ${id}, no existe en la BD`);
    }
    else{
        callback(null,usuario);
    }


}

getUsuarioById(10,(err,usuario)=>{

    if(err){
      return  console.log(err);
    }
   console.log(`usuario de bd:`,usuario); 
});