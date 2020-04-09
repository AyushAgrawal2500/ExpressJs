var http = require('http');
var server =  http.createServer(engine);

server.listen(1337, function(){
    console.log("Hello World");
});

function engine(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain', 'Blablabla':'Kuch Bhi'});
    response.end('Request From Page '+request.url);
}