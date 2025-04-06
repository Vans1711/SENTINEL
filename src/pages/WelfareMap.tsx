import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, AlertTriangle, Shield, Filter, Layers } from 'lucide-react';

const WelfareMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

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

  useEffect(() => {
    // This would be where a real map initialization would happen
    console.log("Map would initialize here with a real mapping library like Mapbox or Google Maps");
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welfare Map</h1>
              <p className="text-white/70">View martyr family distribution and support status across India</p>
            </div>
            
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline" className="border-military flex items-center">
                <Filter size={16} className="mr-2" />
                Filter View
              </Button>
              
              <Button variant="outline" className="border-military flex items-center">
                <Layers size={16} className="mr-2" />
                Map Layers
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 military-card rounded-xl overflow-hidden relative" style={{ height: '600px' }}>
              {/* This would be a real map in production */}
              <div ref={mapRef} className="absolute inset-0 bg-military/30">
                {/* Simplified visualization of a map */}
                <div className="relative w-full h-full border border-military/50 overflow-hidden">
                  {/* Map background with grid */}
                  <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] opacity-10"></div>
                  
                  {/* Region circles */}
                  {regionData.map((region) => {
                    const size = getCircleSize(region.families);
                    const alertRatio = getAlertRatio(region.families, region.alertFamilies);
                    const isSelected = selectedRegion === region.name;
                    
                    return (
                      <div 
                        key={region.id}
                        className={`absolute cursor-pointer transition-all duration-300 
                          ${isSelected ? 'z-10 animate-pulse' : 'z-0'}
                        `}
                        style={{ 
                          left: `${region.coordinates.x}%`, 
                          top: `${region.coordinates.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => setSelectedRegion(region.name)}
                      >
                        <div 
                          className={`relative rounded-full border-2 
                            ${isSelected ? 'border-military' : 'border-white/30'}
                            shadow-lg transition-all duration-300
                          `}
                          style={{ 
                            width: `${size}px`, 
                            height: `${size}px`,
                            background: `conic-gradient(#FF4C4C ${alertRatio}%, rgba(44, 85, 48, 0.7) ${alertRatio}% 100%)`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {region.families}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap bg-[#121212]/80 px-3 py-1 rounded-md text-xs">
                            {region.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Map legend */}
                  <div className="absolute bottom-4 left-4 bg-[#121212]/80 p-3 rounded-md text-xs">
                    <div className="font-bold mb-2">Legend</div>
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full bg-military mr-2"></div>
                      <span>Families with support</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Families needing urgent help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 text-military h-5 w-5" /> 
                    National Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-military/20 p-4 rounded-md text-center">
                      <div className="text-3xl font-bold text-white">1,595</div>
                      <div className="text-sm text-white/70">Total Families</div>
                    </div>
                    <div className="bg-military/20 p-4 rounded-md text-center">
                      <div className="text-3xl font-bold text-red-400">120</div>
                      <div className="text-sm text-white/70">Need Urgent Help</div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Support Coverage</h4>
                    <div className="relative h-2 bg-military/30 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-military" style={{ width: '82%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>82% Covered</span>
                      <span>18% Pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {selectedRegion ? (
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="mr-2 text-military h-5 w-5" /> 
                        {selectedRegion}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRegion(null)}>
                        Clear
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
                            <div className="text-xs text-white/70">Families</div>
                          </div>
                          <div className="bg-military/20 p-3 rounded-md text-center">
                            <div className="text-2xl font-bold text-red-400">
                              {regionData.find(r => r.name === selectedRegion)?.alertFamilies}
                            </div>
                            <div className="text-xs text-white/70">Alerts</div>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-military text-white hover:bg-military-light">
                          View Detailed Report
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
