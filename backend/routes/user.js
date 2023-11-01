const router = require("express").Router()
const { sequelize, Users} = require("../models")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")

const { createToken, validateToken } = require("../JWT")

// const app = express()
// router.use(express.json())
router.use(cookieParser())

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      await Users.create({ username: username, email: email, password: hash });
      res.json("User Registered");
    } catch (err) {
      if (err) return res.status(400).json({ Error: err });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, email, password } = req.body
      const user = await Users.findOne({ where: {username: username, email:email}})
  
      if(!user) return res.status(400).json({Error: "User doesn't exist"})
  
      const dbPassword = user.password
      const match = await bcrypt.compare(password, dbPassword)
      if(!match) return res.status(400).json({ error: "Wrong Password"})

      const accessToken = createToken(user)
      res.cookie("access-token", accessToken, {
        maxAge: 60*60*24*30*1000,
        httpOnly: true
      })
      res.json("Logged in")
    } catch (error) {
      // Handle the error
      res.status(500).json({Error: "Internal Server Error"})
    }
  })
  
router.get('/profile', validateToken, (req, res) => {
    res.json("Profile")
})


module.exports = router