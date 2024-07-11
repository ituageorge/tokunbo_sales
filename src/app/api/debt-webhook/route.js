// // 5. Set up a webhook endpoint to handle events from Stripe:
// // javascript
// import { buffer } from 'micro';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2020-08-27',
// });

// // Ensure that this is not a publicly accessible URL
// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const buf = await buffer(req);
//     const sig = req.headers['stripe-signature'];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//       console.error(err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle specific event types (e.g., payment_intent.succeeded, etc.)
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         // Handle payment success event
//         // Add logic to update the debt settlement status
//         break;
//       default:
//       // Handle other events
//     }

//     res.json({ received: true });
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }


import {Order} from "../../models/Order";


const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    console.log('req.debt.buffer', reqBuffer)
    const signSecret = process.env.STRIPE_SK;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    console.log("eevveenntt-DEbt", event)
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


