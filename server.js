const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: 'postgres://myrdnxfdjjwjba:e5d52170b3af90384f6550f5832a458a37e0e9eb92d6eaf60cb66eb1ab87b933@ec2-52-71-231-37.compute-1.amazonaws.com:5432/ddmrtqlvenqm71',
        ssl: true
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('database.users')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, req, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.put('/imageurl', (req, res) => { image.handleApiCall(req, res) });



app.listen(process.env.PORT || 3000, ()=> {
    console.log('run 3000');
})