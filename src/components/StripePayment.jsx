import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader, Lock, CreditCard } from 'lucide-react';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CardForm = ({ amount, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError(null);

        // In a real app, you would create a PaymentIntent on your backend and get the clientSecret.
        // Here we simulate the frontend card validation and tokenization for demonstration.

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            console.log('[PaymentMethod]', paymentMethod);

            // Simulate backend processing delay
            setTimeout(() => {
                setLoading(false);
                onSuccess(amount);
            }, 1500);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-bl-lg z-10">
                    TEST MODE
                </div>
                <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <CreditCard size={16} className="text-slate-500" /> Card Details
                    </label>
                    <div className="flex gap-1">
                        {/* Simple visual cues for accepted cards */}
                        <div className="w-8 h-5 bg-slate-200 rounded"></div>
                        <div className="w-8 h-5 bg-slate-200 rounded"></div>
                    </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 transition-all">
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
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                {error && <div className="text-red-500 text-xs mt-2 font-medium">{error}</div>}
            </div>

            <div className="flex flex-col gap-3">
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <>
                            <Lock size={18} /> Pay ₦ {amount}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="text-slate-500 font-bold text-sm hover:text-slate-700 py-2"
                >
                    Cancel
                </button>
            </div>

            <div className="text-center">
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <Lock size={10} /> Secured by Stripe
                </p>
            </div>
        </form>
    );
};

export default function StripePayment({ amount, onSuccess, onCancel }) {
    return (
        <div className="w-full">
            <Elements stripe={stripePromise}>
                <CardForm amount={amount} onSuccess={onSuccess} onCancel={onCancel} />
            </Elements>
        </div>
    );
}
