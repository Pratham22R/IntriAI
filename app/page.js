'use client';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating orbs background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[1500px] h-[1500px] bg-purple-800 opacity-20 rounded-full top-[-30%] left-[-40%] blur-[300px] animate-pulse"></div>
        <div className="absolute w-[1200px] h-[1200px] bg-blue-500 opacity-20 rounded-full bottom-[-30%] right-[-35%] blur-[280px] animate-pulse"></div>
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-4 bg-black text-white shadow-lg">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg px-2 py-1 font-bold text-lg">
            AI
          </div>
          <span className="text-xl font-semibold hover:text-gray-300 transition-colors">AI-Room Design</span>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8 text-sm font-medium">
          <a
            href="#features"
            className="relative text-gray-300 hover:text-purple-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all hover:after:w-full"
          >
            Features
          </a>
          <a
            href="#about"
            className="relative text-gray-300 hover:text-purple-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all hover:after:w-full"
          >
            About
          </a>
          <a
            href="#contact"
            className="relative text-gray-300 hover:text-purple-400 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all hover:after:w-full"
          >
            Contact
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button onClick={handleGetStarted} className="border border-purple-500 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 hover:shadow-lg">
            Sign In
          </button>
          <button onClick={handleGetStarted} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-1 hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-lg">
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
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
        <h2 className="text-4xl font-extrabold text-white mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Real-time Design",
              desc: "Our AI engine allows you to instantly visualize room transformations. You can see changes in real-time, with the ability to experiment with different styles.",
            },
            {
              title: "Personalized Themes",
              desc: "Choose from a variety of customizable themes, such as contemporary, minimalist, industrial, and more. The AI suggests adjustments based on your preferences.",
            },
            {
              title: "High-quality Visualization",
              desc: "Our platform uses cutting-edge rendering technology to provide photorealistic images, ensuring you get an accurate representation of your transformed space.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-r from-purple-700/30 to-blue-600/30 p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 ease-in-out transform group overflow-hidden"
            >
              {/* Extra glassy shine effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500"></div>
              <h3 className="text-2xl font-semibold mb-4 text-white group-hover:rotate-[-1deg] group-hover:scale-105 transition-all duration-500">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-all duration-500">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20 px-6 text-center bg-gradient-to-r bg-black">
        <h2 className="text-4xl font-extrabold text-white mb-8">About Us</h2>
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
          At AI-Room, we're revolutionizing interior design with artificial intelligence. Our mission is to make home and office redesigns more accessible, faster, and more personalized. Whether you're a homeowner or a designer, our platform empowers you to reimagine spaces effortlessly, blending technology with creativity.
        </p>
        <div className="mt-10">
          <button
            onClick={handleGetStarted} className=" py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:opacity-90 transition-all">
            <a href="/learn-more" className="inline-block py-3 px-8 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all cursor-pointer">
              Discover Our Vision
            </a> </button>
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
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand and Socials */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                AI
              </div>
              <span className="ml-2 font-semibold text-lg">AI-Room Design</span>
            </div>
            <p className="text-sm mb-4 text-gray-300">
              Transforming Room Design with AI. Upload your room and get stunning redesigns instantly.
            </p>
            <div className="flex space-x-3 text-gray-400">
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
            <h3 className="font-semibold mb-3">Company</h3>
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
            <h3 className="font-semibold mb-3">Resources</h3>
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
            <h3 className="font-semibold mb-3">Contact</h3>
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
                123 Restaurant Ave, Foodie City, FC 12345, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-800 pt-6 pb-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto">
          <p className="text-center">© 2025 AI-Room Design. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
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

    </main>
  );
}
