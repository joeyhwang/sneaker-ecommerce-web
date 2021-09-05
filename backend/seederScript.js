require('dotenv').config()

const sneakersData = require('./data/sneakers')
const connectDB = require('./config/db')
const Sneaker = require('./models/Sneaker')
const User = require('./models/User')
const Order = require('./models/Order')

connectDB()

const importData = async () => {
    try {
        await Sneaker.deleteMany({})
        //await User.deleteMany({})
        //await Order.deleteMany({})
        await Sneaker.insertMany(sneakersData);
        console.log("Data Import Success")

        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

importData()