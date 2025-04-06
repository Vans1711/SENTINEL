import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Home, CreditCard, FileText } from 'lucide-react';
import PensionModal from '@/components/PensionModal';

const FinancialAid = () => {
  const [isPensionModalOpen, setIsPensionModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Financial Aid</h1>
            <p className="text-white/70">Financial support programs for martyr families</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 text-military" />
                  Government Pensions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Information and assistance regarding government pension schemes for families of martyrs.</p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                  onClick={() => setIsPensionModalOpen(true)}
                >
                  Pension Details
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="mr-2 text-military" />
                  Housing Assistance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Special housing schemes and subsidies available for martyr families.</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">Housing Schemes</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 text-military" />
                  Special Loans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Low-interest loans for education, business, and personal needs specifically for martyr families.</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">Loan Programs</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 text-military" />
                  Documentation Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Assistance with preparing and submitting documents for various financial benefits.</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">Get Assistance</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Pension Modal */}
      <PensionModal 
        isOpen={isPensionModalOpen} 
        onClose={() => setIsPensionModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default FinancialAid;
