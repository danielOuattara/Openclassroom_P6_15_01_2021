const express = require ('express');  // importe 'express'

const app = express(); //  cree une application express

app.use((req, res) => {  // configuration réponse simple
    res.json( { 
        message_1: 'Requête 1 reçue !', 
        message_2: 'Requête 2 reçue !'
    });
});

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet