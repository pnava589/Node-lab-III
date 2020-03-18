const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/', (req, resp) => {
   resp.render('home', {name: '(name to be determined from login)'});
});

router.get('/login', (req, resp) => {
   resp.render('login');
});

router.get('/logout', (req, resp) => {
   console.log('logging out');
   resp.render('login');
});


module.exports = router;