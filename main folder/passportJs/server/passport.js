const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

// Set environment variables for client IDs and secrets
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    // Your verification logic here
    // For example, find or create user in database
    // User.findOrCreate({ googleId: profile.id }, function(err, user) {
    //     return done(err, user);
    // });
    
    // For now, just passing the profile as user
    done(null, profile);
}));

passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, done){
            done(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
