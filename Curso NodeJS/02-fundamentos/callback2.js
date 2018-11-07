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

let getEmpleado = (id,callback)=>{
   let empleadoDB= empleados.find(empleado => empleado.id===id )

    if(!empleadoDB){
        callback(`No existe un empleado con el ID ${id}`);
    }else{
        callback(null,empleadoDB);
    }

   //console.log(empleadoDB.nombre);
};



let getSalario =(empleado,callback)=>{

    getEmpleado(empleado.id,(err)=>{

        if(err){
            return console.log(err);
        }
        let salarioDB= salarios.find(salario => salario.id===empleado.id )

        if(!salarioDB){
            callback(`No existe un salario para el empleado ${empleado.nombre}`);
        }else{
            let salarioFormato={
                nombre:empleado.nombre,
                salario:salarioDB.salario
            }
            callback(null,salarioFormato);
        }

       
    });


};

// getEmpleado(1,(err,empleado)=>{

//     if(err){
//         return console.log(err);
//     }
//     console.log(empleado);
// });

getSalario(empleados[2],(err,empleado)=>{

         if(err){
             return console.log(err);
         }
         console.log(empleado);
     });