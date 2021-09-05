const express = require('express')
require('dotenv').config()
const sneakerRoutes = require('./routes/sneakerRoutes')
const googleRoutes = require('./routes/googleRoutes')
const facebookRoutes = require('./routes/facebookRoutes')
const stripeWebhookRoute = require('./routes/stripeWebhookRoute')
const orderRoutes = require('./routes/orderRoutes')
const createCheckoutSession = require('./controller/stripe.js')
const path = require('path')
const session = require('cookie-session')
const passport = require('passport')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()
connectDB()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  app.use(session({secret: process.env.SECRET, resave: false,
  saveUninitialized: true}))
} else {
  app.set("trust proxy", 1)
  app.use(session({ secret: process.env.SECRET, resave: true, 
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  }))
}

app.use(passport.initialize())
app.use(passport.session())
//app.use('/webhook', stripeWebhookRoute)
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}

require('./auth')
app.use('/order',orderRoutes)
app.use('/auth/google',googleRoutes)
app.use('/auth/facebook', facebookRoutes)
app.post('/create-checkout-session', createCheckoutSession)
app.use('/api/sneakers',sneakerRoutes)
app.get('/profile', isLoggedIn, (req, res) => {
  res.json(req.user)
})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL)
});


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})
} else { 
  app.get("/", (req,res) => {
    res.send("Api running")
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
