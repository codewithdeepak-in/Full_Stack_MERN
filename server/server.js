const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// creating instance of express.
const cors = require('cors');
app.use(cookieParser()); // for allowing cookie.


// Cross Origin Resource Sharing.
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
}));

const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport'); // Getting the jwtStrategy
const { handleError }  = require('./middleware/apierror');


app.use(passport.initialize());
passport.use('jwt', jwtStrategy); 
// initilazing passport to use strategy.


require('dotenv').config(); 
// for security

const routes = require('./routes');
const mongoose = require('mongoose');
// access the database in a more better way.

const bodyParser = require('body-parser');
// get the data from the request.


// Connection to the database.
const port = process.env.PORT || 3001;
(async () => {
    const connection = await mongoose.connect(`mongodb://${process.env.DB_HOST}/`);
    if(connection){
        console.log('Connected to DB successfully');
    }else{
        console.log('Their is some error');
    }
    
})()



// parsing.
app.use(bodyParser.json());

// Middleware for setting headers for specific routes
const setHeadersForAPIRoutes = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)

    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Respond to OPTIONS requests
    } else {
        next();
    }
};

// routes
app.use('/api', setHeadersForAPIRoutes);
app.use('/api', routes);

// Error handling.
app.use((err, req, res, next) => {
    handleError(err, res);
})

// Server Listening.
app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})
