import * as LocalStrategy from "passport-local";
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export default function(passport){
    passport.use(new LocalStrategy.Strategy({usernameField: 'username'}, (username, password, done) => {
            User.findOne({username: username})
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'User not registered'});
                }
                bcrypt.compare(password, user.password, (err, matched) =>{
                    if(err) throw err;

                    if(matched){
                        return done(null, user);
                    }
                    else {
                        return done(null, false, {message: 'Password not found'});
                    }
                })
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}