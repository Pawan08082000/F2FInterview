const monsoose = require('mongoose')
const db = require('../models')
const jwt = require('jsonwebtoken');
const User = db.User
const config = require('../config/auth.config')

checkDuplicateEmail = (req,res,next) =>{
    console.log(User);
    User.find({email : req.body.email},(err,user)=>{
        if(err){
            return res.status(500).send({message:err.message})
        }
        if(user.email){
            return res.status(400).send({message:'User exists!'})
        }
        next();
    })
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized!" });
      }
     
      next();
    });
  };

  const authmiddleware = {
    checkDuplicateEmail,
    verifyToken
  };
  
  module.exports = authmiddleware;