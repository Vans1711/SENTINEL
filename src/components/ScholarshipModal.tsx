import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Award, 
  Coins, 
  Clock, 
  FileText, 
  Globe, 
  Users, 
  Bookmark,
  CheckCircle,
  Calendar,
  BadgeInfo,
  BookOpen,
  Building,
  Shield,
  Home,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

type ScholarshipEligibility = {
  items: string[];
  note?: string;
};

type ScholarshipBenefit = {
  items: string[];
  note?: string;
};

export type Scholarship = {
  id: number;
  name: string;
  provider: string;
  logo?: string;
  description: string;
  eligibility: ScholarshipEligibility;
  benefits: ScholarshipBenefit;
  applicationLink: string;
  applicationProcess: string;
  deadline?: string;
  region?: string;
  courseLevel?: string[];
  tags: string[];
};

type ScholarshipModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Central Armed Police Forces and Assam Rifles",
    description: "A prestigious scholarship program designed to support the education of wards and widows of personnel from Central Armed Police Forces and Assam Rifles.",
    eligibility: {
      items: [
        "Wards (children) or widows of deceased, disabled, or retired personnel from Central Armed Police Forces (CAPF) and Assam Rifles (AR)",
        "Minimum 60% marks in the Minimum Entry Qualification (MEQ) exam",
        "For professional degree courses recognized by government bodies",
        "Children of Martyrs (deceased personnel) are explicitly included"
      ]
    },
    benefits: {
      items: [
        "Rs 3,000 per month for girls",
        "Rs 2,500 per month for boys",
        "Paid for 10 months annually",
        "Renewable up to 5 years based on course duration"
      ]
    },
    applicationLink: "https://scholarships.gov.in",
    applicationProcess: "Apply through the National Scholarships Portal; check the 'Prime Minister's Scholarship Scheme' section.",
    tags: ["Professional Courses", "National", "Monthly Stipend"]
  },
  {
    id: 2,
    name: "Education Scholarship Scheme for Army Personnel (ESSA)",
    provider: "Army Welfare Education Society (AWES)",
    description: "Comprehensive scholarship support for children of Army personnel from school to higher education.",
    eligibility: {
      items: [
        "Wards of serving Army personnel, including Defence Security Corps (DSC) and Military Nursing Service (MNS) officers",
        "Students from Class 9 to professional/postgraduate courses",
        "Below 25 years at the time of course completion",
        "Minimum 60% marks in the previous academic year"
      ],
      note: "Potentially includes children of deceased personnel (Martyrs) post-service, but confirmation with AWES is recommended."
    },
    benefits: {
      items: [
        "Class 9-11: Rs 1,500 per year",
        "Class 10-12: Rs 3,000 per year",
        "Graduation: Rs 5,000 per year",
        "Professional/PG courses: Rs 10,000 per year"
      ]
    },
    applicationLink: "https://awesindia.com",
    applicationProcess: "Visit the Army Welfare Education Society (AWES) website and check the 'Scholarships' section or contact AWES for specific forms.",
    courseLevel: ["Secondary", "Higher Secondary", "Graduation", "Post Graduation"],
    tags: ["Army", "All Education Levels", "Annual Award"]
  },
  {
    id: 3,
    name: "Scholarship for Daughters of Ex-Servicemen",
    provider: "Government of Rajasthan",
    description: "A state-level initiative to support the education of daughters from ex-servicemen families in Rajasthan.",
    eligibility: {
      items: [
        "Daughters of ex-servicemen (likely includes Martyrs)",
        "Studying in Class 11 or 12",
        "Minimum 55% marks in the previous exam",
        "Must be a domicile of Rajasthan"
      ]
    },
    benefits: {
      items: [
        "Up to Rs 1,000 per month for educational expenses"
      ]
    },
    applicationLink: "https://rajshaladarpan.nic.in",
    applicationProcess: "Apply via the Rajasthan Education Portal under the scholarship section.",
    region: "Rajasthan",
    courseLevel: ["Higher Secondary"],
    tags: ["State-specific", "Girls Only", "Monthly Support"]
  },
  {
    id: 4,
    name: "Education Concession to the Children of Ex-Servicemen",
    provider: "Government of Maharashtra",
    description: "Fee waiver program for children of ex-servicemen pursuing higher education in Maharashtra.",
    eligibility: {
      items: [
        "Children of ex-servicemen (includes dependents of deceased personnel)",
        "Enrolled in government or government-aided colleges in Maharashtra",
        "Must be a domicile of Maharashtra",
        "Applicable for higher secondary, undergraduate, and some postgraduate courses"
      ]
    },
    benefits: {
      items: [
        "100% waiver on admission fees, semester fees, library fees, and laboratory fees"
      ]
    },
    applicationLink: "https://mahadbt.maharashtra.gov.in",
    applicationProcess: "Apply through the Maharashtra Direct Benefit Transfer (DBT) portal under the 'Department of Social Justice' section.",
    region: "Maharashtra",
    courseLevel: ["Higher Secondary", "Graduation", "Post Graduation"],
    tags: ["State-specific", "Fee Waiver", "College Education"]
  },
  {
    id: 5,
    name: "Infinity Learn Scholarship for Children of Martyrs",
    provider: "Infinity Learn",
    description: "Private sector scholarship initiative specifically designed as a tribute to martyrs and their families.",
    eligibility: {
      items: [
        "Children of Martyrs (specifically mentioned as a tribute to those who sacrificed their lives)",
        "Studying in Classes 3 to 13 (covering school and entrance exam preparation)",
        "No specific academic percentage required"
      ]
    },
    benefits: {
      items: [
        "100% waiver on tuition fees for Infinity Learn's educational programs"
      ]
    },
    applicationLink: "https://infinitylearn.com",
    applicationProcess: "Check the scholarship section or contact Infinity Learn directly. The initial offer was time-bound (August 2022) but may have extensions.",
    courseLevel: ["Primary", "Secondary", "Higher Secondary", "Entrance Exam Preparation"],
    tags: ["Private Initiative", "Full Scholarship", "EdTech"]
  },
  {
    id: 6,
    name: "SOF Defence Services Academician Scholarship (DSAS)",
    provider: "Science Olympiad Foundation",
    description: "Recognition and support for academic excellence among children from defence backgrounds.",
    eligibility: {
      items: [
        "Children of defence or internal security personnel (may include Martyrs' children)",
        "Studying in Classes 1 to 10",
        "Must be recommended by school authorities or have a defence family background"
      ]
    },
    benefits: {
      items: [
        "Rs 5,000 one-time award",
        "Certificate of recognition"
      ]
    },
    applicationLink: "https://sofworld.org",
    applicationProcess: "Apply via the Science Olympiad Foundation website under the DSAS section.",
    courseLevel: ["Primary", "Secondary"],
    tags: ["One-time Award", "Recognition", "School Level"]
  },
  {
    id: 7,
    name: "Defence Ministry's Full Funding for Martyrs' Children",
    provider: "Ministry of Defence",
    description: "Comprehensive educational support program ensuring that no child of a martyr faces financial barriers to quality education.",
    eligibility: {
      items: [
        "Children of Martyrs (soldiers/police killed in action or duty)",
        "Covers education from school to college level",
        "No specific academic percentage required"
      ]
    },
    benefits: {
      items: [
        "Full reimbursement of tuition fees and other educational expenses (no cap)"
      ]
    },
    applicationLink: "https://mod.gov.in",
    applicationProcess: "No direct application link; visit the Ministry of Defence or Department of Ex-Servicemen Welfare websites, or contact the Kendriya Sainik Board for details.",
    courseLevel: ["Primary", "Secondary", "Higher Secondary", "Graduation", "Post Graduation"],
    tags: ["Comprehensive Support", "Full Funding", "All Education Levels"]
  }
];

