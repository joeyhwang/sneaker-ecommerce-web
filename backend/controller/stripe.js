const stripe = require('stripe')(process.env.STRIPE_API)

async function createCheckoutSession(req,res) {

    const domainUrl = process.env.FRONTEND_URL
    const {line_items, customer_email} = req.body

    if (!line_items || !customer_email) {
        return res.status(400).json({error: 'missing required session parameters'})
    }
    let session
    try {
        session = await stripe.checkout.sessions.create ({
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainUrl}success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}cart`,
            payment_method_types: ['card'],
            shipping_address_collection: {allowed_countries: ['US']},
            automatic_tax: {
                enabled: true,
            },
            

    })
    res.status(200).json({sessionId: session.id})
} catch(error) {
    console.log(error)
    res.status(400).json({error: 'an error occurred, unable to create session'})
}

}

module.exports = createCheckoutSession