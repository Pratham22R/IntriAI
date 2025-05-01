'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Listing from './_components/Listing';

function Dashboard() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      setMessage({ type: 'success', text: '✅ Payment successful! Credits have been added.' });
    } else if (status === 'failure') {
      setMessage({ type: 'error', text: '❌ Payment failed. Please try again.' });
    }

    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="p-6 relative">
      {message && (
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-white shadow-lg z-50 font-medium transition-all duration-300
          ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}
      
      <Listing />
    </div>
  );
}

export default Dashboard;
