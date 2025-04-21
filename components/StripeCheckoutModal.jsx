import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAppContext } from '@/context/AppContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAppContext()

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const token = getToken();
        console.log("Amount before API call:", amount);
        console.log('Received request for Stripe intent', token);

        const response = await axios.post('/api/stripe/create-payment-intent', 
            { amount: amount }, 
            { headers: {Authorization: `Bearer ${token}`} 
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message)
      }
    };
    if (amount) createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log('result', result)

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      onPaymentSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading || amount === 0}
        className="bg-gray-600 text-white py-2 px-4 rounded w-full disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Pay with Card'}
      </button>
    </form>
  );
};

const StripeInlinePayment = ({ amount, onPaymentSuccess }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} onPaymentSuccess={onPaymentSuccess} />
  </Elements>
);

export default StripeInlinePayment;
