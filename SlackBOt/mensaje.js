const objetoDatos = require('./data/datos.json');
const bcrypt = require('bcrypt');
const SlackBot = require("slackbots");
const config = require('./config/config');
var bot = new SlackBot(config.bot);


let buscarEsquemas = function() {
    let mensaje = '*Esquemas:* \n';
    let totalEsq = objetoDatos.Esquemas.length;
    for (let i = 0; i < totalEsq; i++) {
        mensaje += `${objetoDatos.Esquemas[i].nom} | ${objetoDatos.Esquemas[i].desc}\n`
    }
    return mensaje;
}

let buscarServidores = function() {
    let mensaje = '*Producción:* \n';
    let totalServ = objetoDatos.Servidores.Produccion.length;
    for (let i = 0; i < totalServ; i++) {
        mensaje += `${objetoDatos.Servidores.Produccion[i].desc} | ${objetoDatos.Servidores.Produccion[i].ip}\n`
    }
    mensaje += '*QA:* \n';
    totalServ = objetoDatos.Servidores.QA.length;
    for (let i = 0; i < totalServ; i++) {
        mensaje += `${objetoDatos.Servidores.QA[i].desc} | ${objetoDatos.Servidores.QA[i].ip}\n`
    }
    mensaje += '*Desarrollo:* \n';
    totalServ = objetoDatos.Servidores.Desarrollo.length;
    for (let i = 0; i < totalServ; i++) {
        mensaje += `${objetoDatos.Servidores.Desarrollo[i].desc} | ${objetoDatos.Servidores.Desarrollo[i].ip}\n`
    }
    return mensaje;
}

let buscarVDI = function() {
    let mensaje = '*VDI QA:* \n';
    let totalVDI = objetoDatos.VDI.length;
    for (let i = 0; i < totalVDI; i++) {
        mensaje += `IP: ${objetoDatos.VDI[i].ip} | Usuario: ${objetoDatos.VDI[i].usuario} | Password: ${objetoDatos.VDI[i].password}\n`
    }
    return mensaje;
}

let buscarConexiones = function() {
    let mensaje = '*Conexiones Desarrollo:* \n';
    let totalCon = objetoDatos.Conexiones.length;
    for (let i = 0; i < totalCon; i++) {
        mensaje += `IP: ${objetoDatos.Conexiones[i].ip} | Usuario: ${objetoDatos.Conexiones[i].usuario} | Password: ${objetoDatos.Conexiones[i].password}\n`
    }
    return mensaje;
}

let buscarAnexos = function(nombre, apellido) {
    let mensaje = '';
    if (nombre == undefined && apellido == undefined) {
        mensaje = '*Anexos:* \n';
        let totalCon = objetoDatos.Anexos.length;
        for (let i = 0; i < totalCon; i++) {
            mensaje += `Nombre: *${objetoDatos.Anexos[i].nombre}* | Anexo: *${objetoDatos.Anexos[i].numero}* \n`
        }
        return mensaje;
    } else {
        nombre = capitalize(nombre);
        if (apellido != undefined) apellido = capitalize(apellido);
        else apellido = '';
        let nombreCompleto = `${nombre} ${apellido}`;
        let index = objetoDatos.Anexos.findIndex(anexo => anexo.nombre === nombreCompleto);
        if (index >= 0) {
            mensaje = `Nombre: *${objetoDatos.Anexos[index].nombre}* | Anexo: *${objetoDatos.Anexos[index].numero}* `;
            return mensaje;
        } else {
            mensaje = '*Anexos:* \n';
            let totalCon = objetoDatos.Anexos.length;
            for (let i = 0; i < totalCon; i++) {
                mensaje += `Nombre: *${objetoDatos.Anexos[i].nombre}* | Anexo: *${objetoDatos.Anexos[i].numero}* \n`
            }
            return mensaje;
        }

    }

}

let buscarClaves = function(usuario) {
    usuario.real_name_normalized = 'Angelica';
    let mensaje = ''; //'*Claves:* \n';
    let index = objetoDatos.Claves.findIndex(clave => clave.nombre === usuario.real_name_normalized);

    if (index >= 0) { //El usuario Existe
        let totalCon = objetoDatos.Claves[index].claves.length;
        mensaje = `${usuario.real_name_normalized},  cual es tu contraseña?`;
        let x = await consultar(usuario, mensaje);
        console.log(x);
        /*   
        for (let i = 0; i < totalCon; i++) {
            mensaje += `${objetoDatos.Claves[index].claves},\n`; //`${objetoDatos.Claves[i].nombre}, cual es tu contraseña?\n`
        }*/
        return mensaje;
    } else { //No existe el Usuario
        mensaje = `El usuario ${usuario.real_name_normalized}, no posee claves`;
        return mensaje;
    }

}


let consultar = async(usuario, mensaje) => {
    bot.postMessageToUser(usuario.name, mensaje).then(function() {
        bot.on("message", function(data) {
            if (data.type !== "message" || data.user !== usuario.id) {
                return;
            }
            return data;
        });
    })
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}







module.exports = {
    buscarEsquemas,
    buscarServidores,
    buscarVDI,
    buscarConexiones,
    buscarAnexos,
    buscarClaves
}