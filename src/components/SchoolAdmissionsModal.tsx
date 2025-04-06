import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  School, 
  FileText, 
  Globe, 
  Percentage, 
  CheckCircle,
  ExternalLink,
  Building,
  GraduationCap
} from 'lucide-react';

type SchoolAdmissionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SchoolAdmissionsModal: React.FC<SchoolAdmissionsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <School className="h-6 w-6 mr-2 text-military" />
            School Admissions for Martyr's Children
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Information about priority admissions and educational benefits available for children of martyrs.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[calc(90vh-200px)] pr-4">
          <div className="space-y-6">
            {/* Eligibility Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-military" />
                Eligibility for Priority Admissions
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Children of defense/paramilitary/police personnel killed in action</li>
                    <li>Age-appropriate for the educational institution</li>
                    <li>Verification through service certificate and martyrdom certificate</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Available Benefits */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <Percentage className="h-5 w-5 mr-2 text-military" />
                Available Benefits
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>5% reservation in most Kendriya Vidyalayas</li>
                    <li>Special quotas in Sainik Schools</li>
                    <li>Priority admission in military schools</li>
                    <li>Fee concessions/scholarships in many private institutions</li>
                    <li>Reserved seats in technical and medical institutions through Central/State quotas</li>
                  </ul>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="font-semibold mb-2">For Kendriya Vidyalaya admissions:</p>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-military" />
                        <a 
                          href="http://www.kvsangathan.nic.in" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-military hover:underline flex items-center"
                        >
                          www.kvsangathan.nic.in <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-semibold mb-2">For Sainik Schools:</p>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-military" />
                        <a 
                          href="http://www.sainikschooladmission.in" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-military hover:underline flex items-center"
                        >
                          www.sainikschooladmission.in <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Types of Schools */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <Building className="h-5 w-5 mr-2 text-military" />
                Types of Educational Institutions
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Kendriya Vidyalayas (KVs)</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                        <li>Central government-run schools with quality education</li>
                        <li>Present across India with consistent curriculum</li>
                        <li>5% quota for martyrs' children</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Sainik Schools</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                        <li>Residential schools preparing students for defense services</li>
                        <li>Special consideration for children of defense personnel</li>
                        <li>Military-oriented discipline and training</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Army Public Schools</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                        <li>Run by the Army Welfare Education Society</li>
                        <li>Priority admission for army personnel's children</li>
                        <li>Quality education with military values</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Higher Technical/Medical Institutions</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                        <li>Reserved seats in government medical/engineering colleges</li>
                        <li>Special consideration in IITs and NITs</li>
                        <li>Scholarships for technical education</li>
                      </ul>
                    </div>
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
                  <p className="mb-4">To access most of these benefits, you'll need to provide:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Martyrdom certificate from the relevant department/ministry</li>
                    <li>Relationship proof with the martyr</li>
                    <li>Age proof of the beneficiary</li>
                    <li>Previous academic records</li>
                    <li>Transfer certificate from previous school (if applicable)</li>
                    <li>Passport-sized photographs</li>
                    <li>Address proof / domicile certificate</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Application Process */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-military" />
                Application Process
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Visit the website of the educational institution or board</li>
                    <li>Look for special provisions for wards of martyrs</li>
                    <li>Submit the application with all required documents</li>
                    <li>Mention the martyrdom status clearly in the application</li>
                    <li>Follow up with the institution's nodal officer for defense quotas</li>
                    <li>Keep track of admission timelines as they may differ from regular admissions</li>
                  </ol>
                  
                  <div className="mt-4">
                    <p className="text-sm text-white/70">
                      <strong>Note:</strong> For specific institutions, it's advisable to contact their admission office directly to understand the exact procedure for children of martyrs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-military/20 text-military border-military/30">
                5% Reservation
              </Badge>
              <Badge variant="outline" className="bg-military/20 text-military border-military/30">
                Priority Admission
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

export default SchoolAdmissionsModal; 