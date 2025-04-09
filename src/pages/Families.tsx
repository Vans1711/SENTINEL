import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, UserPlus, HeartHandshake, MapPin, Layers, Building, Heart, Briefcase } from 'lucide-react';
import FamilyDetailModal, { FamilyDetail } from '@/components/FamilyDetailModal';
import { demoFamilyDetails, getFamilyDetailById } from '@/data/demoFamilyDetails';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Fix Leaflet marker icon issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Create DefaultIcon for markers
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Set default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

// Add support centers data (from WelfareMap.tsx)
const governmentOffices = [
  {
    id: 101,
    name: 'Ministry of Defence Welfare Office',
    type: 'government',
    address: 'South Block, New Delhi',
    services: ['Pension Processing', 'Family Support Programs', 'Documentation'],
    position: [28.6129, 77.2085]
  },
  {
    id: 102,
    name: 'District Sainik Welfare Office',
    type: 'government',
    address: 'District Center, Delhi NCR',
    services: ['Local Support', 'Certificate Issuance', 'Grievance Handling'],
    position: [28.5512, 77.2558]
  }
];

const supportCenters = [
  {
    id: 201,
    name: 'Army Welfare Placement Organization',
    type: 'support',
    address: 'Cantonment Area, Delhi',
    services: ['Job Placement', 'Skill Development', 'Career Counseling'],
    position: [28.5410, 77.1865]
  },
  {
    id: 202,
    name: 'CRPF Family Welfare Center',
    type: 'support',
    address: 'CRPF Campus, Delhi',
    services: ['Family Counseling', 'Children Education', 'Healthcare Support'],
    position: [28.6821, 77.2060]
  }
];

// Combine all location data
const supportData = [
  { 
    id: 1, 
    name: 'Bharat Sainik Welfare Center', 
    type: 'ngo', 
    address: 'Sector 14, Delhi NCR', 
    services: ['Financial Support', 'Counseling', 'Education'], 
    position: [28.6139, 77.2090] 
  },
  { 
    id: 2, 
    name: 'Martyr Family Support Foundation', 
    type: 'ngo', 
    address: 'Connaught Place, New Delhi', 
    services: ['Housing Assistance', 'Medical Support'], 
    position: [28.6304, 77.2177] 
  },
  { 
    id: 3, 
    name: 'Government Pension Office', 
    type: 'government', 
    address: 'Central Secretariat, New Delhi', 
    services: ['Pension Distribution', 'Documentation Support'], 
    position: [28.6129, 77.2295] 
  },
  { 
    id: 4, 
    name: 'Military Welfare Center', 
    type: 'support', 
    address: 'Cantonment Area, Delhi', 
    services: ['Family Services', 'Grievance Support', 'Legal Aid'], 
    position: [28.5921, 77.1691] 
  },
  { 
    id: 5, 
    name: 'Veer Nari Support Group', 
    type: 'ngo', 
    address: 'Vasant Kunj, New Delhi', 
    services: ['Emotional Support', 'Community Building', 'Skill Development'], 
    position: [28.5355, 77.1571] 
  },
  ...governmentOffices,
  ...supportCenters
];

