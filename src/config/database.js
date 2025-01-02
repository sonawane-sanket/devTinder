const mongoose = require('mongoose');

const dbConnectionString = 'mongodb+srv://sanket:sanket2890@namastedev.czrp3.mongodb.net/devTinder';

const connectDB = async () => {
    await mongoose.connect(dbConnectionString);
}

module.exports = connectDB;
