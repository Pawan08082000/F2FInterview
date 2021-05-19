const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require('../config/auth.config')

const User = db.User;

module.exports.signup = async (req, res) => {

  // }
  try {
    const payload = { user: { email: req.body.email } };


    const user = new User({
      email: req.body.email,
      name: req.body.name,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save((err, user) => {
      if (err) {
        console.log('1',err)
        return res.status(500).send({ message: err.message });
      }
      if (user) {
        console.log(user)
        return res.status(200).send({ message: "User created Successfully!" });
      }
    });
  } catch (err) {
    console.log('2',err)
    res.status(500).send({ message: "Contact Support" });
  }
};

module.exports.login = (req,res) =>{
  User.findOne({
    email: req.body.email,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log(user)
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret);

      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token,
        message: 'User loggedin Successfully!'
      });
    });

}
