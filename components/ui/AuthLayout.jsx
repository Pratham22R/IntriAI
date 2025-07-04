'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthLayout({ children, mode }) {
  const pathname = usePathname();
  const isSignIn = mode === 'sign-in';

  const leftContent = {
    heading: isSignIn ? 'Welcome Back!' : 'Join the AI-REDESIGN Community',
    subtext: isSignIn
      ? 'Log in to access your personalized dashboard and unleash your creativity.'
      : 'Sign up today and explore the world of AI-powered interior designing tools and inspiration.',
    buttonText: isSignIn ? 'Create an account' : 'Already have an account?',
    buttonHref: isSignIn ? '/sign-up' : '/sign-in',
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Left Panel */}
      <motion.div
        key={pathname}
        initial={{ x: isSignIn ? -100 : 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isSignIn ? 100 : -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-between p-6 sm:p-8 md:p-12"
      >
        <div className="mt-8 md:mt-0 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
            {leftContent.heading}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-white/90 max-w-md mx-auto md:mx-0">
            {leftContent.subtext}
          </p>
        </div>

        <div className="mt-10 md:mt-0 text-center">
          <Link
            href={leftContent.buttonHref}
            className="inline-block border border-white text-white px-5 py-3 rounded-md hover:bg-white hover:text-purple-700 transition font-semibold text-sm sm:text-base"
          >
            {leftContent.buttonText}
          </Link>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm sm:max-w-md"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
