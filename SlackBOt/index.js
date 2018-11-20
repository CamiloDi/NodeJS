const SlackBot = require("slackbots");
//const fs = require('fs');
const datos = require('./data/datos.json');
const config = require('./config/config');
const respuesta = require('./mensaje');
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
var app = express();
let user = "";
let listaUsuarios = [];

var bot = new SlackBot(config.bot);

bot.on("start", function() {

    app.use(session({ secret: '123456', resave: true, saveUninitialized: true }))

    console.log(app.get('saveUninitialized'));
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
        user = listaUsuarios[index];
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
                bot.postMessageToUser(user.name, 'Hola!, en que te puedo ayudar? :grin:');
                break;
            case 'como estas?':
                bot.postMessageToUser(user.name, 'Mejor que tu');
                break;
            default:
                bot.postMessageToUser(user.name, 'No entendi lo que me pediste :thinking_face:');
        }
    }
}

function BuscarJson(criteroBusqueda) {

    let mensaje = '';
    let arregloMensaje = criteroBusqueda.split(' ');


    switch (arregloMensaje[0]) {
        case 'esquemas':
            mensaje = respuesta.buscarEsquemas();
            bot.postMessageToUser(user.name, mensaje);
            break;
        case 'servidores':
            mensaje = respuesta.buscarServidores();
            bot.postMessageToUser(user.name, mensaje)
            break;
        case 'vdi':
            mensaje = respuesta.buscarVDI();
            bot.postMessageToUser(user.name, mensaje)
            break;
        case 'conexiones':
            mensaje = respuesta.buscarConexiones();
            bot.postMessageToUser(user.name, mensaje)
            break;
        case 'anexos':
            mensaje = respuesta.buscarAnexos(arregloMensaje[1], arregloMensaje[2]);
            bot.postMessageToUser(user.name, mensaje)
            break;
        case 'clave':
            mensaje = respuesta.buscarClaves(user);
            bot.postMessageToUser(user.name, mensaje)
            break;
        default:
            bot.postMessageToUser(user.name, 'No pude encontrar lo que me pediste :disappointed:');
    }
}