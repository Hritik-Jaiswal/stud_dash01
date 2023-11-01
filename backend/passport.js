const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "865447618960-fckq9hodg3rvavb65ovk05c9ljmmt0bs.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "a85ee789ae6b961711af";
GITHUB_CLIENT_SECRET = "b751d2fe9725f887a63bda38d44bf9c9f7413565";

FACEBOOK_APP_ID = "689436523146825";
FACEBOOK_APP_SECRET = "c6c347aecb298ed9315be095473f54ae";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
