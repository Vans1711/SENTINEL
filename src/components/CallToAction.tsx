import React from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 relative bg-[#121212]">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/95 to-military/30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 hero-text-shadow">
            Join Our Mission to Protect <br />
            <span className="text-military">Those Left Behind</span>
          </h2>
          
          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto">
            Whether you're a family member seeking support, a volunteer wanting to make a difference, 
            or an organization looking to partner, join us in ensuring no martyr's family is forgotten.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/families">
              <Button size="lg" className="bg-military text-white hover:bg-military-light flex items-center gap-2 text-base w-full">
                Get Started Now
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/resources/educational-support">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 flex items-center gap-2 text-base w-full">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 