const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model

const userSchema = new Schema({
  email: {
    lowercase: true,
    type: String,
    unique: true,
  },
  password: String
});

// On Save Hook, encrypt password

// Before saving the model (userSchema.pre), run this function
userSchema.pre('save', function(next) {
  // Get acces to the user model via this
  const user = this;

  // Generation of salt takes time, so callback is necessary
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // Hasing the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

// Methods to add to Schema

// Use bcrypt.compare to compare password in DB and password sent by user
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    else { callback(null, isMatch); }
  });
}

// Create the model class

const ModelClass = mongoose.model('user', userSchema);

// Export the model

module.exports = ModelClass;
