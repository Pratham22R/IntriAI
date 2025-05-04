import { Suspense } from 'react';
import SuccessHandler from './SuccessHandler';

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Suspense fallback={<h1 className="text-2xl font-bold">Processing your payment...</h1>}>
        <SuccessHandler />
      </Suspense>
    </div>
  );
}
