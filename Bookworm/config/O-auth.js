import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken package
// m
passport.use(new GoogleStrategy({
    clientID: process.env.ClientID,
    clientSecret: process.env.Clientsecret,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    try {
      // Generate JWT token using user profile data
      const token = jwt.sign({ 
        googleId: profile.id, 
        email: profile.email,
        name: profile.given_name,
        profilepicture: profile.photos[0].value
      }, process.env.JWT_SECRET);

      return done(null, token);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize and deserialize user using JWT
passport.serializeUser(function(token, done) {
  done(null, token);
});

passport.deserializeUser(async function(token, done) {
  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    done(null, decoded);
  } catch (err) {
    done(err);
  }
});

export default passport;
