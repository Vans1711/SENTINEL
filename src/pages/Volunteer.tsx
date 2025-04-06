import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Map, Calendar, Award, Heart, Star, Clock, Sparkles } from 'lucide-react';

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <section className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl font-bold mb-4">Become a <span className="text-military">Hero</span> for Martyr Families</h1>
              <p className="text-white/70 text-lg">
                Join our network of volunteers providing crucial support to the families of those who made the ultimate sacrifice for our nation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="military-card">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-military/20">
                    <Users className="h-8 w-8 text-military" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Family Support</h3>
                  <p className="text-white/70 mb-4">
                    Be assigned to specific martyr families, providing regular visits, emotional support, and practical assistance.
                  </p>
                  <Badge className="bg-military text-white">392 Active Volunteers</Badge>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-military/20">
                    <Award className="h-8 w-8 text-military" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Skill Mentoring</h3>
                  <p className="text-white/70 mb-4">
                    Share your professional expertise to help family members develop skills and find sustainable employment.
                  </p>
                  <Badge className="bg-military text-white">186 Active Mentors</Badge>
                </CardContent>
              </Card>
              
              <Card className="military-card">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-military/20">
                    <Map className="h-8 w-8 text-military" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Organizing</h3>
                  <p className="text-white/70 mb-4">
                    Organize local events, fundraisers, and awareness campaigns to build supportive communities around martyr families.
                  </p>
                  <Badge className="bg-military text-white">127 Organizers</Badge>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">How Our Volunteer <span className="text-military">Program Works</span></h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-military text-white font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Apply & Verify</h3>
                      <p className="text-white/70">Complete a simple application and our verification process to ensure security for our martyr families.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-military text-white font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Training</h3>
                      <p className="text-white/70">Participate in our comprehensive training program to understand the unique needs of martyr families.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-military text-white font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Assignment</h3>
                      <p className="text-white/70">Get matched with families based on your skills, location, and availability through our AI matching system.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-military text-white font-bold text-lg">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Ongoing Support</h3>
                      <p className="text-white/70">Receive continuous guidance, resources, and recognition as you make a difference in these families' lives.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button size="lg" className="bg-military text-white hover:bg-military-light">
                    Apply as a Volunteer
                  </Button>
                </div>
              </div>
              
              <div className="military-card p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Star className="text-military mr-2" /> Volunteer Recognition
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-14 h-14 rounded-full bg-military flex items-center justify-center mr-4 flex-shrink-0">
                      <Sparkles className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold">Maj. Rajesh Kaul (Retd.)</h4>
                        <Badge className="ml-2 bg-military/80 text-white">Gold Tier</Badge>
                      </div>
                      <div className="flex items-center text-sm text-white/60 mb-2">
                        <Clock className="h-3 w-3 mr-1" /> 564 Volunteer Hours
                      </div>
                      <p className="text-white/70 text-sm">
                        "As a retired officer, supporting martyr families is my way of continuing to serve the nation. The structure and impact of this program is unlike anything I've seen."
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-14 h-14 rounded-full bg-military flex items-center justify-center mr-4 flex-shrink-0">
                      <Heart className="text-red-400 h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold">Priya Sharma</h4>
                        <Badge className="ml-2 bg-white/80 text-[#121212]">Silver Tier</Badge>
                      </div>
                      <div className="flex items-center text-sm text-white/60 mb-2">
                        <Clock className="h-3 w-3 mr-1" /> 320 Volunteer Hours
                      </div>
                      <p className="text-white/70 text-sm">
                        "Being a volunteer gave me perspective on the true meaning of sacrifice. The families I support have become like my own extended family."
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-14 h-14 rounded-full bg-military flex items-center justify-center mr-4 flex-shrink-0">
                      <Calendar className="text-blue-400 h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold">Dr. Anand Mehta</h4>
                        <Badge className="ml-2 bg-military text-white/90">Bronze Tier</Badge>
                      </div>
                      <div className="flex items-center text-sm text-white/60 mb-2">
                        <Clock className="h-3 w-3 mr-1" /> 185 Volunteer Hours
                      </div>
                      <p className="text-white/70 text-sm">
                        "As a psychiatrist, I provide counseling services to families dealing with loss. The AI-Sentinel platform makes coordination seamless."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-bold mb-4">Impact <span className="text-military">Statistics</span></h2>
              <p className="text-white/70">
                Our volunteers make a real difference in the lives of martyr families across India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-military mb-2">705</div>
                <div className="text-lg font-medium">Active Volunteers</div>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-military mb-2">43,250</div>
                <div className="text-lg font-medium">Volunteer Hours</div>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-military mb-2">1,595</div>
                <div className="text-lg font-medium">Families Supported</div>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-military mb-2">98%</div>
                <div className="text-lg font-medium">Family Satisfaction</div>
              </div>
            </div>
          </section>
          
          <section>
            <div className="military-card p-8 rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Make a <span className="text-military">Difference?</span></h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Join our community of dedicated volunteers and help ensure that the families of our brave martyrs are never forgotten.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-military text-white hover:bg-military-light">
                  Apply Now
                </Button>
                
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Volunteer;
