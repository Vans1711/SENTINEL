import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  UserCircle, 
  Calendar, 
  MapPin, 
  Shield, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface MartyrData {
  id: string;
  name: string;
  force: string;
  dateOfMartyrdom: string;
  state: string;
  image: string;
  children?: Array<{name: string, age: number}>;
  spouse?: string;
  rank?: string;
}

const MartyrFamilyList = () => {
  const [martyrs, setMartyrs] = useState<MartyrData[]>([]);
  const [filteredMartyrs, setFilteredMartyrs] = useState<MartyrData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [stateFilter, setStateFilter] = useState('ALL');
  const [forceFilter, setForceFilter] = useState('ALL');
  const itemsPerPage = 12;

  // States and forces in India for filters
  const indianStates = [
    'ALL', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Jammu and Kashmir', 'Delhi', 'Chandigarh', 'Puducherry'
  ];
  
  const forces = [
    'ALL', 'Assam Rifles (AR)', 'Border Security Force (BSF)', 'Central Industrial Security Force (CISF)', 
    'Central Reserve Police Force (CRPF)', 'Indo-Tibetan Border Police (ITBP)', 
    'National Disaster Response Force (NDRF)', 'National Security Guard (NSG)', 
    'Sashastra Seema Bal (SSB)', 'Indian Army', 'Indian Navy', 'Indian Air Force'
  ];

  // Sample/fallback data to use when actual API doesn't return some information
  const fallbackMartyrs: MartyrData[] = [
    {
      id: "1",
      name: "Akhilesh Kumar Pandey",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "22/05/2016",
      state: "Uttar Pradesh",
      image: "/martyrs/1.jpg",
      children: [
        { name: "Aryan Pandey", age: 12 },
        { name: "Ananya Pandey", age: 8 }
      ],
      spouse: "Kavita Pandey",
      rank: "Rifleman"
    },
    {
      id: "2",
      name: "Alok Rao",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "17/05/2023",
      state: "Bihar",
      image: "/martyrs/2.jpg",
      children: [
        { name: "Aditya Rao", age: 5 }
      ],
      spouse: "Priyanka Rao",
      rank: "Havildar"
    },
    {
      id: "3",
      name: "Alom Hussain",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "18/06/2018",
      state: "Assam",
      image: "/martyrs/3.jpg",
      spouse: "Najma Begum",
      rank: "Rifleman"
    },
    {
      id: "4",
      name: "Ashutosh Kumar",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "10/09/2020",
      state: "Bihar",
      image: "/martyrs/4.jpg",
      children: [
        { name: "Aarav Kumar", age: 4 }
      ],
      spouse: "Neha Kumar",
      rank: "Captain"
    },
    {
      id: "5",
      name: "Avatar Chakma",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "22/05/2021",
      state: "Mizoram",
      image: "/martyrs/5.jpg",
      children: [
        { name: "Nitin Chakma", age: 7 },
        { name: "Nikita Chakma", age: 9 }
      ],
      spouse: "Lata Chakma",
      rank: "Rifleman"
    },
    {
      id: "6",
      name: "Babu Rao Bongu",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "21/10/2020",
      state: "Telangana",
      image: "/martyrs/6.jpg",
      spouse: "Sunita Bongu",
      rank: "Havildar"
    },
    {
      id: "7",
      name: "Baldev Kumar",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "22/05/2016",
      state: "Haryana",
      image: "/martyrs/7.jpg",
      children: [
        { name: "Lakshya Kumar", age: 10 }
      ],
      spouse: "Suman Kumar",
      rank: "Naik"
    },
    {
      id: "8",
      name: "Bhupal Singh",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "02/01/2016",
      state: "Rajasthan",
      image: "/martyrs/8.jpg",
      children: [
        { name: "Akshay Singh", age: 15 },
        { name: "Anika Singh", age: 12 }
      ],
      spouse: "Rekha Singh",
      rank: "Subedar"
    },
    {
      id: "9",
      name: "Bhupender Kumar",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "22/05/2016",
      state: "Uttar Pradesh",
      image: "/martyrs/9.jpg",
      spouse: "Anita Kumar",
      rank: "Lance Naik"
    },
    {
      id: "10",
      name: "Biju Sorupuwar",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "30/06/2017",
      state: "Assam",
      image: "/martyrs/10.jpg",
      children: [
        { name: "Bipul Sorupuwar", age: 6 }
      ],
      spouse: "Mina Sorupuwar",
      rank: "Rifleman"
    },
    {
      id: "11",
      name: "Champeswar Mahakhud",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "07/09/2018",
      state: "Odisha",
      image: "/martyrs/11.jpg",
      children: [
        { name: "Chirag Mahakhud", age: 8 },
        { name: "Charu Mahakhud", age: 5 }
      ],
      spouse: "Parvati Mahakhud",
      rank: "Rifleman"
    },
    {
      id: "12",
      name: "Dhaneswar Sharma",
      force: "Assam Rifles (AR)",
      dateOfMartyrdom: "11/08/2020",
      state: "Assam",
      image: "/martyrs/12.jpg",
      spouse: "Garima Sharma",
      rank: "Havildar"
    },
    // More sample data will be merged with actual data from API
  ];

  // Fetch data from Bharat Ke Veer memorial site
  useEffect(() => {
    const fetchMartyrs = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call to the memorial site
        // For now, we'll simulate a fetch with a timeout and our sample data
        
        // This is where you would implement the actual fetch from https://bharatkeveer.gov.in/memorial
        // const response = await fetch('https://bharatkeveer.gov.in/api/martyrs');
        // const data = await response.json();
        
        // For demo purposes, using setTimeout to simulate API latency
        setTimeout(() => {
          // Merge and deduplicate data from API and fallback
          // In a real implementation, you would use the API data and only fill in missing details
          const mergedData = [...fallbackMartyrs];
          
          setMartyrs(mergedData);
          setFilteredMartyrs(mergedData);
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Error fetching martyr data:', err);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
        
        // Use fallback data in case of error
        setMartyrs(fallbackMartyrs);
        setFilteredMartyrs(fallbackMartyrs);
      }
    };

    fetchMartyrs();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...martyrs];
    
    // Apply state filter
    if (stateFilter !== 'ALL') {
      results = results.filter(martyr => martyr.state === stateFilter);
    }
    
    // Apply force filter
    if (forceFilter !== 'ALL') {
      results = results.filter(martyr => martyr.force === forceFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(martyr => 
        martyr.name.toLowerCase().includes(term) || 
        (martyr.spouse && martyr.spouse.toLowerCase().includes(term)) ||
        (martyr.children && martyr.children.some(child => 
          child.name.toLowerCase().includes(term)
        ))
      );
    }
    
    setFilteredMartyrs(results);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, stateFilter, forceFilter, martyrs]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMartyrs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredMartyrs.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Martyr <span className="text-military">Families</span>
            </h1>
            <p className="text-white/70 mb-6">
              Honoring the brave souls who made the ultimate sacrifice for our nation.
              Their families are an integral part of our Sentinel community.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-[#1A1A1A]/60 border border-military/20 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-white/50" />
                </div>
                <Input
                  placeholder="Search by name..."
                  className="bg-[#1A1A1A]/70 border-military/30 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="bg-[#1A1A1A]/70 border-military/30">
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    {indianStates.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={forceFilter} onValueChange={setForceFilter}>
                <SelectTrigger className="bg-[#1A1A1A]/70 border-military/30">
                  <SelectValue placeholder="Filter by force" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Forces</SelectLabel>
                    {forces.map(force => (
                      <SelectItem key={force} value={force}>{force}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-white/70">
                {filteredMartyrs.length} martyr {filteredMartyrs.length === 1 ? 'family' : 'families'} found
              </div>
              <Button 
                variant="outline" 
                className="text-military border-military/50"
                onClick={() => {
                  setSearchTerm('');
                  setStateFilter('ALL');
                  setForceFilter('ALL');
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Martyr Cards */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-military animate-spin" />
              <p className="ml-4 text-white/70">Loading martyr data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-900/30 rounded-xl p-6 text-center">
              <p className="text-red-400">{error}</p>
              <Button
                variant="outline"
                className="mt-4 text-military border-military/50"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {filteredMartyrs.length === 0 ? (
                <div className="bg-[#1A1A1A]/60 border border-[#2D3748] rounded-xl p-8 text-center">
                  <p className="text-white/70">No martyr families match your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentItems.map((martyr) => (
                    <Card key={martyr.id} className="bg-[#1A1A1A]/60 border-[#2D3748] overflow-hidden">
                      <div className="h-48 bg-military/10 flex justify-center items-center overflow-hidden">
                        {martyr.image ? (
                          <img 
                            src={martyr.image} 
                            alt={martyr.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-martyr.jpg';
                            }} 
                          />
                        ) : (
                          <UserCircle className="h-20 w-20 text-white/30" />
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center">
                          <Shield className="mr-2 h-5 w-5 text-military" />
                          {martyr.name}
                        </CardTitle>
                        <CardDescription className="text-white/60 flex items-center">
                          {martyr.rank && `${martyr.rank}, `}{martyr.force}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-white/70 text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-military/70" />
                            <span>{martyr.dateOfMartyrdom}</span>
                          </div>
                          <Badge variant="outline" className="bg-military/10 text-military border-military/30">
                            {martyr.state}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 mt-2">
                          {martyr.spouse && (
                            <p className="text-sm text-white/70">
                              <span className="text-white/50">Spouse:</span> {martyr.spouse}
                            </p>
                          )}
                          
                          {martyr.children && martyr.children.length > 0 && (
                            <div>
                              <p className="text-sm text-white/70">
                                <span className="text-white/50">Children:</span>
                              </p>
                              <ul className="list-disc pl-5 text-xs text-white/70 mt-1">
                                {martyr.children.map((child, index) => (
                                  <li key={index}>
                                    {child.name} ({child.age} years)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <Button variant="outline" className="w-full mt-2 border-military/50 text-military">
                          View Family Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {filteredMartyrs.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-10 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-military/50 text-military"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Logic for which page numbers to show
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={i}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className={
                            currentPage === pageNum
                              ? "bg-military hover:bg-military-light"
                              : "border-military/50 text-military"
                          }
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="px-2 text-white/50">...</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-military/50 text-military"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-military/50 text-military"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MartyrFamilyList; 