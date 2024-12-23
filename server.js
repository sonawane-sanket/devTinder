const express = require('express');

const { adminAuth, userAuth } = require('./middlewares/auth')

const app = express();

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

app.get('/user/getUserData', userAuth, (req, res) => {
    res.send("Get user data")
})

app.listen(7777, () => {
    console.log('Server is runnning on port 7777...')
})