const User = require("./user.model");
const jwt = require("jsonwebtoken"); 
const { isValidObjectId } = require("mongoose"); 
const bcrypt = require("bcryptjs"); 
const express = require("express");





/*>>>>>>>*/
 exports.register = async (req, res, next) => {
    try {
      if (!this.validateEmail(req.body.email)) {
        return res.status(400).json({ msg: "Invalid email" });
      }
  
      const users = await User.find({ email: req.body.email }).exec();
      console.log(users);
      if (users.length != 0) {
        return res.status(409).json({
          msg: "already user exist with this email!",
        });
      } 
        try {
       
          //new user object created
          const user = new User({
            
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
           
          });
  
          try {
            const response = await user.save();
            return res.status(200).json({
              message: "registered successfully",
            });
          } catch (error) {
            return res.status(500).json({
              pathofmethod: "Error while registering users",
              error,
            });
        }
        } catch (error) {
          return res.status(500).json({
            error,
          });
        }
      }
    
    catch (error) {
      res.status(500).json({
        error: error,
        message: "Error while finding user",
      });
    }
  };

  exports.validateEmail = function (email) {
    var re = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (!re.test(email)) return false;
    return true;
  };


exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed: User not found",
        });
      }
  
  
      const result = await bcrypt.compare(req.body.password,user.password);
      console.log(req.body.password);
      console.log(result);
      console.log(user.password);
      if (result) {
        secret = "27676ghgtysj"
       
        const token = jwt.sign(
          {
            _id: user._id,
            email: user.email,
            type: user.type,
          },
          secret
        );
  
        return res.status(200).json({
          message: "Login successful",
          token: token,
          type: user.type
         
        });
      }
  
      return res.status(401).json({
        message: "Invalid credentials",
      });
    } catch (error) {
      return res.status(500).json({
        error: error,
        message: "Error while logging in",
      });
    }
  };  