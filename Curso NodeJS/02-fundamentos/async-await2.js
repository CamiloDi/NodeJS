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

let getEmpleado = async(id)=>{

        let empleadoDB= empleados.find(empleado => empleado.id===id )
 
        if(!empleadoDB){
            throw new Error(`No existe un empleado con el ID ${id}`);
        }else{
            return empleadoDB;
        }
 };
 let getSalario =async (empleado)=>{

        let salarioDB= salarios.find(salario => salario.id===empleado.id )
 
        if(!salarioDB){
            throw new Error(`No existe un salario para el empleado ${empleado.nombre}`)
        }else{
            return {id:salarioDB.id,
                     nombre:empleado.nombre,
                     salario:salarioDB.salario};
        }

 };

 let getInfo=async(id)=>{
    let empleado = await getEmpleado(id);
    let resp= await getSalario(empleado);
    return resp;
 };
     getInfo(2)
            .then(mensaje=>{console.log(mensaje);})
            .catch(err=>{console.log(err);})