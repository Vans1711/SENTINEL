import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, UserPlus, HeartHandshake, MapPin } from 'lucide-react';
import FamilyDetailModal, { FamilyDetail } from '@/components/FamilyDetailModal';
import { demoFamilyDetails, getFamilyDetailById } from '@/data/demoFamilyDetails';

const FamilyCard = ({ id, name, region, status, lastVisit, children, onViewProfile }: { 
  id: number,
  name: string, 
  region: string, 
  status: 'green' | 'yellow' | 'red', 
  lastVisit: string,
  children: number,
  onViewProfile: (id: number) => void
}) => {
  const statusColor = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500"
  };
  
  const statusText = {
    green: "All Good",
    yellow: "Need Attention",
    red: "Urgent Help Needed"
  };

  return (
    <Card className="bg-[#121212]/30 border-[#2D3748] text-white hover:bg-[#121212]/50 transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge className={statusColor[status]}>
            {statusText[status]}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-white/70">
          <MapPin className="h-3 w-3 mr-1" />
          {region}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-white/60">Last Visit</p>
              <p>{lastVisit}</p>
            </div>
            <div>
              <p className="text-white/60">Children</p>
              <p>{children}</p>
            </div>
          </div>
          <div className="flex space-x-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-8 border-[#2D3748] hover:bg-[#1E293B]"
              onClick={() => onViewProfile(id)}
            >
              View Profile
            </Button>
            <Button size="sm" className="flex items-center h-8 bg-military text-white hover:bg-military-light">
              <HeartHandshake className="h-3 w-3 mr-1" /> Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Families = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'green' | 'yellow' | 'red'>('all');
  const [selectedFamilyDetail, setSelectedFamilyDetail] = useState<FamilyDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const families = demoFamilyDetails.map(family => ({
    id: family.id,
    name: family.name,
    region: family.region,
    status: family.status,
    lastVisit: new Date(family.lastVisit).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    }),
    children: family.familyMembers.filter(member => 
      member.relationship.toLowerCase().includes('son') || 
      member.relationship.toLowerCase().includes('daughter') || 
      (member.age && member.age < 18)
    ).length
  }));

  const handleViewProfile = (id: number) => {
    const familyDetail = getFamilyDetailById(id);
    if (familyDetail) {
      setSelectedFamilyDetail(familyDetail);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredFamilies = families.filter(family => {
    const matchesSearch = family.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         family.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || family.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Martyr Families</h1>
              <p className="text-white/70">Supporting {families.length} families across India</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                <input 
                  type="text" 
                  placeholder="Search families..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-md bg-[#1A1A1A]/30 border border-[#2D3748] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-military"
                />
              </div>
              
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'green' | 'yellow' | 'red')}
                  className="appearance-none pl-4 pr-10 py-2 rounded-md bg-[#1A1A1A]/30 border border-[#2D3748] text-white focus:outline-none focus:ring-2 focus:ring-military"
                >
                  <option value="all">All Status</option>
                  <option value="green">All Good</option>
                  <option value="yellow">Need Attention</option>
                  <option value="red">Urgent Help</option>
                </select>
                <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none" />
              </div>
              
              <Button className="bg-military text-white hover:bg-military-light flex items-center">
                <UserPlus size={16} className="mr-2" />
                Add Family
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFamilies.map((family) => (
              <FamilyCard 
                key={family.id}
                id={family.id}
                name={family.name}
                region={family.region}
                status={family.status}
                lastVisit={family.lastVisit}
                children={family.children}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>

          {filteredFamilies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-white/70">No families found matching your search criteria.</p>
              <Button 
                variant="link" 
                className="text-military mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <FamilyDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        familyDetail={selectedFamilyDetail}
      />
      
      <Footer />
    </div>
  );
};

export default Families;
