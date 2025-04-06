import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Book, Award, School } from 'lucide-react';
import ScholarshipModal from '../../components/ScholarshipModal';

const EducationalSupport = () => {
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Educational Support
            </h1>
            <p className="text-white/70">
              Resources and opportunities for the children of martyrs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 text-military" />
                  Scholarships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Special scholarships exclusively for children of martyrs, covering education from school to higher studies.
                </p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                  onClick={() => setIsScholarshipModalOpen(true)}
                >
                  View Scholarships
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 text-military" />
                  Mentorship Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Connect with dedicated mentors who guide children through academic challenges and career choices.
                </p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                >
                  Find a Mentor
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 text-military" />
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Specialized training programs in various skills to enhance employability and personal growth.
                </p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                >
                  Explore Programs
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white hover:bg-[#1A1A1A]/50 transition duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <School className="mr-2 text-military" />
                  School Admissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Priority admission in prestigious schools and colleges with special quota for martyrs' children.
                </p>
                <Button 
                  className="w-full bg-military text-white hover:bg-military-light"
                >
                  View Schools
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Modals */}
      <ScholarshipModal 
        isOpen={isScholarshipModalOpen} 
        onClose={() => setIsScholarshipModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default EducationalSupport;
