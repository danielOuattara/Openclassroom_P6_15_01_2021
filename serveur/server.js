const http = require('http');  // importer le package de serveur http de Node.js. L'objet 'http' permet de créer un serveur.
const app = require ('./app_2.js');


app.set('port', 3000 || process.env.PORT);

const server = http.createServer((req, res) => {
    res.end('Ici la reponse serveur')
});


server.listen( 3000 || process.env.PORT);  // écouter les requêtes envoyées
