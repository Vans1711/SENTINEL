import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, AlertTriangle, Shield, Filter, Layers, Building, Briefcase, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

// Add ministry office data
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

// Add support centers
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

const WelfareMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { t } = useTranslation();
  
  // Interactive map states
  const [locationType, setLocationType] = useState<LocationType>('all');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]);
  const [mapZoom, setMapZoom] = useState<number>(11);

  // Mock data for regions with family counts
  const regionData = [
    { id: 1, name: 'Northern India', families: 450, alertFamilies: 32, coordinates: { x: 25, y: 20 } },
    { id: 2, name: 'Eastern India', families: 280, alertFamilies: 18, coordinates: { x: 70, y: 40 } },
    { id: 3, name: 'Western India', families: 320, alertFamilies: 24, coordinates: { x: 15, y: 60 } },
    { id: 4, name: 'Southern India', families: 190, alertFamilies: 14, coordinates: { x: 40, y: 85 } },
    { id: 5, name: 'Central India', families: 260, alertFamilies: 21, coordinates: { x: 45, y: 45 } },
    { id: 6, name: 'North-Eastern India', families: 95, alertFamilies: 11, coordinates: { x: 80, y: 25 } },
  ];

  const getCircleSize = (families: number) => {
    const base = 20;
    const size = base + (families / 50);
    return Math.min(size, 50); // Cap size at 50px
  };

  const getAlertRatio = (families: number, alertFamilies: number) => {
    return (alertFamilies / families) * 100;
  };
  
  // Get filtered support locations based on selected type
  const getFilteredLocations = () => {
    if (locationType === 'all') return supportData;
    return supportData.filter(location => location.type === locationType);
  };
  
  // Get marker icon based on location type
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
  
  // Function to focus and zoom to selected location
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

  // Custom styling for map container
  const mapStyle = {
    height: '100%',
    width: '100%',
    borderRadius: '12px'
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('welfare_map.title')}</h1>
              <p className="text-white/70">{t('welfare_map.description')}</p>
            </div>
            
            <div className="flex gap-4 mt-4 md:mt-0">
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
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 military-card rounded-xl overflow-hidden relative" style={{ height: '600px' }}>
              {/* Real interactive map */}
              <MapContainer center={mapCenter} zoom={mapZoom} style={mapStyle} zoomControl={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                <MapController />
                
                {getFilteredLocations().map((location) => (
                  <Marker 
                    key={location.id} 
                    position={location.position} 
                    icon={getMarkerIcon(location.type)}
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation(location.id);
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-black">
                        <h3 className="font-bold">{location.name}</h3>
                        <p className="text-sm">{location.address}</p>
                        <div className="mt-2">
                          <p className="text-xs font-semibold">Services:</p>
                          <ul className="text-xs list-disc pl-4">
                            {location.services.map((service, index) => (
                              <li key={index}>{service}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-[#121212]/80 p-3 rounded-md text-xs z-[1000]">
                <div className="font-bold mb-2">{t('welfare_map.legend')}</div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>NGOs</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Government Offices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Support Centers</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Selected location information */}
              {selectedLocation ? (
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="mr-2 text-military h-5 w-5" /> 
                        {supportData.find(location => location.id === selectedLocation)?.name}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                        {t('welfare_map.clear')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {supportData.find(location => location.id === selectedLocation) && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Address:</h4>
                          <p className="text-sm text-white/70">
                            {supportData.find(location => location.id === selectedLocation)?.address}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Services:</h4>
                          <div className="flex flex-wrap gap-2">
                            {supportData.find(location => location.id === selectedLocation)?.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="bg-military/20">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full bg-military text-white hover:bg-military-light">
                          {t('welfare_map.contact_now')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="mr-2 text-military h-5 w-5" /> 
                      {t('welfare_map.national_overview')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-military/20 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold text-white">1,595</div>
                        <div className="text-sm text-white/70">{t('welfare_map.total_families')}</div>
                      </div>
                      <div className="bg-military/20 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold text-red-400">120</div>
                        <div className="text-sm text-white/70">{t('welfare_map.need_urgent_help')}</div>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">{t('welfare_map.support_coverage')}</h4>
                      <div className="relative h-2 bg-military/30 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-military" style={{ width: '82%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>82% {t('welfare_map.covered')}</span>
                        <span>18% {t('welfare_map.pending')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {selectedRegion ? (
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="mr-2 text-military h-5 w-5" /> 
                        {selectedRegion}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRegion(null)}>
                        {t('welfare_map.clear')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {regionData.find(r => r.name === selectedRegion) && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-military/20 p-3 rounded-md text-center">
                            <div className="text-2xl font-bold text-white">
                              {regionData.find(r => r.name === selectedRegion)?.families}
                            </div>
                            <div className="text-xs text-white/70">{t('welfare_map.families')}</div>
                          </div>
                          <div className="bg-military/20 p-3 rounded-md text-center">
                            <div className="text-2xl font-bold text-red-400">
                              {regionData.find(r => r.name === selectedRegion)?.alertFamilies}
                            </div>
                            <div className="text-xs text-white/70">{t('welfare_map.alerts')}</div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-military text-white hover:bg-military-light">
                          {t('welfare_map.view_detailed_report')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 text-military h-5 w-5" /> 
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start p-2 bg-military/20 rounded-md">
                        <Badge className="bg-red-500 mr-2 mt-0.5">Urgent</Badge>
                        <div>
                          <p className="text-sm font-medium">Pension Delay in Western Region</p>
                          <p className="text-xs text-white/70">Affects 12 families • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start p-2 bg-military/20 rounded-md">
                        <Badge className="bg-yellow-500 mr-2 mt-0.5">Medium</Badge>
                        <div>
                          <p className="text-sm font-medium">Healthcare Support Needed</p>
                          <p className="text-xs text-white/70">5 families in Southern Region • 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start p-2 bg-military/20 rounded-md">
                        <Badge className="bg-military mr-2 mt-0.5">Update</Badge>
                        <div>
                          <p className="text-sm font-medium">Educational Scholarships Available</p>
                          <p className="text-xs text-white/70">All regions • 2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Listing of nearby support locations */}
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="mr-2 text-military h-5 w-5" /> 
                    Nearby Support Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {getFilteredLocations().slice(0, 5).map((location) => (
                      <div 
                        key={location.id}
                        className={`p-2 rounded-md cursor-pointer transition-colors ${
                          selectedLocation === location.id 
                            ? 'bg-military/50' 
                            : 'bg-military/20 hover:bg-military/30'
                        }`}
                        onClick={() => focusLocation(location.id)}
                      >
                        <div className="flex items-center gap-2">
                          {location.type === 'ngo' && <Heart size={14} className="text-green-500" />}
                          {location.type === 'government' && <Building size={14} className="text-red-500" />}
                          {location.type === 'support' && <Briefcase size={14} className="text-blue-500" />}
                          <p className="font-medium text-sm">{location.name}</p>
                        </div>
                        <p className="text-xs text-white/70 mt-1">{location.address}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="mr-2 text-military h-5 w-5" /> 
                    Resource Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Volunteers</span>
                        <span>392 Active</span>
                      </div>
                      <div className="relative h-2 bg-military/30 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-green-500" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Financial Aid</span>
                        <span>₹24.6L Allocated</span>
                      </div>
                      <div className="relative h-2 bg-military/30 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Counseling Sessions</span>
                        <span>214 This Month</span>
                      </div>
                      <div className="relative h-2 bg-military/30 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-purple-500" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WelfareMap;
