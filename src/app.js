const express = require('express');
const connectDB = require('./config/database');
const app = express();

const User = require('./models/user');

app.use(express.json());

// Signup user with dynamic data
app.post('/signup', async (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.send('User saved successfully..!');
    } catch (err) {
        res.status(400).send('Error saving user: ' + err.message);
    }
});

// Get a user by email
app.get('/user', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({email: email});
        if(user.length === 0) {
            res.status(404).send("Users not found..")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send('Something went wrong: ' + err.message);
    }
})

// Feed API - GET /feed - get all users  from database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0) {
            res.status(404).send("Users not found..")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(400).send('Something went wrong: ' + err.message);
    }
})

// Delete a User from database
app.delete('/user', async (req, res) => {
    const { userId } = req.body
    try {
        await User.findByIdAndDelete(userId);
        res.send("User is deleted");
    } catch (err) {
        res.status(400).send('Something went wrong: ' + err.message);
    }
})

// Update data of the user
app.patch('/user', async (req, res) => {
    const data = req.body
    try {
        await User.findByIdAndUpdate(data.userId, data);
        res.send("User is updated");
    } catch (err) {
        res.status(400).send('Something went wrong: ' + err.message);
    }
})

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