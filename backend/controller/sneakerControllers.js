const Sneaker = require('../models/Sneaker')
const getAllSneakers = async (req, res) => {
    try {
        const sneakers = await Sneaker.find({})
        res.json(sneakers)
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Server Error getting all sneakers"})
    }
}

const getSneakersByBrand = async (req,res) => {
    try {
        let brandParams = req.params.brand
        const brand = brandParams.charAt(0).toUpperCase() + brandParams.slice(1)
        if (brand === "Latest") {
            const sneakers = await Sneaker.find({})
            res.json(sneakers)
        } else {
            const sneakers = await Sneaker.find({brands: brand})
            res.json(sneakers)
        }
        
    } catch(error) {
        console.error(error)
        res.status(500).json({message: "Server Error getting all sneakers"})
    }
}

const getSneakerById = async (req, res) => {
    try {
        const sneaker = await Sneaker.findById(req.params.id)
        res.json(sneaker)
    } catch(error) {
        console.error(error)
        res.status(500).json({message: `Server Error ${req.params.id} sneakers`})
    }
}

module.exports = {
    getAllSneakers, getSneakerById, getSneakersByBrand
}