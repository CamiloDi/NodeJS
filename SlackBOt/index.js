const SlackBot = require("slackbots");
const fs = require('fs');
const datos = require('./data/datos.json');

let user = "";
let listaUsuarios = [];

var bot = new SlackBot({
    token: "xoxb-441306192277-466081881904-fcO2YDRKnOFHO1DnLnjbkkwD",
    name: "Mr. Test-Bot"
});
bot.on("start", function() {
    let datosUsuarios = bot.getUsers();
    listaUsuarios = datosUsuarios._value.members;
    //console.log(listaUsuarios[0]);

});

bot.on("message", function(data) {
    if (data.type !== "message") {
        return;
    }
    let userID = data.user;
    if (validaUsuario(userID)) {
        responder(data.text.toLowerCase());
    }

});

function validaUsuario(userID) {
    let index = listaUsuarios.findIndex(usuario => usuario.id === userID);

    if (index >= 0) {
        user = listaUsuarios[index].name;
        return true;
    } else if (userID != undefined) {
        console.log(index, userID);
        console.log('usuario no encontrado! :(');
        return false;
    }
}

function responder(mensajeRecibido) {
    let arregloMensaje = mensajeRecibido.split(' busca ');
    let index = arregloMensaje.findIndex(texto => texto === 'vsbot');
    //console.log(mensajeRecibido);
    if (index >= 0) {
        BuscarJson(arregloMensaje[index + 1]);
    } else {
        switch (mensajeRecibido) {
            case 'hola':
                bot.postMessageToUser(user, 'Hola!, en que te puedo ayudar? :grin:');
                break;
            case 'como estas?':
                bot.postMessageToUser(user, 'Mejor que tu');
                break;
            default:
                bot.postMessageToUser(user, 'No entendi lo que me pediste :thinking_face:');
        }
    }
}

function BuscarJson(criteroBusqueda) {
    let objetoDatos = datos; //leerArchivo();
    //bot.postMessageToUser(user, objetoDatos);
    let mensaje = '';
    switch (criteroBusqueda) {
        case 'esquemas':
            mensaje = '*Esquemas:* \n';
            let totalEsq = objetoDatos.Esquemas.length;
            for (let i = 0; i < totalEsq; i++) {
                mensaje += `${objetoDatos.Esquemas[i].nom} | ${objetoDatos.Esquemas[i].desc}\n`
            }
            bot.postMessageToUser(user, mensaje);
            break;
        case 'servidores':
            mensaje = '*Producción:* \n';
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
            bot.postMessageToUser(user, mensaje)
            break;
        default:
            bot.postMessageToUser(user, 'No pude encontrar lo que me pediste :disappointed:');
    }
}

function leerArchivo() {
    return JSON.parse(fs.readFile('./data/datos.json', 'utf8'));
}