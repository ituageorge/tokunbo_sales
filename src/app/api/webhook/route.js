import {Order} from "../../models/Order";

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    // console.log('reqq.bufferrr', reqBuffer)
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    // console.log("eevveenntt", event)
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  if (event.type === 'checkout.session.completed') {
    console.log('event', event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {paid:true});
    }
  }

  return Response.json('ok', {status: 200});
}

// This code exports an asynchronous POST function that handles HTTP requests to process Stripe webhooks. Here's a breakdown of what the code does:

// It imports the Order model from the @/models/Order module.
// It initializes the stripe variable by requiring the stripe module and passing the Stripe secret key (process.env.STRIPE_SK) to the constructor.
// It defines the POST function, which is an asynchronous function that handles HTTP POST requests.
// Inside the POST function, it first retrieves the stripe-signature header from the request and assigns it to the sig variable.
// It initializes the event variable to undefined.
// It wraps the following code in a try block to handle any errors that might occur while processing the webhook.
// Inside the try block, it retrieves the request body as a string using the req.text() method and assigns it to the reqBuffer variable.
// It retrieves the Stripe sign secret from the process.env.STRIPE_SIGN_SECRET environment variable and assigns it to the signSecret variable.
// It constructs the Stripe event using the stripe.webhooks.constructEvent method and the reqBuffer, sig, and signSecret variables.
// If an error occurs while constructing the event, it logs the error and returns a JSON response with the error and a 400 status code.
// If the event type is checkout.session.completed, it logs the event and performs the following steps:
// It retrieves the orderId from the metadata property of the event's data.object property.
// It sets the isPaid variable to true if the event's data.object.payment_status property is paid, and false otherwise.
// If isPaid is true, it updates the paid field of the Order document with the orderId to true using the Order.updateOne method.
// It returns a JSON response with the string 'ok' and a 200 status code using the Response.json method.