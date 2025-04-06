import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  GripHorizontal, 
  Award, 
  Building2,
  Landmark,
  CircleDollarSign,
  FileText, 
  Globe, 
  Users, 
  Bookmark,
  Building,
  Home,
  GraduationCap,
  BadgeInfo,
  Info,
  ChevronDown,
  ExternalLink,
  Briefcase
} from 'lucide-react';

type PensionEligibility = {
  items: string[];
  note?: string;
};

type PensionBenefit = {
  items: string[];
  note?: string;
};

export type PensionScheme = {
  id: number;
  name: string;
  provider: string;
  logo?: string;
  description: string;
  eligibility: PensionEligibility;
  benefits: PensionBenefit;
  applicationLink: string;
  applicationProcess: string;
  supportType: 'pension' | 'lumpsum' | 'insurance' | 'employment' | 'education' | 'housing';
  schemeType: 'central' | 'state' | 'force-specific';
  forceType?: string[];
  tags: string[];
};

type PensionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const pensionSchemes: PensionScheme[] = [
  {
    id: 1,
    name: "Liberalized Family Pension",
    provider: "Ministry of Defence",
    description: "Enhanced pension scheme for families of Armed Forces personnel who died in action during wartime or border skirmishes.",
    eligibility: {
      items: [
        "Spouse of personnel who died in action",
        "In absence of spouse, eligible children",
        "In absence of spouse and children, dependent parents"
      ],
      note: "Continues even if spouse remarries (with certain conditions)"
    },
    benefits: {
      items: [
        "100% of the last drawn salary (compared to 30% for normal family pension)",
        "Dearness Relief as announced by government periodically",
        "Lifelong pension for spouse"
      ],
      note: "Amount is divided if there are multiple eligible beneficiaries"
    },
    applicationLink: "https://pensiononline.gov.in",
    applicationProcess: "Apply through respective service headquarters (Army/Navy/Air Force) with required documents including death certificate and service documents",
    supportType: "pension",
    schemeType: "central",
    forceType: ["Army", "Navy", "Air Force"],
    tags: ["central-government", "armed-forces", "lifelong"]
  },
  {
    id: 2,
    name: "Ex-Gratia Lump Sum Compensation",
    provider: "Ministry of Defence",
    description: "One-time payment to families of defence personnel who die during service, with amount varying based on circumstances of death.",
    eligibility: {
      items: [
        "Next of kin of Armed Forces personnel who died in specified circumstances",
        "Valid for Regular and Territorial Army personnel"
      ]
    },
    benefits: {
      items: [
        "Death occurring in border skirmishes: ₹45 lakhs",
        "Death during enemy action in international war: ₹45 lakhs",
        "Death during counterinsurgency operations: ₹35 lakhs",
        "Death during natural disasters/rescue operations: ₹25 lakhs"
      ],
      note: "This is in addition to other applicable pension benefits"
    },
    applicationLink: "https://ksb.gov.in",
    applicationProcess: "Application submitted through the Unit/Formation where the soldier was last serving, along with death certificate and service documents",
    supportType: "lumpsum",
    schemeType: "central",
    forceType: ["Army", "Navy", "Air Force"],
    tags: ["central-government", "one-time-payment", "armed-forces"]
  },
  {
    id: 3,
    name: "Army Group Insurance Fund Benefits",
    provider: "Army Welfare Fund",
    description: "Insurance cover for Army personnel with benefits payable to families in case of death during service.",
    eligibility: {
      items: [
        "Family members of Army personnel who died during service",
        "Valid for both battle and non-battle casualties"
      ]
    },
    benefits: {
      items: [
        "Insurance amount varies based on rank (₹5-50 lakhs)",
        "Additional benefits from Army Welfare Fund",
        "Disability benefits for those invalided out of service"
      ],
      note: "Extended insurance cover options available"
    },
    applicationLink: "https://agif.in",
    applicationProcess: "Submit claim through the Unit Adjutant/Record Office with death certificate and other required documents",
    supportType: "insurance",
    schemeType: "force-specific",
    forceType: ["Army"],
    tags: ["insurance", "armed-forces", "army-specific"]
  },
  {
    id: 4,
    name: "CAPF Family Pension",
    provider: "Ministry of Home Affairs",
    description: "Pension scheme for families of personnel from Central Armed Police Forces who died during service.",
    eligibility: {
      items: [
        "Families of personnel from BSF, CRPF, CISF, ITBP, SSB who died on duty",
        "Applicable to both operational and non-operational deaths"
      ]
    },
    benefits: {
      items: [
        "Family pension at enhanced rates for those who die in action",
        "Ex-gratia lump-sum compensation between ₹15-35 lakhs based on circumstances",
        "Risk fund benefits specific to each force"
      ],
      note: "Amendments have been made to ensure families of missing personnel can claim benefits"
    },
    applicationLink: "https://mha.gov.in",
    applicationProcess: "Apply through the respective force headquarters with required documentation including service certificate and death certificate",
    supportType: "pension",
    schemeType: "central",
    forceType: ["CRPF", "BSF", "CISF", "ITBP", "SSB"],
    tags: ["paramilitary", "central-government", "pension"]
  },
  {
    id: 5,
    name: "Maharashtra State Financial Assistance",
    provider: "Government of Maharashtra",
    description: "Comprehensive support package for families of martyrs who were residents of Maharashtra.",
    eligibility: {
      items: [
        "Family members of martyrs who were residents of Maharashtra",
        "Valid for personnel from Armed Forces and CAPFs"
      ]
    },
    benefits: {
      items: [
        "Cash compensation of ₹1 crore to next of kin",
        "Government job for one family member",
        "Free education for children in state institutions",
        "Housing plot or apartment at concessional rates"
      ]
    },
    applicationLink: "https://maharashtra.gov.in",
    applicationProcess: "Apply through District Sainik Welfare Office with domicile certificate and other relevant documents",
    supportType: "lumpsum",
    schemeType: "state",
    tags: ["state-government", "comprehensive", "employment"]
  },
  {
    id: 6,
    name: "Punjab State Martyr Support Scheme",
    provider: "Government of Punjab",
    description: "Financial and employment support for families of martyrs from Punjab.",
    eligibility: {
      items: [
        "Next of kin of martyrs who were domiciled in Punjab",
        "Applicable to Armed Forces, Punjab Police, and CAPF personnel"
      ]
    },
    benefits: {
      items: [
        "Ex-gratia grant of ₹50 lakhs",
        "Government job to eligible dependent",
        "Free education for children up to university level",
        "Preference in housing schemes"
      ],
      note: "Special provisions for martyrs of Pulwama and Galwan incidents"
    },
    applicationLink: "https://punjab.gov.in",
    applicationProcess: "Submit application to District Sainik Welfare Officer along with martyr's domicile proof and death certificate",
    supportType: "lumpsum",
    schemeType: "state",
    tags: ["state-government", "employment", "education"]
  },
  {
    id: 7,
    name: "Prime Minister's Scholarship Scheme",
    provider: "Prime Minister's Office",
    description: "Educational scholarship for children of ex-servicemen and disabled/deceased defense personnel.",
    eligibility: {
      items: [
        "Children of deceased defense personnel",
        "Children of ex-servicemen and disabled personnel",
        "Students pursuing professional/technical degree courses"
      ]
    },
    benefits: {
      items: [
        "₹2,500 per month for boys and ₹3,000 per month for girls",
        "Paid annually through direct benefit transfer",
        "Available for first degree courses (BE, MBBS, BBA, etc.)"
      ],
      note: "Maximum of two children per family"
    },
    applicationLink: "https://desw.gov.in",
    applicationProcess: "Apply online through National Scholarship Portal with school certificates and parent's service documents",
    supportType: "education",
    schemeType: "central",
    tags: ["education", "central-government", "scholarship"]
  },
  {
    id: 8,
    name: "CRPF Risk Fund",
    provider: "Central Reserve Police Force",
    description: "Financial assistance to families of CRPF personnel who die on duty.",
    eligibility: {
      items: [
        "Next of kin of CRPF personnel who died on duty",
        "Covers both operational and non-operational casualties"
      ]
    },
    benefits: {
      items: [
        "Financial assistance of ₹20-30 lakhs based on circumstances",
        "Monthly financial assistance to parents if not covered under family pension",
        "Education grants for children"
      ]
    },
    applicationLink: "https://crpf.gov.in",
    applicationProcess: "Application is processed automatically through the unit where the personnel was serving. Family should ensure their details are updated.",
    supportType: "lumpsum",
    schemeType: "force-specific",
    forceType: ["CRPF"],
    tags: ["paramilitary", "force-specific", "risk-fund"]
  },
  {
    id: 9,
    name: "Indian Navy Benevolent Fund",
    provider: "Indian Navy",
    description: "Support fund for welfare of families of deceased naval personnel.",
    eligibility: {
      items: [
        "Widows and dependents of naval personnel who died in service",
        "Families of missing naval personnel"
      ]
    },
    benefits: {
      items: [
        "Immediate financial relief",
        "Children's education grants",
        "Vocational training for widows",
        "Financial assistance for daughter's marriage"
      ]
    },
    applicationLink: "https://indiannavy.nic.in",
    applicationProcess: "Applications are processed through Naval base welfare office or through Command Headquarters",
    supportType: "lumpsum",
    schemeType: "force-specific",
    forceType: ["Navy"],
    tags: ["armed-forces", "navy-specific", "education"]
  },
  {
    id: 10,
    name: "Karnataka State Housing Scheme",
    provider: "Government of Karnataka",
    description: "Housing support for families of martyrs from Karnataka.",
    eligibility: {
      items: [
        "Families of martyrs who were domiciled in Karnataka",
        "Valid for personnel from Armed Forces, CAPF, and State Police"
      ]
    },
    benefits: {
      items: [
        "Free housing site in urban areas or land in rural areas",
        "Financial assistance of up to ₹10 lakhs for house construction",
        "Exemption from property tax for one residential property"
      ]
    },
    applicationLink: "https://karnataka.gov.in",
    applicationProcess: "Apply through Karnataka State Sainik Welfare Department with domicile proof and service documents",
    supportType: "housing",
    schemeType: "state",
    tags: ["state-government", "housing", "property"]
  },
  {
    id: 11,
    name: "Dependent Employment Scheme",
    provider: "Department of Personnel & Training",
    description: "Priority employment for dependents of defense personnel who died in service.",
    eligibility: {
      items: [
        "Spouse or child of defense personnel who died in action",
        "Must meet minimum qualification for the position",
        "Application must be made within 5 years of death"
      ],
      note: "Relaxation in age and qualification may be granted"
    },
    benefits: {
      items: [
        "Priority in appointment to Group C and D posts in Central Government",
        "Relaxation of normal recruitment procedure",
        "Consideration for compassionate posting near family residence"
      ]
    },
    applicationLink: "https://persmin.gov.in",
    applicationProcess: "Apply to Department of Personnel & Training through respective Service Headquarters with necessary certificates",
    supportType: "employment",
    schemeType: "central",
    tags: ["employment", "central-government", "priority"]
  },
  {
    id: 12,
    name: "Air Force Benevolent Association",
    provider: "Indian Air Force",
    description: "Support organization for welfare of families of deceased Air Force personnel.",
    eligibility: {
      items: [
        "Families of Air Force personnel who died during service",
        "Retired personnel and their families in distress"
      ]
    },
    benefits: {
      items: [
        "One-time grant for immediate expenses",
        "Educational scholarships for children",
        "Financial assistance for medical treatment",
        "Support for rehabilitation and vocational training"
      ]
    },
    applicationLink: "https://indianairforce.nic.in",
    applicationProcess: "Applications are processed through the last serving station or Air Force command welfare office",
    supportType: "lumpsum",
    schemeType: "force-specific",
    forceType: ["Air Force"],
    tags: ["armed-forces", "air-force-specific", "welfare"]
  }
];

