var mongoose = require("mongoose");
var bcrypt   = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true},
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true},
  password: {
    type: String,
    required: true}
}, { timestamps: true });

// set some middleware to run before a save
UserSchema.pre("save", function(next){
  if( this.isModified("password") || this.isNew ){
    this.password = bcrypt.hashSync( this.password, 10);
  }
  next();
});

//this method allows users to authenticate themselves
UserSchema.methods.authenticate = function(submittedPassword){
  return bcrypt.compareSync( submittedPassword, this.password);
};


module.exports = mongoose.model("User", UserSchema);
