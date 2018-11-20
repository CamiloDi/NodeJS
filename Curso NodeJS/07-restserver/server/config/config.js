//==================
//Puerto
//==================

process.env.PORT=process.env.PORT||3000;

//==================
//Entorno
//==================
process.env.NODE_ENV = process.env.NODE_ENV||'dev';

//==================
//Base de Datos
//==================
let urlDB;

if(process.env.NODE_ENV==='dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB='mongodb://cafe-user:Warcraft.3@ds037824.mlab.com:37824/cafe';
}
process.env.URLDB=urlDB;



