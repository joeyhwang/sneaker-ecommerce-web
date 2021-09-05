const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()

router.get('/', passport.authenticate('facebook', 
{scope : ['email', 'public_profile']}))


router.get('/callback',
  passport.authenticate('facebook', 
  {failureRedirect: process.env.FRONTEND_URL, session: true}), (req, res) => {
    res.redirect(process.env.FRONTEND_URL)
  }
  
  
  )



module.exports = router