const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "mynamem$ona";

//Route 1---------craete user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    // username must be an email
    body("name", "name is not valid").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return bad request and the error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "Sorry, a user with this email already exists",
          });
      }

      bcrypt.genSalt(10, async (err, salt) => {
        if (err) {
          throw err;
        }

        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });

        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);

        // console.log({authToken});

        // res.json({ user });
        success = true;
        res.json({ success, authtoken });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An error occurred");
    }
  }
);

//Route 2 -----Authenticate a user: POST "/api/auth/createuser".
router.post(
  "/login",
  [
    body("email", "Email is not valid").isEmail(),
    body("password", "PAssword canot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) { 
        success = false
        return res
          .status(400)
          .json({ error: "Please try to login with correct Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct Credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occurred");
    }
  }
);

//Route 3 -----Authenticate a user: POST "/api/auth/getUser".
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occurred");
  }
});

module.exports = router;