const PensionModal: React.FC<PensionModalProps> = ({ isOpen, onClose }) => {
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector(".pension-scroll-area");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <CircleDollarSign className="h-6 w-6 mr-2 text-military" />
            Pension & Financial Support for Martyr Families
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Comprehensive information about pension schemes and financial assistance available for families of martyrs across India.
          </DialogDescription>
        </DialogHeader>

        <div className="p-2 bg-military/10 rounded-md mb-4 border border-military/20 flex items-center">
          <BadgeInfo className="h-5 w-5 text-military mr-2 flex-shrink-0" />
          <p className="text-sm">
            The schemes listed below aim to provide financial security and support to the families of brave personnel who made the supreme sacrifice in service to the nation.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <TabsList className="bg-[#1A1A1A] p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-military data-[state=active]:text-white">
                All Schemes
              </TabsTrigger>
              <TabsTrigger value="central" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Central Govt
              </TabsTrigger>
              <TabsTrigger value="state" className="data-[state=active]:bg-military data-[state=active]:text-white">
                State Govt
              </TabsTrigger>
              <TabsTrigger value="force" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Force-Specific
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center text-sm text-white/70">
              <Landmark className="h-4 w-4 mr-1 text-military" />
              <span>{pensionSchemes.length} support schemes available</span>
            </div>
          </div>

          <div className="relative">
            <ScrollArea className="h-[calc(90vh-240px)] overflow-auto pension-scroll-area" style={{ overflowY: 'auto' }}>
              <div className="pr-4">
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {pensionSchemes.map((scheme) => (
                      <PensionCard key={scheme.id} scheme={scheme} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="central" className="mt-0">
                  <div className="space-y-4">
                    {pensionSchemes
                      .filter(s => s.schemeType === 'central')
                      .map((scheme) => (
                        <PensionCard key={scheme.id} scheme={scheme} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="state" className="mt-0">
                  <div className="space-y-4">
                    {pensionSchemes
                      .filter(s => s.schemeType === 'state')
                      .map((scheme) => (
                        <PensionCard key={scheme.id} scheme={scheme} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="force" className="mt-0">
                  <div className="space-y-4">
                    {pensionSchemes
                      .filter(s => s.schemeType === 'force-specific')
                      .map((scheme) => (
                        <PensionCard key={scheme.id} scheme={scheme} />
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

        <DialogFooter className="flex gap-2 mt-4">
          <Button variant="outline" onClick={onClose} className="border-[#333]">Close</Button>
          <Button className="bg-military text-white hover:bg-military-light">
            <Bookmark className="h-4 w-4 mr-2" />
            Save Information
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PensionCard: React.FC<{ scheme: PensionScheme }> = ({ scheme }) => {
  const getSupportTypeIcon = (type: string) => {
    switch(type) {
      case 'pension': return <Landmark className="h-5 w-5 mr-2 text-military" />;
      case 'lumpsum': return <CircleDollarSign className="h-5 w-5 mr-2 text-military" />;
      case 'insurance': return <FileText className="h-5 w-5 mr-2 text-military" />;
      case 'employment': return <Briefcase className="h-5 w-5 mr-2 text-military" />;
      case 'education': return <GraduationCap className="h-5 w-5 mr-2 text-military" />;
      case 'housing': return <Home className="h-5 w-5 mr-2 text-military" />;
      default: return <Award className="h-5 w-5 mr-2 text-military" />;
    }
  };

  const getProviderIcon = (provider: string) => {
    if (provider.includes("Government") || provider.includes("Ministry")) {
      return <Landmark className="h-3 w-3 mr-1" />;
    } else if (provider.includes("Force") || provider.includes("Army") || provider.includes("Navy") || provider.includes("Air")) {
      return <GripHorizontal className="h-3 w-3 mr-1" />;
    } else {
      return <Building className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <Card className="bg-[#1A1A1A]/40 border-military/30 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                {getSupportTypeIcon(scheme.supportType)}
                {scheme.name}
              </CardTitle>
              <a 
                href={scheme.applicationLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-xs bg-military/10 text-military hover:bg-military/20 py-1 px-2 rounded transition-colors ml-2"
              >
                Apply <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <CardDescription className="text-white/70 flex items-center mt-1">
              {getProviderIcon(scheme.provider)}
              {scheme.provider}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-1 justify-end ml-2">
            {scheme.tags.map((tag, index) => (
              <Badge key={index} className="bg-military/20 text-military border border-military/50 text-xs whitespace-nowrap">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-white/90">{scheme.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-1 text-military" />
              Eligibility
            </h4>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-white/80">
              {scheme.eligibility.items.map((item, index) => (
                <li key={index} className="pl-1">{item}</li>
              ))}
            </ul>
            {scheme.eligibility.note && (
              <p className="text-xs italic text-white/60">{scheme.eligibility.note}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <Wallet className="h-4 w-4 mr-1 text-military" />
              Benefits
            </h4>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-white/80">
              {scheme.benefits.items.map((item, index) => (
                <li key={index} className="pl-1">{item}</li>
              ))}
            </ul>
            {scheme.benefits.note && (
              <p className="text-xs italic text-white/60">{scheme.benefits.note}</p>
            )}
          </div>
        </div>
        
        <div className="pt-2 space-y-2">
          <div className="flex items-start">
            <FileText className="h-4 w-4 mr-2 text-military mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">How to Apply</h4>
              <p className="text-xs text-white/70 mt-1">{scheme.applicationProcess}</p>
            </div>
          </div>

          {scheme.forceType && (
            <div className="flex items-start">
              <GripHorizontal className="h-4 w-4 mr-2 text-military mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Applicable Forces</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {scheme.forceType.map((force, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-white/30">
                      {force}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PensionModal; 