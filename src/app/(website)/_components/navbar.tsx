"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Check } from 'lucide-react';
import Link from 'next/link'
const services = [
  { title: 'Real Time Video Recording & Streaming', image: '/d1.jpg' },
  { title: 'Workspaces for Team Collaboration', image: '/d5.jpeg' },
  { title: 'AI Transcriptions for Videos', image: '/d2.jpeg' },
  { title: 'AI Video Summary & Titles', image: '/d4.png' },
  { title: 'Upload Videos to AWS', image: '/d4.jpeg' }
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Video Recording & Streaming',
      'Basic Storage (2GB)',
      'One-time AI Transcription',
      'One-time AI Summary',
      'Basic Support'
    ]
  },
  {
    name: 'Pro',
    price: '$5',
    features: [
      'Everything in Free',
      'Unlimited AI Transcriptions',
      'Unlimited AI Summaries',
      'Advanced Storage (50GB)',
      'Priority Support',
      'Team Collaboration'
    ]
  }
];

const LandingPageNavBar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const visibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % services.length;
      slides.push(services[index]);
    }
    return slides;
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="flex w-full justify-between items-center p-4 bg-black border-b border-white/10 fixed top-0 z-50">
        <div className="text-2xl font-bold flex items-center gap-x-3 text-white">
          <img
            alt="logo"
            src="/logo.svg"
            className="ml-2 w-10 h-10 transform hover:scale-110 transition-transform duration-300"
          />
          <span className="text-white">VidSphere</span>
        </div>

        <div className="hidden gap-x-8 items-center lg:flex">
          {[
            { name: 'Home', section: 'home' },
            { name: 'Pricing', section: 'pricing' },
            { name: 'Contact', section: 'contact' }
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.section)}
              className="text-gray-300 hover:text-white transform hover:scale-105 transition-all duration-300 text-lg"
            >
              {item.name}
            </button>
          ))}
        </div>
        <Link href="/auth/sign-in">
        <Button 
          onClick={() => {}} 
          className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-none transform hover:scale-105 transition-all duration-300"
        >
          <User className="mr-2 h-5 w-5" />
          Login
        </Button>
        </Link>
      </nav>

      <div id="home" className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 transform hover:scale-105 transition-transform duration-300">
            WHAT WILL YOU DO TODAY?
          </h2>
        </div>

        <div className="relative px-12">
          <div className="flex gap-6 transition-all duration-500">
            {visibleSlides().map((service, index) => (
              <div 
                key={index}
                className="flex-1 bg-white/5 backdrop-blur-sm rounded-none overflow-hidden transform hover:scale-105 transition-all duration-500 border border-white/10"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 transform hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-none shadow-lg z-10 transform hover:scale-110 hover:bg-gray-200 transition-all duration-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-none shadow-lg z-10 transform hover:scale-110 hover:bg-gray-200 transition-all duration-300"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name} 
              className={`border border-white/10 p-8 backdrop-blur-sm hover:border-white/30 transition-all duration-300 ${
                plan.name === 'Pro' ? 'bg-white/5' : ''
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-white mb-6">
                {plan.price}
                {plan.name === 'Pro' && <span className="text-sm">/month</span>}
              </p>
              <ul className="space-y-4 min-h-[280px]">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-center gap-2">
                    <Check className="h-4 w-4 text-white" />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* <Button className="w-full mt-8 bg-white text-black hover:bg-gray-200 rounded-none transform hover:scale-105 transition-all duration-300">
                {plan.name === 'Free' ? 'Get Started' : 'Upgrade to Pro'}
              </Button> */}
            </div>
          ))}
        </div>
      </div>

      <footer id="contact" className="border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="py-12 border-b border-white/10">
            <div className="flex items-center gap-3 justify-center">
              <img
                alt="logo"
                src="/logo.svg"
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-white">VidSphere</span>
            </div>
            <p className="text-gray-400 text-center mt-4 max-w-xl mx-auto">
              Transform your video content with AI-powered tools. Record, transcribe, and summarize with ease.
            </p>
          </div>

          <div className="py-12 border-b border-white/10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-300">
              <a href="mailto: hiteshwarmd@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
                <Mail className="h-5 w-5" />
                hiteshwarmd@gmail.com
              </a>
              <span className="hidden md:inline text-white/20">|</span>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                9310547634
              </div>
              <span className="hidden md:inline text-white/20">|</span>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Noida, India
              </div>
            </div>
          </div>

          <div className="py-6 text-center text-gray-400">
            <p>© 2025 VidSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageNavBar;