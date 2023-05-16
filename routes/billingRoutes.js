const keys = require('../config/keys');


//const stripe = require('stripe')(keys.stripeSecretKey);

const stripe = require("stripe")(keys.stripeSecretKey, {
  apiVersion: "2022-08-01",
});
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  /*   app.post('/api/stripe',requireLogin, async(req, res) =>{
        const charge =  await stripe.charges.create({
             amount: 8000,
             currency: 'usd',
             description: '80 euros for 1 credit',
             source: req.body.id
         });
         req.user.credits += 80;
         const user = await req.user.save();
         res.send(user);
     });*/

  app.get("/api/customer/:email", requireLogin, (req, res) => {
    res.send({
      publishableKey: keys.stripePublishableKey,
    });
  });


  app.get("/api/config", requireLogin, (req, res) => {
    res.send({
      publishableKey: keys.stripePublishableKey,
    });
  });

  app.post("/api/create-payment-intent", requireLogin, async (req, res) => {
    try {
      // Check if the customer already exists in Stripe
      let customer = await stripe.customers.list({
        email: req.user.email,
        limit: 1,
      });
  
      let customerId;
      if (customer.data.length > 0) {
        // If the customer exists, use the existing customer ID
        customerId = customer.data[0].id;
      } else {
        // If the customer doesn't exist, create a new customer
        customer = await stripe.customers.create({
          email: req.user.email,
        });
        customerId = customer.id;
      }
  
      const existingMembership = req.user.hasMembership;
      const currentDate = new Date();
      const paymentAmount = 500;
  
      // Check if the user's current membership is still active
      if (existingMembership > currentDate) {
        // If the user's current membership is still active, update the end date
        const newEndDate = new Date(existingMembership.getTime() + 30 * 24 * 60 * 60 * 1000);
        req.user.hasMembership = newEndDate;
      } else {
        // If the user's current membership has expired, create a new one
        req.user.hasMembership = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      }
  
      const user = await req.user.save();
  
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: paymentAmount,
        description: '5 dollars for 1 monthly membership',
        automatic_payment_methods: { enabled: true },
        customer: customerId,
      });
  
      // Send the client secret and user data to the client
      res.send({
        clientSecret: paymentIntent.client_secret,
        user: user,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
  


  app.post("/api/create-payment-intent-feedback", requireLogin, async (req, res) => {

    try {


      // Check if the customer already exists in Stripe
      let customer = await stripe.customers.list({
        email: req.user.email,
        limit: 1,
      });

      let customerId;

      if (customer.data.length > 0) {
        // If the customer exists, use the existing customer ID
        customerId = customer.data[0].id;
      } else {
        // If the customer doesn't exist, create a new customer
        customer = await stripe.customers.create({
          email: req.user.email,
        });
        customerId = customer.id;
      }


      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: 200,
        description: '2 euros for feedback',
        automatic_payment_methods: { enabled: true },
        customer: customerId,
      });

      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
}