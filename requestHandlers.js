var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function responder(response, content) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
}

function iniciar(response) {
    console.log("Manipulador de petición 'iniciar' ha sido llamado");
    
    var body = '<html>' + 
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8 "/>' +
        '</head>' +
        '<body>' +
        '<form action="/subir" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="subir" multiple="multiple"></input>' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';
        
    responder(response, body);
}

function subir(response, request) {
    console.log("Manipulador de petición 'subir' ha sido llamado");
    var form = new formidable.IncomingForm();
    console.log("About to parse");
    form.parse(request, function(error, fields, files) {
       console.log("parsing done");
       /*   Possible error on Windows system:
            tried to rename to an already existing file */
        fs.rename(files.upload.path, "tmp/test.png", function(err) {
           if (err) {
               fs.unlink("tmp/test.png");
               fs.rename(files.upload.path, "tmp/test.png");
           } 
        });
        var content = "received image:</br><img src='show'/>";
        responder(response, content);
    });
}

function show(response) {
    console.log("Request handler 'show' was called");
    fs.readFile("tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.iniciar = iniciar;
exports.subir = subir;
exports.show = show;