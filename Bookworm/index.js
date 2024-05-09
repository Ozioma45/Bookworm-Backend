import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/mongodb.js';
import passport from 'passport';
import routes from './routes/routes.js';

connectDb()
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(passport.initialize());

// Use routes
app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
