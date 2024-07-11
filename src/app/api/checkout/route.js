import { authOptions } from "../auth/[...nextauth]/route";

import { MenuItem } from "../../../app/models/MenuItem";
import { Order } from "../../../app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SK);
// console.log("stripe", stripe);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras.find(
          (extra) =>
            extra._id.toString() === cartProductExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}

// This code exports an asynchronous POST function that handles HTTP requests to create a new order in a database and generate a Stripe checkout session. Here's a breakdown of what the code does:

// It imports several modules and dependencies, including the authOptions object, the MenuItem and Order models, the mongoose library for connecting to a MongoDB database, the getServerSession function from the next-auth library, and the stripe library for handling payments.
// It initializes the stripe variable by requiring the stripe module and passing the Stripe secret key (process.env.STRIPE_SK) to the constructor.
// It defines the POST function, which is an asynchronous function that handles HTTP POST requests.
// Inside the POST function, it first connects to the MongoDB database using the mongoose.connect method and the process.env.MONGO_URL environment variable.
// It then extracts the cartProducts and address objects from the request body using the await req.json() method.
// It retrieves the user's email from the session using the getServerSession function and the authOptions object.
// It creates a new Order document using the Order.create method and the userEmail, address, and cartProducts objects.
// It initializes an empty stripeLineItems array, which will be used to store the line items for the Stripe checkout session.
// It iterates over the cartProducts array and performs the following steps for each product:
// It retrieves the productInfo object by querying the MenuItem model with the product ID.
// It calculates the productPrice by adding the base price, size price (if applicable), and extra ingredient prices (if applicable).
// It creates a stripeLineItem object with the quantity, price_data, and product_data properties and pushes it to the stripeLineItems array.
// It creates a new Stripe checkout session using the stripe.checkout.sessions.create method and the stripeLineItems, mode, customer_email, success_url, cancel_url, metadata, payment_intent_data, and shipping_options properties.
// It returns the URL of the Stripe checkout session as a JSON response using the Response.json method.



// Create a code for my next JS app; Where a user(debtor) could click a pay button to settle his debt. On top of that, the logic is carried out on the server side with Stripe. Let's say the debtor owes 50000, however, he chooses to pay 10000. A response containing the new amount owed of 40000(which is 50000 minus 10000) and the time at which payment was made should be displayed on the client side on a table with a history of the amount owed, the amount paid,        
// date of payment and new amount owed. The pay button remains clickable until the debt is cleared or settled.

// the code snippet should be in the NextJS code structure for API  etc
