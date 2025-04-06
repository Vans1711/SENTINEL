import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, 
  Shield, 
  Heart, 
  Headphones, 
  Building2, 
  BookOpen, 
  AlertCircle, 
  Clock, 
  Bookmark,
  BadgeInfo,
  Copy,
  PhoneCall,
  ChevronDown
} from 'lucide-react';

type HelplineCategory = 'armed-forces' | 'capf' | 'psychological' | 'ngo' | 'state';

export type Helpline = {
  id: number;
  name: string;
  number: string;
  description: string;
  organization: string;
  category: HelplineCategory;
  operatingHours?: string;
  tags: string[];
};

type HelplineModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const helplines: Helpline[] = [
  {
    id: 1,
    name: "Indian Army Veterans Helpline",
    number: "1800-180-0206",
    description: "Official helpline for veterans and families of Army personnel including martyr families",
    organization: "Indian Army",
    category: "armed-forces",
    operatingHours: "24/7",
    tags: ["Army", "Veterans", "Toll-Free"]
  },
  {
    id: 2,
    name: "Air Force Veterans Cell",
    number: "011-23010231",
    description: "Support cell for Air Force veterans and families including pension and welfare issues",
    organization: "Indian Air Force",
    category: "armed-forces",
    operatingHours: "9:00 AM - 5:30 PM (Mon-Fri)",
    tags: ["Air Force", "Veterans", "Welfare"]
  },
  {
    id: 3,
    name: "Naval Veterans Support Cell",
    number: "022-22751000",
    description: "Helpline for Navy veterans and their families for all service-related matters",
    organization: "Indian Navy",
    category: "armed-forces",
    operatingHours: "9:00 AM - 5:00 PM (Mon-Fri)",
    tags: ["Navy", "Veterans", "Support"]
  },
  {
    id: 4,
    name: "Armed Forces Stress Counselling Helpline",
    number: "1800-103-5551",
    description: "Specialized helpline providing mental health support to serving and retired personnel and their families",
    organization: "Armed Forces Medical Services",
    category: "psychological",
    operatingHours: "24/7",
    tags: ["Mental Health", "Counselling", "Toll-Free"]
  },
  {
    id: 5,
    name: "BSF Martyrs' Family Welfare Helpline",
    number: "011-24367683",
    description: "Dedicated support line for families of BSF martyrs for pension and welfare concerns",
    organization: "Border Security Force",
    category: "capf",
    operatingHours: "9:30 AM - 6:00 PM (Mon-Sat)",
    tags: ["BSF", "Family Welfare", "Martyrs"]
  },
  {
    id: 6,
    name: "CRPF Welfare Directorate",
    number: "011-26160255",
    description: "Direct line to CRPF welfare office for martyr families seeking assistance",
    organization: "Central Reserve Police Force",
    category: "capf",
    operatingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    tags: ["CRPF", "Welfare", "Benefits"]
  },
  {
    id: 7,
    name: "CISF Family Welfare Helpline",
    number: "011-24361804",
    description: "Contact for CISF families requiring welfare assistance and guidance",
    organization: "Central Industrial Security Force",
    category: "capf",
    operatingHours: "9:00 AM - 5:30 PM (Mon-Fri)",
    tags: ["CISF", "Family Support", "Welfare"]
  },
  {
    id: 8,
    name: "ITBP Welfare Helpline",
    number: "011-24369482",
    description: "Support line for families of ITBP personnel including pension and compensation matters",
    organization: "Indo-Tibetan Border Police",
    category: "capf",
    operatingHours: "9:00 AM - 6:00 PM (Mon-Fri)",
    tags: ["ITBP", "Welfare", "Support"]
  },
  {
    id: 9,
    name: "Sainik Welfare Board Counselling Services",
    number: "1800-113-999",
    description: "Free counselling services for ex-servicemen and their families including psychological support",
    organization: "Kendriya Sainik Board",
    category: "psychological",
    operatingHours: "24/7",
    tags: ["Counselling", "Psychological", "Toll-Free"]
  },
  {
    id: 10,
    name: "Military Hospital Mental Health Support",
    number: "1800-891-4416",
    description: "Mental health helpline operated by military hospitals for service personnel and families",
    organization: "Armed Forces Medical Services",
    category: "psychological",
    operatingHours: "24/7",
    tags: ["Mental Health", "Medical", "Toll-Free"]
  },
  {
    id: 11,
    name: "AFWWA Counselling",
    number: "011-23010231",
    description: "Extension: 7559 - Counselling services provided by the Air Force Wives Welfare Association",
    organization: "Air Force Wives Welfare Association",
    category: "psychological",
    operatingHours: "10:00 AM - 4:00 PM (Mon-Fri)",
    tags: ["Counselling", "Air Force", "Family Support"]
  },
  {
    id: 12,
    name: "Bharat Ke Veer Portal Helpline",
    number: "1800-11-0201",
    description: "Official helpline for the Bharat Ke Veer initiative to support families of martyrs from CAPFs",
    organization: "Ministry of Home Affairs",
    category: "ngo",
    operatingHours: "24/7",
    tags: ["Donations", "CAPF", "Toll-Free"]
  },
  {
    id: 13,
    name: "Veer Nari Shakti Helpline",
    number: "9560598435",
    description: "Support for widows of martyrs providing guidance on benefits and entitlements",
    organization: "Veer Nari Shakti Association",
    category: "ngo",
    operatingHours: "9:00 AM - 8:00 PM (All days)",
    tags: ["War Widows", "Empowerment", "Support"]
  },
  {
    id: 14,
    name: "War Widows Association",
    number: "011-26712715",
    description: "Organization run by and for war widows providing peer support and guidance",
    organization: "War Widows Association of India",
    category: "ngo",
    operatingHours: "10:00 AM - 5:00 PM (Mon-Fri)",
    tags: ["War Widows", "Peer Support", "Advocacy"]
  }
];

