import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  Bookmark,
  BadgeInfo,
  GraduationCap,
  Users,
  Shield,
  Briefcase,
  Brain,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

type CounselorExpertise = {
  areas: string[];
  description?: string;
};

type CounselorAvailability = {
  days: string[];
  hours: string;
  online: boolean;
  inPerson: boolean;
  homeVisits: boolean;
};

export type Counselor = {
  id: number;
  name: string;
  title: string;
  profileImage?: string;
  phone: string;
  email: string;
  location: string;
  expertise: CounselorExpertise;
  experience: number;
  languages: string[];
  availability: CounselorAvailability;
  associatedWith?: string;
  specialExperience?: string;
  rating: number;
  reviewCount: number;
  type: 'military' | 'trauma' | 'grief' | 'child' | 'general';
  tags: string[];
};

type CounselorsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const counselors: Counselor[] = [
  {
    id: 1,
    name: "Dr. Rajiv Kumar",
    title: "Military Psychologist",
    phone: "9876543210",
    email: "dr.rajiv@example.com",
    location: "Delhi NCR",
    expertise: {
      areas: ["Military Trauma", "PTSD", "Family Counseling", "Grief Management"],
      description: "Specialized in helping military families cope with loss and transition"
    },
    experience: 15,
    languages: ["Hindi", "English", "Punjabi"],
    availability: {
      days: ["Monday", "Tuesday", "Thursday", "Friday"],
      hours: "10:00 AM - 6:00 PM",
      online: true,
      inPerson: true,
      homeVisits: true
    },
    associatedWith: "Armed Forces Medical Services (Retd.)",
    specialExperience: "Former Military Psychologist with 10 years service in the Indian Army",
    rating: 4.9,
    reviewCount: 124,
    type: "military",
    tags: ["Military Specialist", "Home Visits", "PTSD Expert"]
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    title: "Trauma & Grief Counselor",
    phone: "8765432109",
    email: "dr.priya@example.com",
    location: "Mumbai",
    expertise: {
      areas: ["Trauma Counseling", "Grief Recovery", "Family Therapy", "Emotional Support"],
      description: "Specializes in helping families navigate the grieving process"
    },
    experience: 12,
    languages: ["Hindi", "English", "Marathi"],
    availability: {
      days: ["Monday", "Wednesday", "Thursday", "Saturday"],
      hours: "9:00 AM - 5:00 PM",
      online: true,
      inPerson: true,
      homeVisits: false
    },
    rating: 4.8,
    reviewCount: 98,
    type: "grief",
    tags: ["Grief Specialist", "Trauma Recovery", "Family Support"]
  },
  {
    id: 3,
    name: "Major Vikram Singh (Retd.)",
    title: "Military Family Counselor",
    phone: "7654321098",
    email: "vikram.singh@example.com",
    location: "Chandigarh",
    expertise: {
      areas: ["Military Family Support", "Transition Counseling", "Peer Support", "Pension & Benefits Guidance"],
      description: "Combines military experience with counseling expertise to support martyr families"
    },
    experience: 20,
    languages: ["Hindi", "English", "Punjabi"],
    availability: {
      days: ["Tuesday", "Wednesday", "Friday", "Saturday"],
      hours: "11:00 AM - 7:00 PM",
      online: true,
      inPerson: true,
      homeVisits: true
    },
    associatedWith: "Ex-Servicemen Contributory Health Scheme",
    specialExperience: "Served in the Indian Army for 22 years before transitioning to counseling",
    rating: 4.9,
    reviewCount: 156,
    type: "military",
    tags: ["Ex-Military", "Benefits Expert", "Holistic Support"]
  },
  {
    id: 4,
    name: "Ananya Desai",
    title: "Child & Adolescent Counselor",
    phone: "6543210987",
    email: "ananya.desai@example.com",
    location: "Bangalore",
    expertise: {
      areas: ["Child Psychology", "Adolescent Counseling", "Educational Support", "Grief in Children"],
      description: "Focuses on helping children of martyrs cope with loss and achieve educational goals"
    },
    experience: 8,
    languages: ["Hindi", "English", "Kannada", "Tamil"],
    availability: {
      days: ["Monday", "Tuesday", "Thursday", "Friday"],
      hours: "2:00 PM - 8:00 PM",
      online: true,
      inPerson: true,
      homeVisits: false
    },
    rating: 4.7,
    reviewCount: 67,
    type: "child",
    tags: ["Child Specialist", "Educational Support", "Play Therapy"]
  },
  {
    id: 5,
    name: "Dr. Sanjay Mehta",
    title: "Clinical Psychologist",
    phone: "5432109876",
    email: "dr.sanjay@example.com",
    location: "Kolkata",
    expertise: {
      areas: ["Depression", "Anxiety", "Trauma Recovery", "Stress Management"],
      description: "Treats complex psychological issues related to traumatic loss"
    },
    experience: 18,
    languages: ["Hindi", "English", "Bengali"],
    availability: {
      days: ["Monday", "Wednesday", "Friday", "Saturday"],
      hours: "9:00 AM - 6:00 PM",
      online: true,
      inPerson: true,
      homeVisits: false
    },
    rating: 4.8,
    reviewCount: 112,
    type: "trauma",
    tags: ["Clinical Specialist", "Depression Expert", "Medical Approach"]
  },
  {
    id: 6,
    name: "Capt. Neha Verma (Retd.)",
    title: "Military Transition Specialist",
    phone: "9876123450",
    email: "neha.verma@example.com",
    location: "Pune",
    expertise: {
      areas: ["Family Transition", "Financial Planning", "Career Counseling", "Adjustment Support"],
      description: "Helps families navigate life changes after losing a service member"
    },
    experience: 10,
    languages: ["Hindi", "English", "Marathi"],
    availability: {
      days: ["Tuesday", "Thursday", "Friday", "Saturday"],
      hours: "10:00 AM - 7:00 PM",
      online: true,
      inPerson: true,
      homeVisits: true
    },
    associatedWith: "Navy Wives Welfare Association",
    specialExperience: "Former Naval Officer with specialization in family welfare programs",
    rating: 4.9,
    reviewCount: 89,
    type: "military",
    tags: ["Ex-Navy", "Transition Expert", "Financial Guidance"]
  },
  {
    id: 7,
    name: "Dr. Arjun Mathur",
    title: "Grief & Trauma Therapist",
    phone: "8765098123",
    email: "dr.arjun@example.com",
    location: "Hyderabad",
    expertise: {
      areas: ["Complex Grief", "PTSD", "Group Therapy", "Emotional Healing"],
      description: "Uses evidence-based approaches to help families process traumatic loss"
    },
    experience: 14,
    languages: ["Hindi", "English", "Telugu"],
    availability: {
      days: ["Monday", "Wednesday", "Thursday", "Saturday"],
      hours: "11:00 AM - 8:00 PM",
      online: true,
      inPerson: true,
      homeVisits: false
    },
    rating: 4.8,
    reviewCount: 103,
    type: "trauma",
    tags: ["Trauma Specialist", "Group Sessions", "Evidence-Based"]
  }
];

