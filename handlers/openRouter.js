const express = require('express');
const router = express.Router();
const passport = require('passport');
const helper = require('./helpers.js');

// Welcome Page
//adding our helper function to the route handler will ensure that our site only renders the home page
//if the user is logged in. If the user is logged in, we will pass the user object for the logged
//in user to the ejs page
router.get('/', helper.ensureAuthenticated,(req, resp) => {
   resp.render('home', {user:req.user});
});

router.get('/login', (req, resp) => {
   console.log(req.body+" hello");
   resp.render('login',{message:req.flash('error')});
});

router.get('/logout', (req, resp) => {
   req.logout();
   req.flash('info','You were logged out');
   console.log('logging out');
   resp.render('login',{message:req.flash('info')});// passport is handling the sessions
   //used to indicate the logged-in status; the req.logout() lets the passport remove the 
   //logged-in user from its session state.
});

router.post('login',async (req,resp,next)=>{
   /*console.log(req.body);
   resp.send('hello');*/
   //use passports authentication to see if valid login
   passport.authenticate('localLogin',
                           {successRedirect:'/',
                           failureRedirect:'login',
                           failureFlash:true})(req,resp,next);
});


module.exports = router;