const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({msg:"No Authentication! Access Denied!"})
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json({msg:"Verification Failed! Access Denied!"})

        req.user = verified;
        next();
    }catch (err) {
        res.status(500).json('Error :'+ err.message)
    }
};

module.exports = auth;