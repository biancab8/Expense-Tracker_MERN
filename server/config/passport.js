import User from "../models/User.js";
import pkg from "passport-jwt";
import * as dotenv from "dotenv";


const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
dotenv.config(); 

//extract token from the header of the http request
//store token and secret in opts: 
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
const secretOrKey = process.env.JWT_SECRET;;
const opts = {
  jwtFromRequest: jwtFromRequest, 
  secretOrKey: secretOrKey,
}

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        //go in DB and see if can find User with this id
      User.findById(jwt_payload.id , function (err, user) {
        if (err) {
          return done(err, false);
        }
        //found user
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
