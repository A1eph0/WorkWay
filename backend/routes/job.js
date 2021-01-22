// Initiation of router and making the user model
const router = require('express').Router();
const User = require('../models/user.model');
const auth = require("../middleware/auth");
const Job = require("../models/job.model")
const mongoose = require('mongoose');

router.get("/", async (req, res) => {
    const jobs = await Job.find()
    res.json(jobs)
})

router.post("/add", auth, async (req,res) => {
    const user = await User.findOne({ email: req.user.email })
    if (user.utype === "Recruiter")
    {
        const {
            title,
            maxapp,
            maxpos,
            dod,
            skills,
            jtype,
            duration,
            salary,
            trating,
            nrating,
        } = req.body
    
        const newJob = new Job({
            title,
            remail: user.email,
            maxapp,
            maxpos,
            dod,
            skills,
            jtype,
            duration,
            salary,
            trating,
            nrating,
        })
    
        newJob
            .save()
            .then(() => res.json('Job added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
})

router.get("/:id", auth, async (req,res) => {
    Job
        .findById(req.params.id)
        .then(job => res.json(job))
        .catch(err => res.status(404).json('Error: '+ err))
})

router.delete("/delete/:id", auth, async (req,res) => {
    const job = await Job.findById(req.params.id)
    if (job.remail === req.user.email) {
        Job
            .findByIdAndDelete(req.params.id)
            .then(() => res.json('Job Deleted'))
            .catch(err => res.status(404).json('Error: ' + err));
    }
})

router.post("/update/:id", auth, async (req, res) => {
    Job
        .updateOne({_id:req.params.id}, req.body)
        .then(() => res.json("Job updated!"))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;