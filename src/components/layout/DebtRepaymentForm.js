// // Import necessary dependencies and components
// "use client";
// import { useState } from "react";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// const stripeLib = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)


//  const DebtRepaymentForm = () => {
//   // State variables to manage debts and new debt input
//   const [amountOwed, setAmountOwed] = useState(50000);
//   const [amountPaid, setAmountPaid] = useState(0);
//   const [dateOfPayment, setDateOfPayment] = useState('');
//   const [paymentIntentId, setPaymentIntentId] = useState('');
//   const [error, setError] = useState('');

//   const stripe = useStripe();
//   const elements = useElements();

//   // Function to handle form submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const response = await fetch('/api/pay-debt', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ amount: amountPaid }),
//   //   });

//   //   const data = await response.json().catch((err) => {
//   //     console.error(err);
//   //     setError(err.message);
//   //   });

//   //   if (response.ok && data) {
//   //     setAmountOwed(amountOwed - amountPaid);
//   //     setPaymentIntentId(data.paymentIntentId);
//   //     setDateOfPayment(data.dateOfPayment);
//   //     setAmountPaid(0);
//   //   }
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const result = await stripe.confirmCardPayment('{PAYMENT_CLIENT_SECRET}', {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: 'Customer Name',
//         },
//       },
//     });
  
//     if (result.error) {
//       setError(result.error.message);
//     } else {
//       // Payment successful
//       setError('');
//       // setPaymentSuccess(true);
//       // Redirect to a success page or display a success message
//       // For example:
//       window.location.replace('/success');
//     }
//   };


//   return (
//     <Elements stripe={stripeLib}>
//     <div>
      
//     <form className="m-5" onSubmit={handleSubmit}>
//     <CardElement />
//      <label htmlFor="amountPaid">Amount Paid:</label>
//         <input
//           type="number"
//           id="amountPaid"
//           value={amountPaid}
//           onChange={(e) => {if (e.target.value) {setAmountPaid(parseInt(e.target.value))}}}
//         />
//          {/* <StripeElement /> */}
//         <button type="submit" disabled={amountOwed === 0 }>
//           Pay
//         </button>

//     </form>
   
//     <table>
//     <thead>
//       <tr>
//         <th>Amount Owed</th>
//         <th>Amount Paid</th>
//         <th>Date of Payment</th>
//         <th>New Amount Owed</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>{amountOwed}</td>
//         <td>{amountPaid}</td>
//         <td>{dateOfPayment}</td>
//         <td>{amountOwed - amountPaid}</td>
//       </tr>
//     </tbody>
//   </table>
//   {error && <p>{error}</p>}
 
//   </div>
//   </Elements>
//   );
// };

// export default DebtRepaymentForm

"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/pay-debt", {
        data: { amount: 89 },
      });
      const clientSecret = data;

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      <button type="submit">Submit</button>
    </form>
  );
}