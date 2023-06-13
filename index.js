const express = require('express');

const connectToMongo = require('./db/conn');
connectToMongo();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/user/auth', require('./routes/auth'));
app.use('/user/lead', require('./routes/lead'));

app.listen(PORT, ()=> {
    console.log(`Back-end runs on http://localhost:${PORT}/`);
})