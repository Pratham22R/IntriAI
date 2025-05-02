'use client';
import React, { useState } from 'react';
import { CheckCircle, Star } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyCreditsPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pricingPlans = [
    {
      title: "Starter",
      price: 5,
      credits: 20,
      description: "Perfect for trying things out.",
      features: ["Basic support", "All AI tools", "Instant delivery"],
      popular: false,
    },
    {
      title: "Professional",
      price: 15,
      credits: 100,
      description: "Ideal for regular users.",
      features: ["Priority support", "Advanced features", "Instant delivery"],
      popular: true,
    },
    {
      title: "Enterprise",
      price: 30,
      credits: 250,
      description: "For heavy AI room design usage.",
      features: ["Premium support", "Team usage", "All features unlocked"],
      popular: false,
    },
  ];

  const handlePurchase = (plan) => {
    setSelectedOption(plan);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleStripePayment = async () => {
    setIsLoading(true);
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedOption),
    });

    const data = await res.json();
    setIsLoading(false);

    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert('Stripe checkout failed');
    }
  };

  return (
    <div className="min-h-screen py-5 px-6 md:px-20 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Buy AI Credits
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
          Unlock more AI-generated room designs. Choose a plan that suits your needs and start creating today.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl border p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 ${
              plan.popular ? 'border-transparent ring-2 ring-purple-400/50' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center shadow-sm">
                <Star size={14} className="mr-1" />
                Most Popular
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <p className="text-5xl font-extrabold text-gray-900">${plan.price}</p>
              <p className="text-purple-600 font-semibold mb-6">{plan.credits} credits</p>

              <hr className="my-4 border-gray-200" />

              <ul className="space-y-3 text-sm text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle size={18} className="text-purple-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handlePurchase(plan)}
              className="mt-8 w-full py-3 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="mt-24 max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Confirm Your Plan</h2>
          <p className="text-gray-500 mb-6 text-lg">
            You're about to purchase{' '}
            <span className="font-bold text-purple-600">{selectedOption.credits} credits</span> for{' '}
            <span className="font-bold text-purple-600">${selectedOption.price}</span>.
          </p>

          <button
            onClick={handleStripePayment}
            disabled={isLoading}
            className="inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 hover:scale-105 hover:shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? 'Redirecting…' : 'Proceed to Payment'}
          </button>
        </div>
      )}
    </div>
  );
}
