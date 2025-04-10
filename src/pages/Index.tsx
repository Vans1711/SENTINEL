import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import DashboardPreview from '../components/DashboardPreview';
// import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
        <Card className="hover:bg-[#1A1A1A]/70 transition-colors border-military/30">
          <CardContent className="p-6 space-y-3">
            <Shield className="h-6 w-6 text-military" />
            <h3 className="font-bold text-xl">Martyr Families</h3>
            <p className="text-white/70">Access the complete directory of martyrs and their families. Honor their sacrifice and connect with them.</p>
            <Button variant="link" className="text-military p-0 flex items-center" asChild>
              <Link to="/martyr-family-list">
                View Directory
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
