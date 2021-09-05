const Order = require('../models/Order')
const stripe = require('stripe')(process.env.STRIPE_API)
const User = require('../models/User')

const createOrder = async (req, res) => {
    const {session_id, _id, email} = req.body
    const today = new Date()
    const session = await stripe.checkout.sessions.retrieve(
        session_id
      )
    console.log(session)
    try {

        const doc = {"checkoutSession": session_id, date: today, 
        status: "Processing", email: email, shipping: session.shipping.address}
        const checkExists = await Order.findOne({checkoutSession: session_id})
        if (!checkExists) {
            const result = await Order.create(doc)
            await User.updateOne({_id : _id}, {$push:{orders: result._id}})
            res.status(200).json(result)
        } else {
            console.log("exists")
            res.status(200).json(checkExists)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({message: "error in creating order"})
    }
}


const getOrder = async (req,res) => {
    //get user id from request
    const {_id}  = req.user

    const existing_user = await User.findOne({_id : _id})
    const orders = existing_user.orders


    // find user by id and then loop through orders and find line items for each order
    try {
        const database_order = await Order.findOne({_id: orders[orders.length -1]})
        stripe.checkout.sessions.listLineItems(
            database_order.checkoutSession,
            (err, lineItems) => {
                res.status(200).json({sneakers: lineItems.data,
                orderNumber: database_order.number, email: database_order.email,
            shipping: database_order.shipping})

            }
        )

    } catch (err) {
        res.status(500).json({error: "get single order error"})
    }
}

const getAllOrders = async (req, res) => {
    //get user id from request
    const {_id}  = req.user
    // find user by id and then loop through orders and find line items for each order
    try {
        const existing_user = await User.findOne({_id : _id})
        const orders = existing_user.orders
        let ordersArray = []
        for (const order_id of orders) {
            const database_order = await Order.findOne({_id: order_id})
            stripe.checkout.sessions.listLineItems(
                database_order.checkoutSession,
                (err, lineItems) => {
                    let orderData = {sneakers: lineItems.data}
                    orderData.sneakers[0].number = database_order.number
                    orderData.sneakers[0].date = database_order.date
                    orderData.sneakers[0].status = database_order.status
                    orderData.sneakers[0].email = database_order.email         
                    orderData.sneakers[0].shipping = database_order.shipping
                    ordersArray =  [...ordersArray, orderData]
                    
                    if (order_id === orders[orders.length-1]) {
                        res.status(200).json({orders: ordersArray})
                    }
                        
                }
            )


        }

    } catch (err) {
        res.status(500).json({error: err})
    }
}

module.exports = {createOrder, getOrder, getAllOrders}