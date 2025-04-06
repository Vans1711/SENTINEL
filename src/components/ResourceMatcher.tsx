import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Home, 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Download,
  ExternalLink,
  Star,
  Bookmark
} from 'lucide-react';
import { Progress } from './ui/progress';

// Types
type ResourceCategory = 'education' | 'employment' | 'healthcare' | 'housing' | 'financial';

type Resource = {
  id: string;
  title: string;
  category: ResourceCategory;
  organization: string;
  matchScore: number;
  eligibility: string[];
  description: string;
  deadline?: string;
  documents: string[];
  applicationLink?: string;
  location?: string;
  isBookmarked: boolean;
};

// Mock data for resources
const mockResources: Resource[] = [
  {
    id: '1',
    title: "Prime Minister's Scholarship Scheme",
    category: 'education',
    organization: 'Ministry of Defence',
    matchScore: 95,
    eligibility: ['Children of deceased defense personnel', 'Age below 25 years', 'For professional degree courses'],
    description: "Provides financial assistance to pursue higher education in professional streams like medicine, engineering, and management.",
    deadline: "2023-11-30",
    documents: ['Death certificate', 'Proof of service', 'Student ID', 'College admission letter'],
    applicationLink: "https://ksb.gov.in/pmss.htm",
    isBookmarked: false
  },
  {
    id: '2',
    title: "ECHS Healthcare Coverage",
    category: 'healthcare',
    organization: 'Ex-Servicemen Contributory Health Scheme',
    matchScore: 98,
    eligibility: ['Family of deceased defense personnel', 'Registered dependents only'],
    description: "Comprehensive healthcare coverage for treatment in empaneled hospitals across India.",
    documents: ['ECHS smart card', 'Dependent ID proof', 'Referral letter from polyclinic'],
    applicationLink: "https://echs.gov.in",
    location: "All districts",
    isBookmarked: true
  },
  {
    id: '3',
    title: "Special Family Pension",
    category: 'financial',
    organization: 'Department of Ex-Servicemen Welfare',
    matchScore: 100,
    eligibility: ['Spouse/dependent of deceased defense personnel'],
    description: "Monthly pension as financial support for families of defense personnel who died in service.",
    documents: ['Death certificate', 'Service certificate', 'Bank account details', 'Joint photographs'],
    isBookmarked: false
  },
  {
    id: '4',
    title: "Reservation in Government Jobs",
    category: 'employment',
    organization: 'Ministry of Home Affairs',
    matchScore: 76,
    eligibility: ['Spouse/dependents of martyrs', 'Age between 18-45 years', 'Minimum education as per post'],
    description: "Priority recruitment in government organizations under special quota for martyrs' families.",
    documents: ['ID proof', 'Educational certificates', 'Death certificate of personnel', 'Service certificate'],
    isBookmarked: false
  },
  {
    id: '5',
    title: "Housing Rehabilitation Program",
    category: 'housing',
    organization: 'Army Welfare Housing Organization',
    matchScore: 89,
    eligibility: ['Family of deceased Army personnel', 'No existing property in urban areas'],
    description: "Priority allotment of houses and plots at subsidized rates in various cities.",
    deadline: "2023-12-15",
    documents: ['Death certificate', 'NOK certificate', 'Service particulars', 'Income certificate'],
    location: "Multiple locations",
    isBookmarked: false
  },
  {
    id: '6',
    title: "Educational Concession in Kendriya Vidyalayas",
    category: 'education',
    organization: 'Kendriya Vidyalaya Sangathan',
    matchScore: 92,
    eligibility: ['Children of armed forces personnel killed in action', 'Age appropriate for school admission'],
    description: "Complete waiver of tuition fees and priority admission in Kendriya Vidyalayas across India.",
    documents: ['Battle casualty certificate', 'Birth certificate', 'Transfer certificate (if applicable)'],
    applicationLink: "https://kvsangathan.nic.in",
    isBookmarked: false
  },
  {
    id: '7',
    title: "Widow Certificate for Concessions",
    category: 'financial',
    organization: 'District Administration',
    matchScore: 86,
    eligibility: ['Widow of deceased defense personnel'],
    description: "Certificate providing various concessions in government services, taxes, and travel.",
    documents: ['Death certificate', 'Marriage certificate', 'ID proof', 'Passport size photographs'],
    location: "Local Tehsil office",
    isBookmarked: false
  }
];

