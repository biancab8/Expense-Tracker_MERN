import User from "../models/User.js";
import pkg from "passport-jwt";
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

let opts = {};
//store token and secret in opts: 
//extract token from the header
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "someSecret";

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        //go in DB and see if can find User with this id
      User.findById(jwt_payload.id , function (err, user) {
        //done's first arg is for err, 2nd is for user, returns: 
            //if err: just err, no user
            //if user found: null for err, but return user
            //if no user found and no err: null for err, false for user
        if (err) {
          return done(err, false);
        }
        //found user
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
