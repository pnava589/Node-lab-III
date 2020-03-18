
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

// define a schema that maps to the structure of the data in MongoDB
const userSchema = new mongoose.Schema({
   id: Number,
   details: {
    firstname: String,
    lastname: String,
    city: String,
    country: String
   },
   picture: {
    large: String,
    thumbnail: String
   },
   membership: {
    date_joined: String,
    last_update: String,
    likes: Number
   },
   email: String,
   password_bcrypt: String,
   apikey: String
 });

//We'll use this later on to make sure that the user trying to log in has the correct credentials
/* UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, User.password_bcrypt);
    return compare;
}  */

 module.exports = mongoose.model('User', userSchema);