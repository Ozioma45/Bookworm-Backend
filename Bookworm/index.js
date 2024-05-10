import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/mongodb.js';
import passport from 'passport';
import routes from './routes/routes.js';
import session from 'express-session';

connectDb()
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(passport.initialize());

app.use(session({
    secret: 'your_secret_key', // Replace with a secret key
    resave: false,
    saveUninitialized: true
  }));
// Use routes
app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
