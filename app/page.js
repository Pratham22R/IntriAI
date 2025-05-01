'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in?redirect_url=/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-96 h-96 bg-purple-500 opacity-20 rounded-full top-[-10%] left-[-10%] blur-3xl animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-500 opacity-20 rounded-full bottom-[-5%] right-[-10%] blur-2xl animate-pulse"></div>
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-white hover:text-gray-300 transition-all">AI-Room Design</h1>
        <nav className="space-x-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-12 md:py-24 z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
        >
          <span className="bg-gradient-to-r from-fuchsia-500 via-blue-500 to-white bg-clip-text text-transparent">
            AI-Powered Interior
          </span>{' '}
          <span className="text-white">Regeneration</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8"
        >
          Reimagine your space using advanced artificial intelligence. Upload your room and get stunning redesigns instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex gap-6 mb-12"
        >
          <button
            onClick={handleGetStarted}
            className="relative px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-shadow shadow-xl"
          >
            <span className="z-10 relative">Get Started</span>
            <span className="absolute inset-0 rounded-full border-2 border-purple-500 blur-sm animate-pulse opacity-50"></span>
          </button>
          <button className="border border-white px-8 py-4 rounded-full text-lg font-semibold text-white hover:bg-white hover:text-black transition-all">
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
        >
          <Image
            src="/luxurious-office-with-modern-furnishings-architecture_7023-479468__1_-removebg-preview.png"
            alt="AI Interior Design"
            width={800}
            height={600}
            className="rounded-xl shadow-2xl object-cover z-10"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-black text-center">
        <h2 className="text-4xl font-extrabold text-white mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Real-time Design</h3>
            <p className="text-lg text-gray-300">
              Our AI engine allows you to instantly visualize room transformations. You can see changes in real-time, with the ability to experiment with different styles.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Personalized Themes</h3>
            <p className="text-lg text-gray-300">
              Choose from a variety of customizable themes, such as contemporary, minimalist, industrial, and more. The AI suggests adjustments based on your preferences.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">High-quality Visualization</h3>
            <p className="text-lg text-gray-300">
              Our platform uses cutting-edge rendering technology to provide photorealistic images, ensuring you get an accurate representation of your transformed space.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 text-center bg-gradient-to-r bg-black">
        <h2 className="text-4xl font-extrabold text-white mb-8">About Us</h2>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          At AI-Room, we're revolutionizing interior design with artificial intelligence. Our mission is to make home and office redesigns more accessible, faster, and more personalized. Whether you're a homeowner or a designer, our platform empowers you to reimagine spaces effortlessly, blending technology with creativity.
        </p>
        <div className="mt-10">
          <a href="/learn-more" className="inline-block py-3 px-8 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all">
            Discover Our Vision
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black text-white py-20 px-6">
  <h2 className="text-4xl font-extrabold text-center mb-4">Contact Us</h2>
  <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
    Have questions or ideas? Our team is here to help you get started.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    {/* Contact Info */}
    <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-purple-800/30 shadow-xl">
      <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
      <p className="text-gray-400 mb-6">Reach out to us through any of these channels. We typically respond within 24 hours.</p>

      <div className="space-y-6 text-gray-300">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-800 rounded-full">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">Email</p>
            <p className="text-sm">support@ai-room.com</p>
            <p className="text-xs text-gray-500">We’ll get back to you within 24 hours.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-800 rounded-full">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l4-8H5.4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">Phone</p>
            <p className="text-sm">+1 (555) 123-4567</p>
            <p className="text-xs text-gray-500">Mon–Fri | 9:00 AM – 6:00 PM (EST)</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-gray-800 rounded-full">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10a8 8 0 10-16 0c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-white">Office Address</p>
            <p className="text-sm">123 Tech Park, Suite 456</p>
            <p className="text-sm">San Francisco, CA 94107</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 mt-6">
          <p className="font-medium text-white mb-2">Follow us</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-purple-400 text-gray-400">Twitter</a>
            <a href="#" className="hover:text-purple-400 text-gray-400">LinkedIn</a>
            <a href="#" className="hover:text-purple-400 text-gray-400">Instagram</a>
          </div>
        </div>
      </div>
    </div>

    {/* Contact Form */}
    <form className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-blue-600/30 shadow-xl space-y-6">
      <h3 className="text-2xl font-semibold mb-4">Send us a message</h3>
      <p className="text-gray-400 text-sm mb-4">Fill out the form and we’ll get back to you shortly.</p>

      <div>
        <label className="block text-sm mb-1" htmlFor="name">Name</label>
        <input type="text" id="name" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Your name" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="email">Email</label>
        <input type="email" id="email" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="you@example.com" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="phone">Phone (optional)</label>
        <input type="text" id="phone" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="(555) 123-4567" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="subject">Subject</label>
        <input type="text" id="subject" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="How can we help you?" />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="message">Message</label>
        <textarea id="message" rows="4" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600" placeholder="Please provide details about your inquiry..."></textarea>
      </div>

      <button type="submit" className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:opacity-90 transition-all">
        Send Message
      </button>
    </form>
  </div>
</section>

    </main>
  );
}
