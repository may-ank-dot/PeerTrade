import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "../db/connect";

passport.use(
    new LocalStrategy({usernameField: "email"},async (email,password,done)=>{
        try{
            const result = await db.query("SELECT * FROM users WHERE email=$1",[email]);
            const user = result.rows[0];
            if(!user) return done(null,false,{message: "user not found"});
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return done(null , false , {message: "Incorrect Password"});

            return done(null,user);
        } catch (err){
            return done(err);
        }
    })
);
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    try{
        const result = await db.query("SELECT * FROM user WHERE id=$1",[id]);
        const user = result.rows[0];
        done(null ,user);
    } catch (err){
        done(err,null);
    }
})
export default passport;