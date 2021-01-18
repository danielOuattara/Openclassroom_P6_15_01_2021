//  Option 1
//----------

const http = require('http');  // importer le package "http" de Node.js pour construire les serveurs
                               // l'objet 'http' permet de créer un serveur.

const server = http.createServer((req, res) => {
    res.end('Ici la reponse serveur node.js')
});

server.listen(process.env.PORT || 3000);  // écouter les requêtes envoyées


//--------------------------------------------------------------------------


/* 
//  Option 2
// ----------

 import http from 'http';  // what about that ?

const server = http.createServer((req, res) => {
    res.end('Ici la reponse serveur')
});


server.listen( 3005 || process.env.PORT);  // écouter les requêtes envoyées

 */