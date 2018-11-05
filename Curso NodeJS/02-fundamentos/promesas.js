let empleados = [{
    id:1,
    nombre:'camilo'
},{
    id:2,
    nombre:'catalina'
},{
    id:3,
    nombre:'carlos'
}];

let salarios=[{
    id:1,
    salario:1000
},{
    id:2,
    salario:2000
}];

let getEmpleado = (id)=>{

    return new Promise((resolve,reject)=>{

        let empleadoDB= empleados.find(empleado => empleado.id===id )
 
        if(!empleadoDB){
            reject(`No existe un empleado con el ID ${id}`);
        }else{
            resolve(empleadoDB);
        }

    });
 };
 let getSalario =(empleado)=>{

    return new Promise((resolve,reject)=>{

        let salarioDB= salarios.find(salario => salario.id===empleado.id )
 
        if(!salarioDB){
            reject(`No existe un salario para el empleado ${empleado.nombre}`)
        }else{
            resolve({id:salarioDB.id,
                     nombre:empleado.nombre,
                     salario:salarioDB.salario});
        }

    });
 };


//  getEmpleado(3).then(empleado=>{
//      //console.log('empleado de BD',empleado);
//     getSalario(empleado).then(empleadoSalario=>{
//         console.log(empleadoSalario);
//     },(err)=>{
//         console.log(err);
//     })

//  },(err)=>{
//      console.log(err);
//  });


getEmpleado(3).then(empleado=>{
    
return getSalario(empleado);

}).then( resp=>{

    console.log(resp);
}).catch(err=>{
    console.log(err);
});
 