// Initiation of router and making the user model
const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const mongoose = require('mongoose');

// Fetching user from db
router.get("/", auth, async (req, res) => {
    //console.log(req.user)
    const user = await User.findOne({ email: req.user.email })
    //console.log(user)
    res.json({
        id: user._id,
        email: user.email,
        utype: user.utype
    })
});


// Adding database entry
router.post("/signup", async (req, res) => {
    try {
        const {email, password, cpassword, utype}= req.body;

        if (!email || !password || !cpassword || !utype)
            return res.status(400).json({msg: "Not all fields have been entered."})
        
            if (password !== cpassword)
            return res.status(400).json({msg: "Passwords do not match"})
        
            const existingUser = await User.findOne({email: email})
        if (existingUser)
            return res
                .status(400)
                .json({msg: "An account with this email already exists" });
                

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            utype
        });

        newUser
            .save()
            .then(() => res.json('User added sucessfully!'))
            .catch(err => res.status(400).json('Error: '+err));
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
});

// Login
 router.post("/signin", async (req,res) => {
     try{
         const {email, password} = req.body;

         if (!email || !password)
            return res.status(400).json({msg: "Not all fields have been entered."});
        
        const user = await User.findOne({email: email});
        
        if (!user)
            return res.status(404).json({msg: "No such user has been registered."});
        
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({msg: "Incorrect password"});

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                utype: user.utype
            }
        })
     }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
 });

 router.post("/tokenIsValid", async (req, res) =>{
    try {
        const token = req.get("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false)

        const user = await User.findOne({email:verified.email});
        return res.json(true)
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
 });

router.get("/getall", auth, async (req, res) => {
    //console.log(req.user)
    const user = await User.findOne({email: req.user.email})
    //console.log(user)
    res.json({
        email: user.email,
        utype: user.utype,
    
        // Applicant case
        fname: user.fname,
        lname: user.lname,
        education: user.education,
        skills: user.skills,
        trating: user.trating,
        nrating: user.nrating,
    
        // Recruiter case
        cname: user.cname,
        phone: user.phone,
        bio: user.bio
    });
});

router.post("/update", auth, async (req, res) => {
    User
        .updateOne({email: req.user.email}, req.body)
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json('Error: ' + err))
});


// Export router
module.exports = router;