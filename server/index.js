import express, { urlencoded } from 'express';
const port = 7000;
const app = express();
import db from './config/mongoose.js'
import routes from './routes/index.js'
import passport from 'passport';
import JwtStrategy from './config/passport-jwt.js';
import cors from 'cors';
import cron from './controller/EVBunk/EVBunkSlot/cronjob.js'


app.use(cors({
    origin: "http://localhost:5173", // Frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
   }));
   
// Log incoming requests and preflight requests
app.use((req, res, next) => {
    // console.log(`Received ${req.method} request for ${req.url}`);

    next();
});
// Handle preflight requests for all routes
app.options('*', cors()); 

// middleware to read the form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// middleware to use the authentication for all the routes. 
app.use(passport.initialize());

// routes middleware 
app.use('/', routes)


app.listen(port, (err) => {
    if (err) {
        console.log("error in running the server", err);
        return;
    }
    console.log("server is running at port :", port);
})