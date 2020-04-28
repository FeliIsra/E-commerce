const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//import routes
const userRoutes = require('./routes/user')

//App
const app  = express();

//Routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

//DB connection
mongoose.connect(
    process.env.MONGO_URI,
    {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            }
).then(() => console.log('DB connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});