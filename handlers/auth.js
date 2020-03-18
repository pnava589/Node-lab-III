const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User.js');

//maps the passport user+passwd fields to the name of fields in database
const localOpt ={
    usernameField:'email',
    passwordField:'password'
};

// define strategy for validating login
const strategy = new LocalStrategy(localOpt,async(email,password,done)=>{
    try{
        // Find the user in the DB associated with the email provided by the user
        const userChosen = await UserModel.findOne({email:email});

        if(!userChosen){
            return done(null,false,{message:'Email not found'}); //if the user is not found set flash message
        }
        // Validate password and make sure it matches with the corresponding hash

        //stored in the database. If the passwds match, it returns a value of true.

        const validate = await userChosen.isValidPassword(password);
        if(!validate){
            return done(null,false,{message:'Wrong Password'});
        }

        return done(null,userChosen,{message:'Logged in Succesfully'});

        }
        catch(error){
            return done(error)
        }
    });

    // for localLogin, use our strategy to handle User login
    passport.use('localLogin',strategy);

    // by default, passport uses sessions to maintain login status ...
    // you have to determine what to save in session via serializeUser
    // and deserializeUser. In our case, we will save the email in the session data

    passport.serializeUser((user,done)=>done(null,user.email));

    passport.deserializeUser((user,done)=>{
        UserModel.findOne({email:email},(err,user)=>done(err,user));
    });
