const express = require('express')
const router = express.Router()
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_API)
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET
router.post('/', express.raw({type: 'application/json'}), (request, response) => {
  
    let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    
    const signature = request.headers['stripe-signature'];
    console.log(signature)
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return response.sendStatus(400)
    }
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'checkout.session.completed':
        const session = event.data.object
        console.log("checkout session completed ", session)

      

        break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`)
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send()
})



module.exports = router