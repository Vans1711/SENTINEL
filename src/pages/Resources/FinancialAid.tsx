import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Home, CreditCard, FileText } from 'lucide-react';
import PensionModal from '@/components/PensionModal';
import { useTranslation } from 'react-i18next';

const FinancialAid = () => {
  const [isPensionModalOpen, setIsPensionModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">{t('resources.financial_aid_page.title')}</h1>
            <p className="text-white/70">{t('resources.financial_aid_page.description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 text-military" />
                  {t('resources.financial_aid_page.govt_pensions')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('resources.financial_aid_page.govt_pensions_desc')}</p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                  onClick={() => setIsPensionModalOpen(true)}
                >
                  {t('resources.financial_aid_page.pension_details')}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="mr-2 text-military" />
                  {t('resources.financial_aid_page.housing_assistance')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('resources.financial_aid_page.housing_assistance_desc')}</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">{t('resources.financial_aid_page.housing_schemes')}</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 text-military" />
                  {t('resources.financial_aid_page.special_loans')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('resources.financial_aid_page.special_loans_desc')}</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">{t('resources.financial_aid_page.loan_programs')}</Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/80 border-[#333333] text-white hover:bg-[#1A1A1A] transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 text-military" />
                  {t('resources.financial_aid_page.documentation_help')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('resources.financial_aid_page.documentation_help_desc')}</p>
                <Button className="w-full bg-military text-white hover:bg-military-light">{t('resources.financial_aid_page.get_assistance')}</Button>
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