// Type of locations to filter
type LocationType = 'all' | 'ngo' | 'government' | 'support';

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
  const { t } = useTranslation();
  
  // Welfare Map states
  const mapRef = useRef<HTMLDivElement>(null);
  const [locationType, setLocationType] = useState<LocationType>('all');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]);
  const [mapZoom, setMapZoom] = useState<number>(11);
  const [showWelfareMap, setShowWelfareMap] = useState(false);
  
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

  // Welfare Map functions
  const getFilteredLocations = () => {
    if (locationType === 'all') return supportData;
    return supportData.filter(location => location.type === locationType);
  };
  
  const getMarkerIcon = (type: string) => {
    switch(type) {
      case 'ngo':
        return new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: iconShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        });
      case 'government':
        return new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: iconShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        });
      case 'support':
        return new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: iconShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        });
      default:
        return DefaultIcon;
    }
  };
  
  const focusLocation = (locationId: number) => {
    const location = supportData.find(item => item.id === locationId);
    if (location) {
      setMapCenter(location.position);
      setMapZoom(15);
      setSelectedLocation(locationId);
    }
  };

  // Component to sync map view when center or zoom changes
  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      map.setView(mapCenter, mapZoom);
    }, [map, mapCenter, mapZoom]);
    
    return null;
  };

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
          
          {/* Welfare Map Section */}
          <div id="welfare-map" className="mt-16 mb-8">
            <Card className="bg-[#1A1A1A]/30 border-[#2D3748] text-white">
              <CardHeader className="cursor-pointer" onClick={() => setShowWelfareMap(!showWelfareMap)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-military" />
                    <CardTitle className="text-xl">Welfare Map</CardTitle>
                  </div>
                  <div className="text-military">
                    {showWelfareMap ? "▲" : "▼"}
                  </div>
                </div>
                <p className="text-white/70 pl-7">Find support centers and resources near martyr families</p>
              </CardHeader>
              
              {showWelfareMap && (
                <CardContent className="pt-2">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant={locationType === 'all' ? "default" : "outline"} 
                        className={`border-military flex items-center ${locationType === 'all' ? 'bg-military' : ''}`}
                        onClick={() => setLocationType('all')}
                      >
                        <Layers size={16} className="mr-2" />
                        {t('welfare_map.all_locations')}
                      </Button>
                      
                      <Button 
                        variant={locationType === 'ngo' ? "default" : "outline"} 
                        className={`border-military flex items-center ${locationType === 'ngo' ? 'bg-green-700' : ''}`}
                        onClick={() => setLocationType('ngo')}
                      >
                        <Heart size={16} className="mr-2" />
                        NGOs
                      </Button>
                      
                      <Button 
                        variant={locationType === 'government' ? "default" : "outline"} 
                        className={`border-military flex items-center ${locationType === 'government' ? 'bg-red-700' : ''}`}
                        onClick={() => setLocationType('government')}
                      >
                        <Building size={16} className="mr-2" />
                        Government
                      </Button>
                      
                      <Button 
                        variant={locationType === 'support' ? "default" : "outline"} 
                        className={`border-military flex items-center ${locationType === 'support' ? 'bg-blue-700' : ''}`}
                        onClick={() => setLocationType('support')}
                      >
                        <Briefcase size={16} className="mr-2" />
                        Support Centers
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="h-[500px] rounded-xl overflow-hidden border border-[#2D3748]">
                          <MapContainer 
                            center={mapCenter} 
                            zoom={mapZoom} 
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            {getFilteredLocations().map(location => (
                              <Marker 
                                key={location.id} 
                                position={location.position}
                                icon={getMarkerIcon(location.type)}
                              >
                                <Popup>
                                  <div className="p-1">
                                    <h3 className="font-bold text-sm">{location.name}</h3>
                                    <p className="text-xs text-gray-600">{location.address}</p>
                                    <div className="mt-1 text-xs">
                                      <strong>Services:</strong>
                                      <ul className="list-disc pl-4 mt-1">
                                        {location.services.map((service, idx) => (
                                          <li key={idx}>{service}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </Popup>
                              </Marker>
                            ))}
                            
                            <ZoomControl position="bottomright" />
                            <MapController />
                          </MapContainer>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="bg-[#121212]/30 border-[#2D3748] text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Support Locations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                              {getFilteredLocations().map(location => (
                                <div 
                                  key={location.id}
                                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                    selectedLocation === location.id 
                                      ? 'bg-military/30 border border-military/50' 
                                      : 'bg-[#1A1A1A]/30 hover:bg-[#1A1A1A]/50 border border-[#2D3748]'
                                  }`}
                                  onClick={() => focusLocation(location.id)}
                                >
                                  <div className="flex items-start gap-2">
                                    <div className={`mt-1 h-3 w-3 rounded-full ${
                                      location.type === 'ngo' ? 'bg-green-500' : 
                                      location.type === 'government' ? 'bg-red-500' : 'bg-blue-500'
                                    }`} />
                                    <div>
                                      <h3 className="font-medium text-sm">{location.name}</h3>
                                      <div className="flex items-center text-xs text-white/70">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {location.address}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-[#121212]/30 border-[#2D3748] text-white">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Filter Locations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                                <p className="text-sm">NGOs & Foundations</p>
                              </div>
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                                <p className="text-sm">Government Offices</p>
                              </div>
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                                <p className="text-sm">Support Centers</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
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
