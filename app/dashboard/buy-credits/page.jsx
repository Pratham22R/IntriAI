'use client';
import React, { useState } from 'react';
import { CheckCircle, Star, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyCreditsPage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const plan = {
    title: "Pro Plan",
    price: 10,
    credits: 20,
    description: "Buy 20 credits to generate more AI designs.",
    features: ["Instant Delivery", "All Features", "No Expiry"],
  };

  const freePlan = {
    title: "Free Plan",
    price: 0,
    credits: 3,
    description: "All users are given 3 credits by default.",
    features: ["Basic AI Designs", "No Expiry", "Limited Access"],
  };

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) throw new Error('No email found');

      const creditRes = await fetch('/api/update-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!creditRes.ok) throw new Error('Failed to update credits');

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });

      const data = await res.json();
      setIsLoading(false);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to redirect to Stripe');
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          Get more credits to unlock premium AI room designs instantly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid gap-6 sm:gap-8 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 mt-10"
      >
        {/* Free Plan */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-purple-500 mr-2" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {freePlan.title}
            </h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">{freePlan.description}</p>
          <p className="text-4xl sm:text-5xl font-extrabold text-purple-700">${freePlan.price}</p>
          <p className="text-purple-700 font-medium mb-4">{freePlan.credits} Credits</p>
          <ul className="space-y-2 text-sm text-gray-700 mt-4 mb-6">
            {freePlan.features.map((feature, i) => (
              <li key={i} className="flex items-center justify-center">
                <CheckCircle size={16} className="text-purple-600 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            disabled
            className="w-full py-3 text-gray-500 bg-gray-200 rounded-lg font-semibold cursor-not-allowed"
          >
            Already Active
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white border border-purple-300 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center relative"
        >
          <div className="absolute top-4 right-4">
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
              <Star size={14} className="mr-1" />
              Most Popular
            </span>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Star className="text-purple-600 mr-2" />
            <h2 className="text-xl sm:text-2xl font-bold text-purple-600">{plan.title}</h2>
          </div>
          <p className="text-gray-500 mb-4 text-sm sm:text-base">{plan.description}</p>
          <p className="text-4xl sm:text-5xl font-extrabold text-purple-700">${plan.price}</p>
          <p className="text-purple-700 font-medium mb-4">{plan.credits} Credits</p>
          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center justify-center">
                <CheckCircle size={16} className="text-purple-600 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={handleBuy}
            disabled={isLoading}
            className="w-full py-3 text-white bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Processing…' : 'Buy Credits for $10'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
