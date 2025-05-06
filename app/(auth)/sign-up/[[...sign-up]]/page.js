import AuthLayout from '@/components/ui/AuthLayout';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <AuthLayout mode="sign-up">
      <SignUp  afterSignInUrl="/dashboard"  />
    </AuthLayout>
  );
}
