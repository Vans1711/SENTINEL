
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  relation: string;
  imageSrc: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Sentinel has been a lifeline for us. After my husband's sacrifice, I felt lost in bureaucracy, but now I have advocates who ensure we receive our rightful benefits.",
    name: "Pratibha Singh",
    relation: "Wife of Major Ajay Singh",
    imageSrc: "/testimonial-1.jpg" // Placeholder
  },
  {
    id: 2,
    quote: "The volunteer network helped my children access educational scholarships I never knew existed. They check on us regularly, making us feel we're not forgotten.",
    name: "Lakshmi Rawat",
    relation: "Mother of Lt. Vikram Rawat",
    imageSrc: "/testimonial-2.jpg" // Placeholder
  },
  {
    id: 3,
    quote: "When pension delays began affecting our livelihood, Sentinel's alert system notified authorities immediately. The issue was resolved within days.",
    name: "Rajesh Khanna",
    relation: "Father of Captain Rohit Khanna",
    imageSrc: "/testimonial-3.jpg" // Placeholder
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#121212]">
      {/* Background */}
      <div className="absolute inset-0 bg-military/5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real <span className="text-military">Stories</span>, Real <span className="text-military">Impact</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Hear from the families who have experienced the support and vigilance of our Sentinel program.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-[#1A1A1A]/80 border-[#333333] overflow-hidden relative">
              <CardContent className="p-6">
                <Quote className="text-military/60 w-8 h-8 absolute top-4 left-4" />
                <div className="pt-8">
                  <p className="text-white/90 italic mb-6">"{testimonial.quote}"</p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-military flex items-center justify-center mr-4">
                      {/* Placeholder for image */}
                      <span className="text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-white/70">{testimonial.relation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