const HelplineModal: React.FC<HelplineModalProps> = ({ isOpen, onClose }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector(".helpline-scroll-area");
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <PhoneCall className="h-6 w-6 mr-2 text-military" />
            24/7 Helpline Numbers for Martyr Families
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Emergency contact numbers and support helplines dedicated to assisting families of martyrs across India.
          </DialogDescription>
        </DialogHeader>

        <div className="p-2 bg-military/10 rounded-md mb-4 border border-military/20 flex items-center">
          <AlertCircle className="h-5 w-5 text-military mr-2 flex-shrink-0" />
          <p className="text-sm">
            These helplines are specifically designated to provide immediate assistance and guidance to families of martyrs. Many are available 24/7 for emergency support.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <TabsList className="bg-[#1A1A1A] p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-military data-[state=active]:text-white">
                All Helplines
              </TabsTrigger>
              <TabsTrigger value="armed-forces" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Armed Forces
              </TabsTrigger>
              <TabsTrigger value="capf" className="data-[state=active]:bg-military data-[state=active]:text-white">
                CAPF
              </TabsTrigger>
              <TabsTrigger value="psychological" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Counselling
              </TabsTrigger>
              <TabsTrigger value="ngo" className="data-[state=active]:bg-military data-[state=active]:text-white">
                NGOs
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center text-sm text-white/70">
              <Phone className="h-4 w-4 mr-1 text-military" />
              <span>{helplines.length} helplines available</span>
            </div>
          </div>

          <div className="relative">
            <ScrollArea className="h-[calc(90vh-240px)] overflow-auto helpline-scroll-area" style={{ overflowY: 'auto' }}>
              <div className="pr-4">
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {helplines.map((helpline) => (
                      <HelplineCard key={helpline.id} helpline={helpline} onCopy={copyToClipboard} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="armed-forces" className="mt-0">
                  <div className="space-y-4">
                    {helplines
                      .filter(h => h.category === 'armed-forces')
                      .map((helpline) => (
                        <HelplineCard key={helpline.id} helpline={helpline} onCopy={copyToClipboard} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="capf" className="mt-0">
                  <div className="space-y-4">
                    {helplines
                      .filter(h => h.category === 'capf')
                      .map((helpline) => (
                        <HelplineCard key={helpline.id} helpline={helpline} onCopy={copyToClipboard} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="psychological" className="mt-0">
                  <div className="space-y-4">
                    {helplines
                      .filter(h => h.category === 'psychological')
                      .map((helpline) => (
                        <HelplineCard key={helpline.id} helpline={helpline} onCopy={copyToClipboard} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="ngo" className="mt-0">
                  <div className="space-y-4">
                    {helplines
                      .filter(h => h.category === 'ngo')
                      .map((helpline) => (
                        <HelplineCard key={helpline.id} helpline={helpline} onCopy={copyToClipboard} />
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
            Save Helplines
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const HelplineCard: React.FC<{ 
  helpline: Helpline, 
  onCopy: (text: string) => void 
}> = ({ helpline, onCopy }) => {
  const getCategoryIcon = (category: HelplineCategory) => {
    switch(category) {
      case 'armed-forces': return <Shield className="h-5 w-5 mr-2 text-military" />;
      case 'capf': return <Building2 className="h-5 w-5 mr-2 text-military" />;
      case 'psychological': return <Heart className="h-5 w-5 mr-2 text-military" />;
      case 'ngo': return <BookOpen className="h-5 w-5 mr-2 text-military" />;
      case 'state': return <Building2 className="h-5 w-5 mr-2 text-military" />;
      default: return <Phone className="h-5 w-5 mr-2 text-military" />;
    }
  };

  return (
    <Card className="bg-[#1A1A1A]/40 border-military/30 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold flex items-center">
              {getCategoryIcon(helpline.category)}
              {helpline.name}
            </CardTitle>
            <CardDescription className="text-white/70">
              {helpline.organization}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-1 justify-end ml-2">
            {helpline.tags.map((tag, index) => (
              <Badge key={index} className="bg-military/20 text-military border border-military/50 text-xs whitespace-nowrap">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-military/10 px-3 py-2 rounded-md">
            <Phone className="h-4 w-4 mr-2 text-military" />
            <p className="text-lg font-mono font-medium tracking-wider text-white">{helpline.number}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-military hover:bg-military/20"
            onClick={() => onCopy(helpline.number)}
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
        
        <p className="text-sm text-white/90 mt-2">{helpline.description}</p>
        
        {helpline.operatingHours && (
          <div className="flex items-center text-xs text-white/70 mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>Hours: {helpline.operatingHours}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HelplineModal; 