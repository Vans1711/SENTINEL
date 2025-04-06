import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  FileText, 
  Globe, 
  Users, 
  CheckCircle,
  ExternalLink,
  User
} from 'lucide-react';

type MentorshipModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MentorshipModal: React.FC<MentorshipModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <User className="h-6 w-6 mr-2 text-military" />
            Mentorship Programs for Children of Martyrs
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Information about mentorship and guidance opportunities available for children of martyrs across India.
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
                    <li>Children of military/paramilitary/police personnel who died in the line of duty</li>
                    <li>Typically ages 10-21 (varies by program)</li>
                    <li>Must provide proof of martyrdom status through official documentation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Application Process */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2 text-military" />
                How to Apply
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <p className="mb-4">
                    The National Foundation for Communal Harmony (NFCH) offers mentorship programs specifically for martyrs' children. 
                    You can access application information at the NFCH website.
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-military" />
                    <a 
                      href="http://www.nfch.nic.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-military hover:underline flex items-center"
                    >
                      www.nfch.nic.in <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <p className="mt-4 font-semibold">Other Mentorship Options:</p>
                  <ul className="list-disc pl-5 space-y-3 mt-2">
                    <li>
                      <div className="font-medium">The Army Welfare Education Society</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Globe className="h-4 w-4 text-military" />
                        <a 
                          href="http://www.awesindia.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-military hover:underline flex items-center"
                        >
                          www.awesindia.com <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="font-medium">Sainik Schools Alumni Association mentorship initiatives</div>
                      <p className="text-sm text-white/70 mt-1">
                        Contact your nearest Sainik School for more information about alumni mentorship programs
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Benefits Section */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold flex items-center">
                <Users className="h-5 w-5 mr-2 text-military" />
                Program Benefits
              </h3>
              <Card className="bg-[#1A1A1A]/70 border-[#333]">
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>One-on-one guidance from experienced professionals and veterans</li>
                    <li>Academic support and career counseling</li>
                    <li>Emotional support and role modeling</li>
                    <li>Assistance with college applications and career planning</li>
                    <li>Networking opportunities with potential employers</li>
                    <li>Development of leadership and life skills</li>
                  </ul>
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
                    <li>Identity proof of the child (Aadhaar card/school ID)</li>
                    <li>Birth certificate of the child</li>
                    <li>Recent educational records</li>
                    <li>Passport-sized photographs</li>
                    <li>Bank account details (for some programs)</li>
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
                Age: 10-21 years
              </Badge>
              <Badge variant="outline" className="bg-military/20 text-military border-military/30">
                Nationwide
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

export default MentorshipModal; 