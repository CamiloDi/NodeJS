
const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos={
    values:['ADMIN','USER'],
    message:'{VALUE} no es un rol válido.'
}

let usuarioSchema= new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        unique:true,
        index: true,
        required:[true, 'El Correo es necesario']
    },
    password:{
        type:String,
        required:[true, 'La Contrseña es necesaria']
    },img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'USER',
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    }
});

usuarioSchema.methods.toJSON= function(){
    let user=this;
    let userObject= user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe ser único.'})
module.exports=mongoose.model('Usuario',usuarioSchema);
