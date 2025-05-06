import AuthLayout from '@/components/ui/AuthLayout';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <AuthLayout mode="sign-in">
      <SignIn  afterSignInUrl="/dashboard"/>
    </AuthLayout>
  );
}