const CounselorsModal: React.FC<CounselorsModalProps> = ({ isOpen, onClose }) => {
  const scrollToBottom = () => {
    const scrollContainer = document.querySelector(".counselors-scroll-area");
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
            <HeartPulse className="h-6 w-6 mr-2 text-military" />
            Specialized Counselors for Martyr Families
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Connect with counselors who specialize in supporting families of martyrs through grief, trauma, and life transitions.
          </DialogDescription>
        </DialogHeader>

        <div className="p-2 bg-military/10 rounded-md mb-4 border border-military/20 flex items-center">
          <BadgeInfo className="h-5 w-5 text-military mr-2 flex-shrink-0" />
          <p className="text-sm">
            All counselors listed here have specialized training and experience in working with military families and understand the unique challenges faced by families of martyrs.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <TabsList className="bg-[#1A1A1A] p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-military data-[state=active]:text-white">
                All Counselors
              </TabsTrigger>
              <TabsTrigger value="military" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Military Specialists
              </TabsTrigger>
              <TabsTrigger value="trauma" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Trauma & Grief
              </TabsTrigger>
              <TabsTrigger value="child" className="data-[state=active]:bg-military data-[state=active]:text-white">
                Child Specialists
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center text-sm text-white/70">
              <Users className="h-4 w-4 mr-1 text-military" />
              <span>{counselors.length} counselors available</span>
            </div>
          </div>

          <div className="relative">
            <ScrollArea className="h-[calc(90vh-240px)] overflow-auto counselors-scroll-area" style={{ overflowY: 'auto' }}>
              <div className="pr-4">
                <TabsContent value="all" className="mt-0">
                  <div className="space-y-4">
                    {counselors.map((counselor) => (
                      <CounselorCard key={counselor.id} counselor={counselor} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="military" className="mt-0">
                  <div className="space-y-4">
                    {counselors
                      .filter(c => c.type === 'military')
                      .map((counselor) => (
                        <CounselorCard key={counselor.id} counselor={counselor} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="trauma" className="mt-0">
                  <div className="space-y-4">
                    {counselors
                      .filter(c => c.type === 'trauma' || c.type === 'grief')
                      .map((counselor) => (
                        <CounselorCard key={counselor.id} counselor={counselor} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="child" className="mt-0">
                  <div className="space-y-4">
                    {counselors
                      .filter(c => c.type === 'child')
                      .map((counselor) => (
                        <CounselorCard key={counselor.id} counselor={counselor} />
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
            Save Contact List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CounselorCard: React.FC<{ counselor: Counselor }> = ({ counselor }) => {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'military': return <Shield className="h-5 w-5 mr-2 text-military" />;
      case 'trauma': return <Brain className="h-5 w-5 mr-2 text-military" />;
      case 'grief': return <HeartPulse className="h-5 w-5 mr-2 text-military" />;
      case 'child': return <GraduationCap className="h-5 w-5 mr-2 text-military" />;
      default: return <Award className="h-5 w-5 mr-2 text-military" />;
    }
  };

  return (
    <Card className="bg-[#1A1A1A]/40 border-military/30 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center">
                {getTypeIcon(counselor.type)}
                {counselor.name}
              </CardTitle>
              <div className="flex items-center gap-1 text-white/80">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{counselor.rating}</span>
                <span className="text-xs text-white/60">({counselor.reviewCount})</span>
              </div>
            </div>
            <CardDescription className="text-white/70 flex items-center mt-1">
              <Briefcase className="h-3 w-3 mr-1" />
              {counselor.title} • {counselor.experience} years experience
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-1 justify-end ml-2">
            {counselor.tags.map((tag, index) => (
              <Badge key={index} className="bg-military/20 text-military border border-military/50 text-xs whitespace-nowrap">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <Award className="h-4 w-4 mr-1 text-military" />
              Areas of Expertise
            </h4>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-white/80">
              {counselor.expertise.areas.map((area, index) => (
                <li key={index} className="pl-1">{area}</li>
              ))}
            </ul>
            {counselor.expertise.description && (
              <p className="text-xs italic text-white/60">{counselor.expertise.description}</p>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium flex items-center mb-1">
                <Calendar className="h-4 w-4 mr-1 text-military" />
                Availability
              </h4>
              <p className="text-sm text-white/80">
                {counselor.availability.days.join(", ")}
              </p>
              <p className="text-sm text-white/80 flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1 text-military/70" />
                {counselor.availability.hours}
              </p>
              <div className="flex gap-2 mt-2">
                {counselor.availability.online && (
                  <Badge variant="outline" className="text-xs border-green-600/30 text-green-500">Online</Badge>
                )}
                {counselor.availability.inPerson && (
                  <Badge variant="outline" className="text-xs border-blue-600/30 text-blue-500">In-Person</Badge>
                )}
                {counselor.availability.homeVisits && (
                  <Badge variant="outline" className="text-xs border-purple-600/30 text-purple-500">Home Visits</Badge>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center mb-1">
                <Users className="h-4 w-4 mr-1 text-military" />
                Languages
              </h4>
              <p className="text-sm text-white/80">
                {counselor.languages.join(", ")}
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-2 space-y-2 border-t border-white/10">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-military" />
              <p className="text-sm text-white/90">{counselor.phone}</p>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-military" />
              <p className="text-sm text-white/90">{counselor.email}</p>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-military" />
              <p className="text-sm text-white/90">{counselor.location}</p>
            </div>
          </div>
          
          {counselor.specialExperience && (
            <p className="text-xs italic text-white/60 mt-2">
              {counselor.specialExperience}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CounselorsModal; 