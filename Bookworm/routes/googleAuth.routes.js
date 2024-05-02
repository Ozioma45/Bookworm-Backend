import express from 'express';
import passport from 'passport';
const router = express.Router();

// Google OAuth Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// Profile Route
router.get('/profile', isAuthenticated, (req, res) => {
  const user = req.user;
  res.send(`Welcome ${user.displayName}`);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

export { router as default };