const ScholarshipModal: React.FC<ScholarshipModalProps> = ({ isOpen, onClose }) => {
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector(".scholarship-scroll-area");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <GraduationCap className="h-6 w-6 mr-2 text-military" />
            Educational Scholarships for Children of Martyrs
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Comprehensive information about scholarship opportunities available to support the education of martyrs' children across India.
          </DialogDescription>
        </DialogHeader>

        <div className="p-2 bg-military/10 rounded-md mb-4 border border-military/20 flex items-center">
          <BadgeInfo className="h-5 w-5 text-military mr-2 flex-shrink-0" />
          <p className="text-sm">
            The scholarships listed below aim to honor the sacrifice of brave personnel by ensuring their children receive quality education without financial burden.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <TabsList className="bg-[#1A1A1A] p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-military data-[state=active]:text-white">
                All Scholarships
              </TabsTrigger>
              <TabsTrigger value="national" className="data-[state=active]:bg-military data-[state=active]:text-white">
                National
              </TabsTrigger>
              <TabsTrigger value="state" className="data-[state=active]:bg-military data-[state=active]:text-white">
                State-specific
              </TabsTrigger>
              <TabsTrigger value="private" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Private
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center text-sm text-white/70">
              <BookOpen className="h-4 w-4 mr-1 text-military" />
              <span>{scholarships.length} scholarships available</span>
            </div>
          </div>

          <div className="relative">
            <ScrollArea className="h-[calc(90vh-300px)] overflow-auto scholarship-scroll-area">
              <div className="pr-4">
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {scholarships.map((scholarship) => (
                      <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="national" className="mt-0">
                  <div className="space-y-4">
                    {scholarships
                      .filter(s => !s.region && s.provider !== "Infinity Learn" && s.provider !== "Science Olympiad Foundation")
                      .map((scholarship) => (
                        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="state" className="mt-0">
                  <div className="space-y-4">
                    {scholarships
                      .filter(s => s.region)
                      .map((scholarship) => (
                        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="private" className="mt-0">
                  <div className="space-y-4">
                    {scholarships
                      .filter(s => s.provider === "Infinity Learn" || s.provider === "Science Olympiad Foundation")
                      .map((scholarship) => (
                        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                      ))}
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
            
            <div className="absolute bottom-2 left-0 right-0 flex justify-center pb-1 pt-6 bg-gradient-to-t from-[#121212] to-transparent">
              <Button 
                variant="ghost" 
                size="sm" 
                className="bg-military/30 border border-military/50 text-white hover:bg-military/50 pointer-events-auto animate-pulse"
                onClick={scrollToBottom}
              >
                <ChevronDown className="h-4 w-4 mr-1" />
                Scroll Down
              </Button>
            </div>
          </div>
        </Tabs>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="border-[#333]">Close</Button>
          <Button className="bg-military text-white hover:bg-military-light">
            <Bookmark className="h-4 w-4 mr-2" />
            Save Bookmark
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ScholarshipCard: React.FC<{ scholarship: Scholarship }> = ({ scholarship }) => {
  return (
    <Card className="bg-[#1A1A1A]/40 border-military/30 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Award className="h-5 w-5 mr-2 text-military" />
                {scholarship.name}
              </CardTitle>
              <a 
                href={scholarship.applicationLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-xs bg-military/10 text-military hover:bg-military/20 py-1 px-2 rounded transition-colors ml-2"
              >
                Apply <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <CardDescription className="text-white/70 flex items-center mt-1">
              {scholarship.provider.includes("Government") ? (
                <Building className="h-3 w-3 mr-1" />
              ) : scholarship.provider.includes("Ministry") || scholarship.provider.includes("Armed") ? (
                <Shield className="h-3 w-3 mr-1" />
              ) : (
                <Users className="h-3 w-3 mr-1" />
              )}
              {scholarship.provider}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-1 justify-end ml-2">
            {scholarship.tags.map((tag, index) => (
              <Badge key={index} className="bg-military/20 text-military border border-military/50 text-xs whitespace-nowrap">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-white/90">{scholarship.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-military" />
              Eligibility
            </h4>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-white/80">
              {scholarship.eligibility.items.map((item, index) => (
                <li key={index} className="pl-1">{item}</li>
              ))}
            </ul>
            {scholarship.eligibility.note && (
              <p className="text-xs italic text-white/60">{scholarship.eligibility.note}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <Coins className="h-4 w-4 mr-1 text-military" />
              Benefits
            </h4>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-white/80">
              {scholarship.benefits.items.map((item, index) => (
                <li key={index} className="pl-1">{item}</li>
              ))}
            </ul>
            {scholarship.benefits.note && (
              <p className="text-xs italic text-white/60">{scholarship.benefits.note}</p>
            )}
          </div>
        </div>
        
        <div className="pt-2 space-y-2">
          <div className="flex items-start">
            <Globe className="h-4 w-4 mr-2 text-military mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">How to Apply</h4>
              <p className="text-xs text-white/70 mt-1">{scholarship.applicationProcess}</p>
            </div>
          </div>

          {scholarship.courseLevel && (
            <div className="flex items-start">
              <BookOpen className="h-4 w-4 mr-2 text-military mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Course Levels</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scholarship.courseLevel.map((level, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-white/30">
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {scholarship.region && (
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-2 text-military" />
              <div>
                <h4 className="text-sm font-medium">Region</h4>
                <p className="text-sm text-white/80">{scholarship.region}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScholarshipModal;
