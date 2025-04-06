import React from 'react';
import { 
  Shield, 
  Heart, 
  BarChart, 
  MessageCircle, 
  MapPin, 
  AlertTriangle,
  Puzzle
} from 'lucide-react';

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
};

const featureData: Feature[] = [
  {
    icon: Puzzle,
    title: "Resource Matching",
    description: "Intelligent system that automatically matches families with relevant government schemes, NGOs, and support based on their specific needs.",
    color: "text-orange-400"
  },
  {
    icon: Shield,
    title: "Family Protection",
    description: "Real-time monitoring of welfare benefits and financial aid with automated alerts for any discrepancies.",
    color: "text-military"
  },
  {
    icon: Heart,
    title: "Emotional Support",
    description: "AI-driven sentiment analysis to detect emotional distress, providing timely intervention and support.",
    color: "text-red-400"
  },
  {
    icon: BarChart,
    title: "Welfare Tracking",
    description: "Comprehensive dashboards monitoring pension, scholarships, and benefits with transparent status updates.",
    color: "text-green-400"
  },
  {
    icon: MessageCircle,
    title: "Community Connection",
    description: "Connect with volunteers, mentors, and other families to build a supportive community network.",
    color: "text-blue-400"
  },
  {
    icon: MapPin,
    title: "Geo-based Assistance",
    description: "Map-based visualization of nearby resources, support centers, and volunteers for immediate help.",
    color: "text-purple-400"
  },
  {
    icon: AlertTriangle,
    title: "Alert System",
    description: "Automated emergency alert system for critical situations requiring immediate attention.",
    color: "text-yellow-400"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-military">Commitment</span> to Martyr Families
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Sentinel combines technology and human compassion to ensure no martyr's family is left behind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-[#1A1A1A]/80 border border-[#333333] p-6 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center">
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-white/70 text-center">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
