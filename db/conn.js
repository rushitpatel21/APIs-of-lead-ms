const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1:27017/lead-ms';

const connectToMongo = () => {
    try {
        mongoose.connect(URI);
        console.log('Connected to mongoDB Successfully!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;