// Helper function to get icon for category
const getCategoryIcon = (category: ResourceCategory) => {
  switch (category) {
    case 'education':
      return <GraduationCap className="h-5 w-5" />;
    case 'employment':
      return <Briefcase className="h-5 w-5" />;
    case 'healthcare':
      return <Heart className="h-5 w-5" />;
    case 'housing':
      return <Home className="h-5 w-5" />;
    case 'financial':
      return <FileText className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

// Helper function to get color for category
const getCategoryColor = (category: ResourceCategory) => {
  switch (category) {
    case 'education':
      return "bg-blue-500";
    case 'employment':
      return "bg-purple-500";
    case 'healthcare':
      return "bg-red-500";
    case 'housing':
      return "bg-green-500";
    case 'financial':
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

// Helper function to get text color for category
const getCategoryTextColor = (category: ResourceCategory) => {
  switch (category) {
    case 'education':
      return "text-blue-500";
    case 'employment':
      return "text-purple-500";
    case 'healthcare':
      return "text-red-500";
    case 'housing':
      return "text-green-500";
    case 'financial':
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

// Main Component
const ResourceMatcher = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Filter resources based on selected category
  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  // Sort by match score
  const sortedResources = [...filteredResources].sort((a, b) => b.matchScore - a.matchScore);

  // Handle bookmark toggle
  const toggleBookmark = (id: string) => {
    setResources(resources.map(resource => 
      resource.id === id 
        ? {...resource, isBookmarked: !resource.isBookmarked} 
        : resource
    ));
  };

  // View resource details
  const viewResourceDetails = (resource: Resource) => {
    setSelectedResource(resource);
  };

  // Categories for filter
  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'employment', label: 'Employment', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Heart className="h-4 w-4" /> },
    { id: 'housing', label: 'Housing', icon: <Home className="h-4 w-4" /> },
    { id: 'financial', label: 'Financial Aid', icon: <FileText className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            Recommended Resources 
            <Badge className="ml-2 bg-military text-white font-normal">
              Auto-matched for your needs
            </Badge>
          </h2>
          
          <Button variant="outline" className="border-military/50 text-white">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved ({resources.filter(r => r.isBookmarked).length})
          </Button>
        </div>
        
        <p className="text-white/70 mb-4">
          Based on your family's profile and needs, we've identified these resources that may help you. 
          Higher match percentage indicates greater relevance to your situation.
        </p>
        
        <TabsList className="w-full bg-[#1A1A1A] mb-6">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id}
              value={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`${selectedCategory === category.id 
                ? 'bg-military text-white' 
                : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
            >
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {selectedResource ? (
        <ResourceDetails 
          resource={selectedResource} 
          onBack={() => setSelectedResource(null)}
          onBookmark={() => toggleBookmark(selectedResource.id)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              onViewDetails={() => viewResourceDetails(resource)} 
              onBookmark={() => toggleBookmark(resource.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Resource Card Component
interface ResourceCardProps {
  resource: Resource;
  onViewDetails: () => void;
  onBookmark: () => void;
}

const ResourceCard = ({ resource, onViewDetails, onBookmark }: ResourceCardProps) => {
  const categoryIcon = getCategoryIcon(resource.category);
  const categoryColor = getCategoryColor(resource.category);
  const categoryTextColor = getCategoryTextColor(resource.category);
  
  return (
    <Card className="bg-[#1A1A1A]/40 border-gray-800 hover:border-military/40 transition-colors overflow-hidden flex flex-col">
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className={`p-2 rounded-md mr-3 ${categoryColor} bg-opacity-20`}>
              <div className={categoryTextColor}>{categoryIcon}</div>
            </div>
            <div>
              <CardTitle className="text-lg">
                {resource.title}
              </CardTitle>
              <CardDescription className="text-white/60">
                {resource.organization}
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className="h-8 w-8 absolute top-3 right-3"
          >
            <Bookmark className={`h-5 w-5 ${resource.isBookmarked ? 'text-military fill-military' : 'text-white/50'}`} />
          </Button>
        </div>
        
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-white/70">Match Score</span>
            <span className="text-sm font-medium">{resource.matchScore}%</span>
          </div>
          <Progress value={resource.matchScore} className="h-2 bg-gray-800">
            <div 
              className={`h-full rounded-full ${
                resource.matchScore > 90 ? 'bg-green-500' : 
                resource.matchScore > 70 ? 'bg-yellow-500' : 
                'bg-orange-500'
              }`}
              style={{ width: `${resource.matchScore}%` }}
            />
          </Progress>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-1">
        <p className="text-sm text-white/80 line-clamp-2 mb-3">{resource.description}</p>
        
        {resource.deadline && (
          <div className="flex items-center mb-2 text-sm">
            <Clock className="h-4 w-4 mr-2 text-orange-400" />
            <span className="text-white/70">
              Deadline: <span className="text-orange-400 font-medium">
                {new Date(resource.deadline).toLocaleDateString('en-US', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </span>
            </span>
          </div>
        )}
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewDetails} 
            className="w-full border-military/60 hover:bg-military/10 text-white mt-2"
          >
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Resource Details Component
interface ResourceDetailsProps {
  resource: Resource;
  onBack: () => void;
  onBookmark: () => void;
}

const ResourceDetails = ({ resource, onBack, onBookmark }: ResourceDetailsProps) => {
  const categoryIcon = getCategoryIcon(resource.category);
  const categoryColor = getCategoryColor(resource.category);
  const categoryTextColor = getCategoryTextColor(resource.category);
  
  return (
    <Card className="bg-[#1A1A1A]/40 border-gray-800">
      <CardHeader className="relative">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-[#1A1A1A] hover:bg-[#252525]"
        >
          ←
        </Button>
        
        <div className="flex justify-between items-start pt-4">
          <div className="flex items-start">
            <div className={`p-3 rounded-md mr-4 ${categoryColor} bg-opacity-20`}>
              <div className={categoryTextColor}>{categoryIcon}</div>
            </div>
            <div>
              <CardTitle className="text-xl">{resource.title}</CardTitle>
              <CardDescription className="text-white/60 text-base">
                {resource.organization}
              </CardDescription>
              
              <div className="flex items-center mt-2">
                <Badge className={`${getCategoryColor(resource.category)} font-normal mr-2`}>
                  {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                </Badge>
                
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{resource.matchScore}% Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onBookmark}
            className="h-9 w-9 rounded-full border-military/50"
          >
            <Bookmark className={`h-5 w-5 ${resource.isBookmarked ? 'text-military fill-military' : 'text-white/60'}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">About This Resource</h3>
          <p className="text-white/80">{resource.description}</p>
        </div>
        
        {resource.deadline && (
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 text-orange-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-orange-400">Application Deadline</p>
              <p className="text-sm">
                {new Date(resource.deadline).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium mb-3">Eligibility Requirements</h3>
          <ul className="space-y-2">
            {resource.eligibility.map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Required Documents</h3>
          <ul className="space-y-2">
            {resource.documents.map((doc, index) => (
              <li key={index} className="flex items-center">
                <FileText className="h-5 w-5 text-white/60 mr-2" />
                <span className="text-white/80">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col gap-3 pt-2">
          {resource.applicationLink && (
            <Button className="bg-military text-white hover:bg-military-light w-full sm:w-auto">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
          )}
          
          <Button variant="outline" className="border-military/50 text-white w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Download Information
          </Button>
        </div>
        
        {resource.location && (
          <div className="text-sm text-white/60 pt-2">
            <MapPin className="h-4 w-4 inline mr-1" /> Available in: {resource.location}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceMatcher; 