import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import DashboardPreview from '../components/DashboardPreview';
// import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <DashboardPreview />
        {/* <CallToAction /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
