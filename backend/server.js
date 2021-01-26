// Load packages
const express = require('express');             // Express Package
const cors = require('cors');                   // Cors package
const mongoose = require('mongoose');           // Mongoose
const nodemailer = require('nodemailer')

// Load environmental configurations
require('dotenv').config();      // Config file

// Loading routers for models
const userRouter = require('./routes/user');
const jobRouter = require('./routes/job');


// Expressing app and defining port
const app = express();
const port = process.env.PORT || 5000;      // Port for Application


// Middleware Setup
app.use(express.json());            // Using express
app.use(cors());                    // Using cors

// Communication with the Database
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});

// Communicating with the Database (MongDb)
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log("MongoDb connected"))
    .catch((err => console.log("Error: " + err)));


// Sucess message while connecting for the first time
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established sucessfully");
});

// Using the loaded models
app.use('/user', userRouter);
app.use('/job', jobRouter);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "workwayportal@gmail.com",
      pass: "zshisapenguin123", 
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  app.post("/email/send", async (req, res) => {
  
    try {
  
        const output = `
        <h1>Congratulations! You have been Recruited!</h1>
        <h4> ${req.body.fname} ${req.body.lname}, you have been selected into the position of ${req.body.job} by ${req.body.cname}.</h4>
        `
  
      let info = await transporter.sendMail({
        from: '"WorkWay Team" <workwayportal.com>', 
        to: req.body.email,
        subject: "Congrats! You have been recruited",
        text: "Hello world?", 
        html: output,
      });
  
      res.json({ success: true })
    }
    catch (err) {
      res.json({ success: false, message: err.message })
    }
  })