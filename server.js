const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./src/features/routers/api');
const URI = 'mongodb+srv://quantmph19466:ZehXhobhPJMbgUY7@cluster0.qiz9d1q.mongodb.net/cp17302?retryWrites=true&w=majority'

mongoose.connect(URI);
mongoose.connection.on('connected', () => {
    console.log('conected to mongoose');
})
mongoose.connection.on('error', (err) => {
    console.log('this is error', err);
});




app.use(morgan('tiny'));
app.use ('/api',routes );

app.listen(PORT,console.log(`Server listening on ${PORT}`));