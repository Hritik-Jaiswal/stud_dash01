const { sign, verify } = require("jsonwebtoken")

const createToken = user => {
    const accessToken = sign(
        { 
            username: user.username, 
            id: user.id
        }, 
        "jwtwhateversecretgoeshere")
        
        return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if(!validateToken) return res.status(400).json({ error: "user not authenticated" })

    try {
        const validateToken = verify(accessToken, "jwtwhateversecretgoeshere")
        if(validateToken){
            req.authenticated = true
            return next()
        }
    } catch (error) {
        res.status(400).json({ Error: error})
    }
}

module.exports = { createToken, validateToken }