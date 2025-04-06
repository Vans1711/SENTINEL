import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, PhoneCall } from 'lucide-react';
import CounselorsModal from '@/components/CounselorsModal';
import HelplineModal from '@/components/HelplineModal';

const CounselingServices = () => {
  const [counselorsModalOpen, setCounselorsModalOpen] = useState(false);
  const [helplineModalOpen, setHelplineModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Counseling Services</h1>
            <p className="text-white/70">Emotional and psychological support for martyr families</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 text-military" />
                  Grief Counseling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Professional support to help family members cope with loss and navigate through grief.</p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                  onClick={() => setCounselorsModalOpen(true)}
                >
                  Find Counselor
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 text-military" />
                  Support Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Connect with other families who have experienced similar loss for mutual support.</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">Join Groups</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 text-military" />
                  Scheduled Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Regular therapy sessions tailored to address the unique challenges faced by martyr families.</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">Schedule Session</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PhoneCall className="mr-2 text-military" />
                  24/7 Helpline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Immediate emotional support available round-the-clock through our dedicated helpline.</p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                  onClick={() => setHelplineModalOpen(true)}
                >
                  Helpline Numbers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <CounselorsModal isOpen={counselorsModalOpen} onClose={() => setCounselorsModalOpen(false)} />
      <HelplineModal isOpen={helplineModalOpen} onClose={() => setHelplineModalOpen(false)} />
      
      <Footer />
    </div>
  );
};

export default CounselingServices;
