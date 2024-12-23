const express = require('express');

const { adminAuth, userAuth } = require('./middlewares/auth');

const { genericError } = require('./middlewares/error');

const app = express();

// Middleware to handle admin authorisation
app.use('/admin', adminAuth)

app.get('/admin/getAllUserData', (req, res) => {
    res.send("Get all user data")
})

app.delete('/admin/deleteUserData', (req, res) => {
    res.send("User data deleted")
})

app.post('/user/login', (req, res) => {
    res.send("User is signing in")
})

// Middleware to handle User authorisation
app.get('/user/getUserData', userAuth, (req, res) => {
    throw new Error('Random error');
    res.send("Get user data")
})

// Middleware to handle errors
app.use('/', genericError)

app.listen(7777, () => {
    console.log('Server is runnning on port 7777...')
})