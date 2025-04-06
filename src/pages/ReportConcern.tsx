import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, Shield, Phone, Clock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportConcern = () => {
  const { toast } = useToast();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    concernType: '',
    familyId: '',
    description: '',
    name: '',
    contact: '',
    evidence: null as File | null,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        evidence: e.target.files[0],
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success toast
    toast({
      title: "Concern Reported",
      description: "Your concern has been submitted. A case officer will review it shortly.",
    });
    
    // Reset form
    setFormData({
      concernType: '',
      familyId: '',
      description: '',
      name: '',
      contact: '',
      evidence: null,
    });
  };
  
  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
    if (!isAnonymous) {
      setFormData({
        ...formData,
        name: '',
        contact: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Report a <span className="text-military">Concern</span>
            </h1>
            <p className="text-white/70">
              Help us ensure the welfare of martyr families by reporting any concerns or issues you've observed.
              All reports are handled with strict confidence and prompt attention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="military-card border-military/30">
                <CardHeader>
                  <CardTitle>Submit Your Concern</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Concern Type*</label>
                        <select 
                          name="concernType" 
                          value={formData.concernType}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                        >
                          <option value="">Select a concern type</option>
                          <option value="pension">Pension/Financial Issues</option>
                          <option value="welfare">Welfare Support Issues</option>
                          <option value="health">Healthcare Access Issues</option>
                          <option value="education">Educational Support Issues</option>
                          <option value="housing">Housing/Accommodation Issues</option>
                          <option value="corruption">Corruption/Misappropriation</option>
                          <option value="abuse">Abuse/Harassment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Family ID (if known)</label>
                        <input 
                          type="text" 
                          name="familyId"
                          value={formData.familyId}
                          onChange={handleInputChange}
                          placeholder="e.g. MAR-1234"
                          className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                        />
                        <p className="text-xs text-white/50 mt-1">Family ID is in the format MAR-XXXX</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description of the Concern*</label>
                        <textarea 
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          placeholder="Please provide detailed information about your concern..."
                          className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Supporting Evidence (optional)</label>
                        <input 
                          type="file" 
                          name="evidence"
                          onChange={handleFileChange}
                          className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                        />
                        <p className="text-xs text-white/50 mt-1">Upload documents, photos, or any relevant evidence (Max: 10MB)</p>
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={toggleAnonymous}
                          className="flex items-center gap-2 mb-4"
                        >
                          {isAnonymous ? <Eye size={16} /> : <EyeOff size={16} />}
                          {isAnonymous ? "Reveal My Identity" : "Report Anonymously"}
                        </Button>
                        
                        {!isAnonymous && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Your Name</label>
                              <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Contact Information</label>
                              <input 
                                type="text" 
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                placeholder="Email or phone number"
                                className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-military text-white hover:bg-military-light">
                        Submit Report
                      </Button>
                      <p className="text-xs text-white/50 text-center mt-2">
                        By submitting this report, you confirm that all information provided is true to the best of your knowledge.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 text-military" />
                    Report Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-military flex items-center justify-center mr-3 flex-shrink-0">
                      <p className="font-bold">1</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Submission</h3>
                      <p className="text-sm text-white/70">Your report is securely submitted and assigned a unique tracking ID.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-military flex items-center justify-center mr-3 flex-shrink-0">
                      <p className="font-bold">2</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Verification</h3>
                      <p className="text-sm text-white/70">A case officer reviews and verifies the information provided.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-military flex items-center justify-center mr-3 flex-shrink-0">
                      <p className="font-bold">3</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Action</h3>
                      <p className="text-sm text-white/70">Appropriate action is taken based on the nature of the concern.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-military flex items-center justify-center mr-3 flex-shrink-0">
                      <p className="font-bold">4</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Resolution</h3>
                      <p className="text-sm text-white/70">You'll receive updates on the resolution if contact is provided.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 text-military" />
                    Urgent Concerns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70 mb-4">
                    For immediate assistance with urgent welfare matters, please contact our emergency helpline.
                  </p>
                  <div className="bg-military/20 p-3 rounded-md mb-4">
                    <div className="flex items-center text-white">
                      <Phone className="h-5 w-5 mr-2" />
                      <span className="font-bold">1800-XXX-XXXX</span>
                    </div>
                    <div className="flex items-center text-white/70 text-sm mt-1">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Available 24/7</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/50">
                    Our support team is available around the clock to address critical concerns requiring immediate attention.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Check className="mr-2 text-military" />
                    Your Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70">
                    We take your privacy seriously. All reports are confidential and handled with the utmost discretion. Your identity will never be disclosed without your consent.
                  </p>
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

export default ReportConcern;
