import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Award, 
  FileText, 
  Globe, 
  Briefcase, 
  CheckCircle,
  ExternalLink,
  Building
} from 'lucide-react';

type SkillDevelopmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SkillDevelopmentModal: React.FC<SkillDevelopmentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Award className="h-6 w-6 mr-2 text-military" />
            Skill Development Programs for Martyrs' Families
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Information about vocational training and skill development opportunities available for the families of martyrs.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6">
            {/* Eligibility Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-military" />
                Eligibility Criteria
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Family members (spouse, children) of martyrs</li>
                    <li>Age requirements vary by program (typically 18-35)</li>
                    <li>Martyrdom certificate from relevant department required</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Available Programs */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <Building className="h-5 w-5 mr-2 text-military" />
                Programs Available
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-4">
                    <li>
                      <div className="font-medium">Ministry of Skill Development and Entrepreneurship</div>
                      <p className="text-sm text-white/70 mt-1">
                        Offers specialized training through PMKVY (Pradhan Mantri Kaushal Vikas Yojana) with priority for martyrs' families
                      </p>
                    </li>
                    <li>
                      <div className="font-medium">National Skill Development Corporation (NSDC)</div>
                      <p className="text-sm text-white/70 mt-1">
                        Offers vocational courses in various sectors with customized training programs
                      </p>
                    </li>
                    <li>
                      <div className="font-medium">Technical Education Quality Improvement Programme (TEQIP)</div>
                      <p className="text-sm text-white/70 mt-1">
                        Provides support for higher technical education with priority admission and financial assistance
                      </p>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <p className="font-semibold mb-2">For application details, visit:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-military" />
                        <a 
                          href="http://www.msde.gov.in" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-military hover:underline flex items-center"
                        >
                          www.msde.gov.in <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-military" />
                        <a 
                          href="http://www.pmkvyofficial.org" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-military hover:underline flex items-center"
                        >
                          www.pmkvyofficial.org <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Skills Offered */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-military" />
                Skills Offered
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Technical Skills</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Computer applications & IT</li>
                        <li>Electrical & electronics</li>
                        <li>Automotive repair</li>
                        <li>Manufacturing</li>
                        <li>Construction</li>
                        <li>Renewable energy</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Service Sector Skills</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Healthcare & nursing</li>
                        <li>Hospitality management</li>
                        <li>Retail operations</li>
                        <li>Banking & finance</li>
                        <li>Tourism</li>
                        <li>Beauty & wellness</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="font-medium mb-2">Entrepreneurship Development</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Business planning</li>
                      <li>Marketing strategies</li>
                      <li>Financial management</li>
                      <li>Micro-enterprise development</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Required Documents */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2 text-military" />
                Required Documents
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Martyrdom certificate from the relevant department/ministry</li>
                    <li>Identity proof (Aadhaar card/voter ID)</li>
                    <li>Proof of relationship with the martyr</li>
                    <li>Educational certificates</li>
                    <li>Passport-sized photographs</li>
                    <li>Bank account details</li>
                    <li>Residential proof</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-military/20 text-military border-military/30">
                Age: 18-35 years
              </Badge>
              <Badge variant="outline" className="bg-military/20 text-military border-military/30">
                Family Members
              </Badge>
            </div>
            <Button onClick={onClose} className="bg-military hover:bg-military-light">
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDevelopmentModal; 