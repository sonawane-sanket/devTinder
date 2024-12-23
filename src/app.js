const express = require('express');
const connectDB = require('./config/database');
const app = express();

const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);
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