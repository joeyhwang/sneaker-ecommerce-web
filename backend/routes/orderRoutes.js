const express = require('express')
const router = express.Router()

const {createOrder, getOrder, getAllOrders} = require('../controller/orderControllers')

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
  }

//get all sneakers
router.get('/', isLoggedIn, getOrder)
router.get('/all', isLoggedIn, getAllOrders)
router.post('/create', createOrder)

module.exports = router