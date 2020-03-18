const express = require('express');
const ImageModel = require('../models/Image.js');
const UserModel = require('../models/User.js');

const router = express.Router();

router.get('/images/:id',  (req, resp) => {
   ImageModel.find({id: req.params.id}, (err, data) => {
      if (err) {
         resp.json({ message: 'Image not found' });
      } else {
         console.log(data);
         resp.json(data);
      }
   });   

});

router.get('/images/', (req, resp) => {
   ImageModel.find({}, (err, data) => {
      if (err) {
         resp.json({ message: 'Images not found' });
      } else {
         resp.json(data);
      }
   });   

});

router.get('/users/:id', (req, resp) => {
   UserModel.find({id: req.params.id}, (err, data) => {
      if (err) {
         resp.json({ message: 'User not found' });
      } else {
         resp.json(data);
      }
   });   
 
 });

module.exports = router;