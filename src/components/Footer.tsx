import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#333333]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="md:col-span-1">
            <div className="text-2xl font-montserrat font-bold text-white mb-4">
              <span className="text-military">Sentinel</span>
            </div>
            <p className="text-white/70 mb-4">
              This platform is dedicated to serving the families of India's brave martyrs
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-military transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-military transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-military transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-military transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Home</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-military transition-colors">Home</Link></li>
              <li><Link to="/families" className="text-white/70 hover:text-military transition-colors">Families</Link></li>
              <li><Link to="/welfare-map" className="text-white/70 hover:text-military transition-colors">Welfare Map</Link></li>
              <li><Link to="/volunteer" className="text-white/70 hover:text-military transition-colors">Volunteers</Link></li>
              <li><Link to="/report-concern" className="text-white/70 hover:text-military transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/educational-support" className="text-white/70 hover:text-military transition-colors">Education</Link></li>
              <li><Link to="/resources/financial-aid" className="text-white/70 hover:text-military transition-colors">Financial</Link></li>
              <li><Link to="/resources/counseling-services" className="text-white/70 hover:text-military transition-colors">Emotional Support</Link></li>
              <li><Link to="/language-settings" className="text-white/70 hover:text-military transition-colors flex items-center">
                <Globe className="h-4 w-4 mr-1 text-saffron" /> Language Settings
              </Link></li>
              <li><a href="#" className="text-white/70 hover:text-military transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-military transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-military mr-2 mt-1" />
                <span className="text-white/70">
                  123 Martyr Support Avenue, New Delhi, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-military mr-2" />
                <span className="text-white/70">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-military mr-2" />
                <span className="text-white/70">support@sentinel.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#333333]/30 mt-12 pt-8 text-center text-white/50">
          <p>© 2023 Sentinel: Deshbhakt Seva. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Dedicated to the families of India's brave martyrs. Jai Hind! 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
