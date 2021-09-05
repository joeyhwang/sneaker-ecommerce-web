const express = require('express')
const router = express.Router()

const {getAllSneakers, getSneakerById, getSneakersByBrand} = require('../controller/sneakerControllers')


//get all sneakers
router.get('/', getAllSneakers)

router.get('/shop/:brand', getSneakersByBrand)
//get single sneaker
router.get('/:id', getSneakerById)

module.exports = router