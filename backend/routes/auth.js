const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const secretKey = "shhhhh";
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

//Route1//create a User using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return bad requests and the errors
    const errors = validationResult(req);
    //if not equal to error empty then send a status 400 and error
    if (!errors.isEmpty()) {
      return res.status(400).json({success: success, errors: errors.array() });
    }
    try {
      // here we are checking whether the user with the same email is already registered or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success: success, error: "Sorry a user with this email already exists" });
      }
      
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data = {
        user: {
            id: user.id
        }
      }
      //here we are giving a user a jwt token for login
      
      const authToken = jwt.sign(data, secretKey);
      //console.log(authToken)
      success = true;
      res.json({success, authToken})
      // here we are sendig a user in response
    //   res.json(user);

    }
    // here we are sending
    catch (error) {
      // check whether the user with the same email already exists

      //.then(user => res.json(user)).catch(err => {console.log(err)
      //    res.json({error: 'Please enter a unique value for email', message: err.message})

      //here we are sending error
      console.error(error.message);
      success = false;
      res.status(500).send(`${success} some error occured`);
    }
  }
);

//Route2->Login for user login
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],
async (req, res) => {

  let success = false;
    //if there are errors, we are sending bad requests and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
     
    //getting a email and password from request
    const {email, password} = req.body;
    try {
        //checking whether the user with this email is exist or not
        let user = await User.findOne({email});
        console.log("Retrieved user:", user); 
        if(!user){
            res.status(400).json({success, error: "Please enter a valid email"});
        }

        console.log("Retrieved hashed password:", user.password);
        console.log("Entered password:", password);

    //checking whether the password is correct or not
     const passwordCompare = await bcrypt.compare(password, user.password);
     console.log("Password comparison result:", passwordCompare);
     if(!passwordCompare){
         return res.status(400).json({success, error: 'Please enter a valid password'})
     } 
     
     const data = {
        user: {
            id: user.id
        }
     }
     success = true;
     const authToken = jwt.sign(data, secretKey)
     res.json({success, authToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Enternal Server Error")
    }
});

//Route3 : Getting logged  in user details using: POST "api/auth/getuser".login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Enternal Server Error")
  }
})



module.exports = router;
