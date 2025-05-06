'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-6 text-center">
      <CheckCircle className="text-green-500" size={80} />
      <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mt-6">Payment Successful!</h1>
      <p className="text-gray-600 mt-2 mb-8 max-w-md">
        Thank you for your purchase. Your credits have been added successfully. You can now continue generating AI designs.
      </p>
      <button
        onClick={() => router.push('/dashboard')}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
