var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle['/favico.ico'] = requestHandlers.iniciar;
handle['/'] = requestHandlers.iniciar;
handle['/iniciar'] = requestHandlers.iniciar;
handle['/subir'] = requestHandlers.subir;
handle['/show'] = requestHandlers.show;


server.iniciar(router.route, handle);