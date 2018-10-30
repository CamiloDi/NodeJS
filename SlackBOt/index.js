'use strict';
var SlackBot = require("slackbots");
var fs = require('fs');
var channel = "pruebasbot"
var user="UCYTNCWR2";
    var bot = new SlackBot({
        token: "xoxb-441306192277-466081881904-fcO2YDRKnOFHO1DnLnjbkkwD",
        name: "Mr. Bot"
    });
    bot.on("start", function() {
      //bot.postMessageToChannel(channel, "Hello world!");
      //console.log("Hello world!");
  });

  bot.on("message", function(data) {
    if (data.type !== "message") {
      return;
  }
  
  handleMessage(data);
  });

  function handleMessage(data) {
    //console.log(data);
    switch(data.text) {
        case "hi":
            BuscarTexto();
            break;
        case 'RANCO':
        bot.postMessageToUser(user,'Produccion');
        break;
        case 'RAPEL':
        bot.postMessageToUser(user,'Desarrollo');
        //bot.postMessage(data.user, JSON.stringify({'rapel':bot})); 
        console.log(data);
        break;
        default:
        //bot.postMessage(message.user, 'meow!', { 'pruebatron': true, icon_emoji: ':cat:' }); 
        break;
    }
}
function BuscarTexto() {
  var greeting = leerArchivo();
  bot.postMessageToUser(user, greeting.lista.Cesantia);
}
function leerArchivo() {

  return JSON.parse(fs.readFileSync('C:\\Calculo.json', 'utf8'));

}


