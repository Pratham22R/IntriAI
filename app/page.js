'use client';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
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
   const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] bg-purple-800 opacity-20 rounded-full top-[-20%] left-[-30%] blur-[250px] animate-pulse"></div>
        <div className="absolute w-[900px] h-[900px] bg-blue-500 opacity-20 rounded-full bottom-[-20%] right-[-25%] blur-[220px] animate-pulse"></div>
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-10 py-4 bg-black text-white shadow-lg z-10 relative">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg px-2 py-1 font-bold text-lg">
            AI
          </div>
          <span className="text-xl font-semibold hover:text-gray-300 transition-colors">
            IntriAI
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a>
          <a href="#about" className="text-gray-300 hover:text-purple-400 transition-colors">About</a>
          <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          <button onClick={handleGetStarted} className="border border-purple-500 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all">
            Sign In
          </button>
          <button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center space-x-1">
            <span>Sign Up</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Hamburger Button - Mobile Only */}
        <div className="md:hidden">
          <button onClick={() => setDrawerOpen(true)} aria-label="Open Menu">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>


      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-12 md:py-24 z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight"
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
          className="text-md sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-8"
        >
          Reimagine your space using advanced artificial intelligence. Upload your room and get stunning redesigns instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <button
            onClick={handleGetStarted}
            className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-shadow shadow-xl"
          >
            <span className="z-10 relative">Get Started</span>
            <span className="absolute inset-0 rounded-full border-2 border-purple-500 blur-sm animate-pulse opacity-50"></span>
          </button>
          <button
            onClick={() => router.push("#about")}
            className="border border-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-semibold text-white hover:bg-white hover:text-black transition-all"
          >
            Learn More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8 }}
          className="w-full max-w-[800px] px-4"
        >
          <Image
            src="/luxurious-office-with-modern-furnishings-architecture_7023-479468__1_-removebg-preview.png"
            alt="AI Interior Design"
            width={800}
            height={600}
            className="rounded-xl shadow-2xl object-cover w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 sm:px-8 md:px-12 bg-black text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              title: "Real-time Design",
              desc: "Instantly visualize room transformations. Experiment with styles in real-time.",
            },
            {
              title: "Personalized Themes",
              desc: "Choose customizable themes: contemporary, minimalist, industrial, and more.",
            },
            {
              title: "High-quality Visualization",
              desc: "Photorealistic images powered by cutting-edge rendering technology.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-r from-purple-700/30 to-blue-600/30 p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-in-out group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500"></div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-lg text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr
        className="my-12 mx-auto w-2/3 border-t-2 border-transparent"
        style={{
          background: 'linear-gradient(to right, rgb(126, 58, 242), rgb(29, 78, 216))',
          height: '2px',
          boxShadow: '0 0 10px rgba(126, 58, 242, 0.7), 0 0 20px rgba(29, 78, 216, 0.7)',
        }}
      />

      {/* About Us Section */}
      <section id="about" className="py-20 bg-black text-white text-center px-6 sm:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8">About Us</h2>
        <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          At AI-Room Design, we’re passionate about using AI to make interior design effortless and accessible. Upload a photo — we do the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Who We Are</h3>
            <p className="text-gray-300">
              A team of interior design lovers, AI engineers, and builders crafting tools that let anyone reimagine their living space with a few clicks.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Our Mission</h3>
            <p className="text-gray-300">
              We’re on a mission to democratize interior design. From DIY decorators to pro designers — we give everyone powerful tools to redesign with ease.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-extrabold mb-10">Meet Our Team</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-12 items-center">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="overflow-hidden rounded-full w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 transition-transform transform hover:scale-110 shadow-lg">
                <Image
                  src="/pratham.jpeg"
                  alt="Pratham Raghuvanshi"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="font-semibold text-lg text-white">Pratham Raghuvanshi</h4>
              <p className="text-gray-400 text-sm">Designer N Developer</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="overflow-hidden rounded-full w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 transition-transform transform hover:scale-110 shadow-lg">
                <Image
                  src="/shatakshi.jpeg"
                  alt="Shatakshi Rajput"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h4 className="font-semibold text-lg text-white">Shatakshi Rajput</h4>
              <p className="text-gray-400 text-sm">Developer</p>
            </div>
          </div>
        </div>
      </section>



      <hr
        className="my-8 mx-auto w-1/2 border-t-2 border-transparent"
        style={{
          background: 'linear-gradient(to right, rgb(126, 58, 242), rgb(29, 78, 216))',
          height: '2px',
          boxShadow: '0 0 10px rgba(126, 58, 242, 0.7), 0 0 20px rgba(29, 78, 216, 0.7)',
        }}
      />


      {/* Divider */}
      <hr
        className="my-12 mx-auto w-2/3 border-t-2 border-transparent"
        style={{
          background: 'linear-gradient(to right, rgb(126, 58, 242), rgb(29, 78, 216))',
          height: '2px',
          boxShadow: '0 0 10px rgba(126, 58, 242, 0.7), 0 0 20px rgba(29, 78, 216, 0.7)',
        }}
      />

      {/* Contact Section */}
      <section id="contact" className="bg-black text-white py-20 px-6 sm:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">Contact Us</h2>
        <p className="text-base sm:text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Have questions or ideas? Our team is here to help you get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-purple-800/30 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <p className="text-gray-400 mb-6">Reach out to us via email, phone, or visit our office. We typically respond within 24 hours.</p>

            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-sm">support@ai-room.com</p>
                  <p className="text-xs text-gray-500">We’ll reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-xs text-gray-500">Mon–Fri | 9:00 AM – 6:00 PM EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <p className="font-medium text-white">Office Address</p>
                  <p className="text-sm">123 Tech Park, Suite 456</p>
                  <p className="text-sm">India 94107</p>
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
              <label htmlFor="name" className="block text-sm mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm mb-1">Phone (optional)</label>
              <input
                type="text"
                id="phone"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Please provide details about your inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:opacity-90 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and Socials */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                AI
              </div>
              <span className="ml-2 font-semibold text-lg">AI-Room Design</span>
            </div>
            <p className="text-sm mb-4 text-gray-300">
              Transforming room design with AI. Upload your room and get stunning redesigns instantly.
            </p>
            <div className="flex space-x-4 text-gray-400 mt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Icon
                  key={index}
                  className="w-5 h-5 hover:text-white transition-transform duration-300 transform hover:scale-125 cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {["About Us", "Careers", "Blog", "Press"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Help Center", "Documentation", "API Reference", "Contact Support"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center hover:text-white transition">
                <Mail className="w-4 h-4 mr-2" />
                info@airoomdesign.com
              </li>
              <li className="flex items-center hover:text-white transition">
                <Phone className="w-4 h-4 mr-2" />
                +1 (234) 567-890
              </li>
              <li className="flex items-center hover:text-white transition">
                <MapPin className="w-4 h-4 mr-2" />
                123 Room Lane, Interior City, CA 90210
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <p className="text-center mb-4 md:mb-0">© 2025 AI-Room Design. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-white transition duration-300 hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>


      {/* Mobile Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: drawerOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-64 bg-black z-50 shadow-lg p-6 flex flex-col space-y-6 md:hidden"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={() => setDrawerOpen(false)} aria-label="Close Menu">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 text-sm font-medium">
          <a href="#features" onClick={() => setDrawerOpen(false)} className="text-gray-300 hover:text-purple-400">Features</a>
          <a href="#about" onClick={() => setDrawerOpen(false)} className="text-gray-300 hover:text-purple-400">About</a>
          <a href="#contact" onClick={() => setDrawerOpen(false)} className="text-gray-300 hover:text-purple-400">Contact</a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => {
              handleGetStarted();
              setDrawerOpen(false);
            }}
            className="border border-purple-500 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              handleGetStarted();
              setDrawerOpen(false);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </main>
  );
}
