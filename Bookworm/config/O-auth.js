import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import GoogleUser from '../model/googleAuth.js';
// m
passport.use(new GoogleStrategy({
    clientID: process.env.ClientID,
    clientSecret: process.env.Clientsecret,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true,
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      // Check if the user already exists in your database
      let user = await GoogleUser.findOne({ googleId: profile.id });
      if (user) {
        // If the user already exists, return the user
        return done(null, user);
      } else {
        // If the user does not exist, create a new user
        const newUser = new GoogleUser({
          googleId: profile.id,
          // You can also save other profile information here if needed
          email: profile.email, // Provide email
          name: profile.given_name,   // Provide name
          profilepicture: profile.photos[0].value // Provide profile picture
        });
        console.log(profile);
        await newUser.save();
        return done(null, newUser);
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    let user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


export default passport;
