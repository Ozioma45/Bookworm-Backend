import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import routes from './routes/index.js';
import googleAuthRoutes from '../routes/googleAuth.routes.js';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// Initialize Passport and configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.ClientID,
  clientSecret: process.env.Clientsecret,
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Authentication logic here
}));

// Use Passport session middleware
app.use(passport.initialize());

// Use routes
app.use('/', routes);
app.use('/auth/google', googleAuthRoutes); // Assuming googleAuthRoutes handles Google OAuth routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
