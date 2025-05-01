'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyCreditsPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const pricingPlans = [
    {
      title: "Starter",
      price: 5,
      credits: 20,
      description: "Perfect for trying things out.",
      popular: false,
    },
    {
      title: "Professional",
      price: 15,
      credits: 100,
      description: "Ideal for regular users.",
      popular: true,
    },
    {
      title: "Enterprise",
      price: 30,
      credits: 250,
      description: "For heavy AI room design usage.",
      popular: false,
    },
  ];

  const handlePurchase = (plan) => {
    setSelectedOption(plan);
  };

  const handleStripePayment = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedOption),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url; // redirect to Stripe Checkout
    } else {
      alert('Stripe checkout failed');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Buy More Credits</h1>
        <p className="text-gray-600 mt-2">Choose the right plan to unlock more AI-powered room designs</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between border ${plan.popular ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200'
              } transition-transform duration-200 hover:scale-105`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              <p className="text-3xl font-extrabold text-gray-900">${plan.price}</p>
              <p className="text-gray-600 mt-1">{plan.credits} credits</p>
            </div>

            <button
              onClick={() => handlePurchase(plan)}
              className={`mt-6 w-full px-4 py-2 text-white font-semibold rounded-xl ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'
                } transition-colors duration-200`}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Selected Plan: <span className="text-blue-600">{selectedOption.title}</span>
          </h2>
          <p className="text-gray-600 mb-6">You are about to buy <strong>{selectedOption.credits}</strong> credits for <strong>${selectedOption.price}</strong></p>

          <button
            onClick={handleStripePayment}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Pay with Stripe
          </button>
        </div>
      )}
    </div>
  );
}
