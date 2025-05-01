'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const updateCredits = async () => {
      try {
        const res = await fetch('/api/credits/update', {
          method: 'POST',
        });
        const data = await res.json();

        if (data.success) {
          router.push('/dashboard?status=success');
        } else {
          router.push('/dashboard?status=failure');
        }
      } catch (err) {
        router.push('/dashboard?status=failure');
      }
    };

    updateCredits();
  }, []);

  return (
    <div className="text-center py-20 text-gray-600">
      Processing your payment...
    </div>
  );
}
