const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//import routes
const userRoutes = require('./routes/user')

//App
const app  = express();

// midlewates
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


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