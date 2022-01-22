
require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const mongoose    = require('mongoose');
const path        = require('path');
const sauceRoutes = require('./routes/sauceRoutes.js')
const userRoutes  = require('./routes/userRoutes.js')
const app         = express(); //  cree une application express
const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');
const { application } = require('express');

app.use(helmet())
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
.then(()  => console.log('Connection to MongoDB:  Success !'))
.catch(() => console.log('Connection to MongoDB:  Failed !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(limiter ({
  windowMs: 5000,
  max: 200,
  message: {
    code: 429,
    message: 'Too many connection; Try later !'
  }
}))
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
  res.send('Welcome to Se Pokocko ! ')
})
app.use('/api/sauces', sauceRoutes )
app.use('/api/auth'  , userRoutes )

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet
