const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ githubId: profile.id }, function (err, user) {
      if (err) { return cb(err); }
      if (!user) {
        const newUser = new User({
          githubId: profile.id,
          username: profile.username,
          email: profile.emails[0].value
        });
        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      } else {
        return cb(null, user);
      }
    });
  }
));
