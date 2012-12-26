var http = require("http");
var url = require("url");

function iniciar(route, handle) {
    function onRequest(request, response) {
        var pathName = url.parse(request.url).pathname;
        console.log("request received for " + pathName);
        
        request.setEncoding("utf8");
        
        route(handle, pathName, response, request); 
    }
    http.createServer(onRequest).listen(process.env.PORT);
    console.log("server has started");
}

exports.iniciar = iniciar;