const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const User = require('./models/User');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done)  => {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    console.log(profile)
    try { 
      const user = await User.findOne({email: profile.emails[0].value})
      if (!user) {
        const createUser = await User.create({ googleId: profile.id, image: profile.photos[0].value,
          name: profile.displayName, email: profile.emails[0].value})
       done(null, createUser) 
      }
      done(null, user)
    } catch (err ) { 
        done(null, err)
    }
    
  }
));


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName','emails', 'photos']
},
async (request, accessToken, refreshToken, profile, done) => {
  console.log(profile)
  try { 
    const user = await User.findOne({email: profile.emails[0].value})
    if (!user) {
      const createUser = await User.create({ facebookId: profile.id, image: profile.photos[0].value,
        name: profile.displayName, email: profile.emails[0].value})
     done(null, createUser) 
    }
    done(null, user)
  } catch (err ) { 
      done(null, err)
  }
  
}
))

