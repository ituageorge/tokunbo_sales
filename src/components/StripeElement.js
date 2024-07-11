import { CardElement } from '@stripe/stripe-js'

const StripeElement = () => {
  return (
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
        },
      }}
    />
  )
}

export default StripeElement