
require('dotenv').config();

const express     = require( 'express');  // importe 'express'
const bodyParser  = require( 'body-parser');
const mongoose    = require('mongoose');
const path        = require('path');
const sauceRoutes = require('./routes/sauceRoutes.js')
const userRoutes  = require('./routes/userRoutes.js')
const app         = express(); //  cree une application express
const helmet      = require('helmet')
const cors        = require('cors');
const limiter     = require('express-rate-limit');


app.use(helmet())
app.use(cors());


const DATABASE = process.env.DATABASE;
const PSW = process.env.PSW;
const ADDRESS = process.env.ADDRESS


mongoose.connect(`mongodb+srv://${DATABASE}:${PSW}@${ADDRESS}`,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }
)
.then(()  => console.log('Connection to MongoDB:  Success !'))
.catch(() => console.log('Connection to MongoDB:  Failed !'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());

app.use(limiter ({
  windowMs: 5000,
  max: 5, 
  message: {
    code: 429,
    message: 'Too many connection; Try later !'
  }
}))
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes )
app.use('/api/auth', userRoutes )

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

