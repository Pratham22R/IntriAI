'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  const credits = searchParams.get('credits');
  const price = searchParams.get('price');
  const title = searchParams.get('title');

  useEffect(() => {
    const updateCredits = async () => {
      if (!credits || !price || !title) {
        console.error('Missing query parameters for credits update');
        router.push('/dashboard?status=failure');
        return;
      }

      try {
        const token = await getToken();  // ✅ Get Clerk token

        const res = await fetch('/api/credits/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // ✅ Add token to Authorization header
          },
          body: JSON.stringify({ credits, price, title }),
        });

        let data;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (res.ok) {
          router.push('/dashboard?status=success');
        } else {
          console.error('Failed to update credits:', data?.error || 'Unknown error');
          router.push('/dashboard?status=failure');
        }

      } catch (err) {
        console.error('Error updating credits:', err);
        router.push('/dashboard?status=failure');
      }
    };

    updateCredits();
  }, [credits, price, title, router, getToken]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Processing your payment...</h1>
    </div>
  );
}
