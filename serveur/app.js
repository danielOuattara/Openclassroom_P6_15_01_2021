const express = require ('express');  // importe 'express'

const app = express(); //  cree une application express


app.use((req, res, next) => {
    console.log("Requête reçue");
    next();
});


app.use((req, res, next) => {
    res.status(201);
    next();
});


app.use((req, res, next) => {  // configuration réponse simple
    res.json({ message: 'Requête traîtée !'});
    next();
});


app.use((req, res) => {  // configuration réponse simple
    console.log('Réponse envoyée avec succès');
});

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet