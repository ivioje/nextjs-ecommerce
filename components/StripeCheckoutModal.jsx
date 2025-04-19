import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutModal = ({ amount, onClose, onPaymentSuccess }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: { 'Content-Type': 'application/json' },
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  useEffect(() => {
    handleCheckout();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow w-full max-w-md">
        <p className="text-center text-lg">Redirecting to secure payment...</p>
        <button onClick={onClose} className="mt-4 text-sm text-blue-600 underline">Cancel</button>
      </div>
    </div>
  );
};

export default StripeCheckoutModal;
