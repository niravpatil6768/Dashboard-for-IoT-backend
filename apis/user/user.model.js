const mongoose = require('mongoose');
//const _ = require('lodash');
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');
const bcrypt = require('bcryptjs'); 




const Schema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true 
    }
   
});


Schema.pre('save', function(next){
    let user = this;
    let costFactor = 10;

    if(user.isModified('password')){
        
        //generate salt and hash password
        bcrypt.genSalt(costFactor,(err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
});





module.exports = mongoose.model('users', Schema);
