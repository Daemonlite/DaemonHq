const router = require("express").Router();
const passport = require("passport");

router.get('/login/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
module.exports = router;