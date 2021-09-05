const express = require('express')
const router = express.Router()
const passport = require('passport')
require('dotenv').config()

router.get('/',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
))

router.get( '/callback',
  passport.authenticate( 'google', 
  {failureRedirect: process.env.FRONTEND_URL, session: true } ),(req,res) => {
    res.redirect(process.env.FRONTEND_URL)
  }
)



module.exports = router