'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function SuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getToken } = useAuth();

  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateCredits = async () => {
      if (!sessionId) {
        console.error('Missing session ID');
        router.push('/dashboard?status=failure');
        return;
      }

      try {
        const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const session = await res.json();

        if (!session?.metadata) {
          console.error('Missing session metadata');
          router.push('/dashboard?status=failure');
          return;
        }

        const { credits, price, title } = session.metadata;
        const token = await getToken();

        const updateRes = await fetch('/api/credits/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ credits, price, title }),
        });

        if (updateRes.ok) {
          router.push('/dashboard?status=success');
        } else {
          router.push('/dashboard?status=failure');
        }

      } catch (err) {
        console.error('Error processing success:', err);
        router.push('/dashboard?status=failure');
      } finally {
        setLoading(false);
      }
    };

    updateCredits();
  }, [sessionId, getToken, router]);

  return (
    <h1 className="text-2xl font-bold">
      {loading ? 'Processing your payment...' : 'Redirecting...'}
    </h1>
  );
}
