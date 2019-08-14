const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    // STATUS 400: Bad request
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  // could do just { email }
  User.findOne({ email: email }).then(user => {
    console.log("Looking for a user");
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt (used to create hash) & hash
    bcrypt.genSalt(
      10 /* number of rounds; the higher the more secure */,
      (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            res.json({
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          });
        });
      }
    );
  });
});

module.exports = router;
