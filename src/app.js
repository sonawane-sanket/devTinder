const express = require('express');
const connectDB = require('./config/database');
const app = express();

const User = require('./models/user')

app.post('/signup', async (req, res) => {
    const userData = {
        firstName: 'Sanket',
        lastName: 'Sonawane',
        email: 'sanket@gmail.com',
        password: 'sanket@123'
    }
    const newUser = new User(userData);
    try {
        await newUser.save();
        res.send('User saved successfully..!');
    } catch (err) {
        res.status(400).send('Error saving user: ', + err.message);
    }
});

connectDB()
.then(() => {
    console.log('Database connection successful...');
    app.listen(7777, () => {
        console.log('Server is runnning on port 7777...')
    })
})
.catch( err => {
    console.error(err)
})