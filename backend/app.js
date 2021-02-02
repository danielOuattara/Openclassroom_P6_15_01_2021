
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


app.use(helmet())

const DATABASE = process.env.DATABASE;
const PSW = process.env.PSW;
const ADDRESS = process.env.ADDRESS

// mongoose.connect('mongodb+srv://se_pekocko_invited:Zgw2G2geUQ2rS1mCZgw2G2geUQ2rS1mC@cluster0.vndw3.mongodb.net/se_pekocko?retryWrites=true&w=majority',

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
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes )
app.use('/api/auth', userRoutes )

module.exports = app;  //  rend 'app' accessible depuis les autres fichiers du projet

