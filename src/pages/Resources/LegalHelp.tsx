import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gavel, FileText, MessageSquare, UserCheck, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define legal help categories
const legalHelpCategories = [
  {
    id: 'pension',
    titleEn: 'Pension Claim Assistance',
    descriptionEn: 'Help with claiming pension and financial benefits for martyr families.',
    icon: <Shield className="h-10 w-10 text-military" />,
    requiredDocs: [
      { name: 'martyrdom_certificate', label: 'Martyrdom Certificate' },
      { name: 'service_record', label: 'Service Record' },
      { name: 'identity_proof', label: 'Identity Proof' },
      { name: 'relationship_proof', label: 'Relationship Proof' },
      { name: 'bank_details', label: 'Bank Details' }
    ]
  },
  {
    id: 'housing',
    titleEn: 'Housing Rights',
    descriptionEn: 'Legal advice on housing rights, housing schemes, and property disputes.',
    icon: <FileText className="h-10 w-10 text-blue-400" />,
    requiredDocs: [
      { name: 'martyrdom_certificate', label: 'Martyrdom Certificate' },
      { name: 'property_papers', label: 'Property Papers' },
      { name: 'domicile_certificate', label: 'Domicile Certificate' },
      { name: 'income_certificate', label: 'Income Certificate' }
    ]
  },
  {
    id: 'education',
    titleEn: 'Education Rights',
    descriptionEn: 'Guidance on education scholarships and admission quotas for children of martyr families.',
    icon: <UserCheck className="h-10 w-10 text-green-400" />,
    requiredDocs: [
      { name: 'martyrdom_certificate', label: 'Martyrdom Certificate' },
      { name: 'education_certificates', label: 'Education Certificates' },
      { name: 'birth_certificate', label: 'Birth Certificate' },
      { name: 'income_certificate', label: 'Income Certificate' }
    ]
  },
  {
    id: 'employment',
    titleEn: 'Employment Rights',
    descriptionEn: 'Legal advice on reservation in government jobs and compassionate appointments for martyr families.',
    icon: <MessageSquare className="h-10 w-10 text-purple-400" />,
    requiredDocs: [
      { name: 'martyrdom_certificate', label: 'Martyrdom Certificate' },
      { name: 'educational_qualifications', label: 'Educational Qualifications' },
      { name: 'identity_proof', label: 'Identity Proof' },
      { name: 'relationship_proof', label: 'Relationship Proof' }
    ]
  },
  {
    id: 'general',
    titleEn: 'General Legal Advice',
    descriptionEn: 'Consultation and assistance on various legal issues faced by martyr families.',
    icon: <Gavel className="h-10 w-10 text-yellow-400" />,
    requiredDocs: [
      { name: 'identity_proof', label: 'Identity Proof' },
      { name: 'issue_related_documents', label: 'Issue Related Documents' }
    ]
  }
];

// Connection process steps
const connectionSteps = [
  {
    titleEn: "Submit Request",
    descriptionEn: "Provide details of your legal assistance need and upload required documents."
  },
  {
    titleEn: "Lawyer Matching",
    descriptionEn: "Our system matches you with a suitable government lawyer or legal expert based on your needs."
  },
  {
    titleEn: "Schedule Consultation",
    descriptionEn: "You will schedule a virtual or in-person consultation with the lawyer to discuss your case."
  },
  {
    titleEn: "Receive Legal Support",
    descriptionEn: "The lawyer will provide necessary legal assistance based on your documents and requirements."
  }
];

const LegalHelp = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: File | null}>({});
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    familyId: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocs({
        ...uploadedDocs,
        [docId]: e.target.files[0]
      });
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveTab('documents');
    
    // Reset uploaded documents when changing categories
    setUploadedDocs({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Successfully Submitted",
      description: "Your legal assistance request has been submitted. A lawyer will contact you soon.",
    });
    
    // Reset form
    setSelectedCategory(null);
    setUploadedDocs({});
    setContactInfo({
      name: '',
      phone: '',
      email: '',
      familyId: '',
      additionalInfo: ''
    });
    setActiveTab('info');
  };

  const selectedCategoryData = legalHelpCategories.find(cat => cat.id === selectedCategory);

  const isDocumentTabComplete = () => {
    if (!selectedCategoryData) return false;
    
    // Check if all required documents are uploaded
    return selectedCategoryData.requiredDocs.every(doc => 
      uploadedDocs[doc.name] !== undefined && uploadedDocs[doc.name] !== null
    );
  };

  const isFormValid = () => {
    return (
      contactInfo.name.trim() !== '' &&
      contactInfo.phone.trim() !== '' &&
      contactInfo.email.trim() !== ''
    );
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-military">Legal Help</span> and Document Guidance
            </h1>
            <p className="text-white/70">
              Helping families navigate document submissions, pension claims, and connect with government-appointed lawyers with AI-driven guidance.
            </p>
          </div>
          
          {selectedCategory ? (
            <div className="max-w-4xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    <span className="text-military">{selectedCategoryData?.titleEn}</span>
                  </h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedCategory(null)}
                    className="border-military text-military hover:bg-military/10"
                  >
                    Select Different Category
                  </Button>
                </div>
                
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="documents" className="space-y-4">
                  <Card className="military-card border-military/30">
                    <CardHeader>
                      <CardTitle>Required Documents</CardTitle>
                      <CardDescription>
                        Please upload all the following required documents. These documents are essential to provide you with the right legal assistance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedCategoryData?.requiredDocs.map(doc => (
                          <div key={doc.name} className="border border-military/30 rounded-lg p-4">
                            <label className="block font-medium mb-2">{doc.label}</label>
                            <div className="flex items-center gap-4">
                              <input
                                type="file"
                                onChange={(e) => handleDocumentUpload(e, doc.name)}
                                className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                              />
                              {uploadedDocs[doc.name] && (
                                <CheckCircle className="text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            {!uploadedDocs[doc.name] && (
                              <p className="text-xs text-amber-400 mt-1">* This document is required</p>
                            )}
                          </div>
                        ))}
                        
                        <div className="flex justify-end mt-6">
                          <Button 
                            onClick={() => setActiveTab('contact')}
                            disabled={!isDocumentTabComplete()}
                            className="bg-military text-white hover:bg-military-light"
                          >
                            Next: Contact Information
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4">
                  <Card className="military-card border-military/30">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>
                        Please provide your contact information so our legal experts can reach you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name*</label>
                          <input 
                            type="text" 
                            name="name"
                            value={contactInfo.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Phone Number*</label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={contactInfo.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your phone number"
                            className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Email*</label>
                          <input 
                            type="email" 
                            name="email"
                            value={contactInfo.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email address"
                            className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Family ID (if known)</label>
                          <input 
                            type="text" 
                            name="familyId"
                            value={contactInfo.familyId}
                            onChange={handleInputChange}
                            placeholder="Example: MAR-1234"
                            className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Additional Information</label>
                          <textarea 
                            name="additionalInfo"
                            value={contactInfo.additionalInfo}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Please provide more details about your legal issue"
                            className="w-full bg-[#1A1A1A]/50 border border-military/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-military"
                          />
                        </div>
                        
                        <div className="flex justify-between mt-6">
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab('documents')}
                            className="border-military text-military hover:bg-military/10"
                          >
                            Previous: Documents
                          </Button>
                          <Button 
                            onClick={() => setActiveTab('confirmation')}
                            disabled={!isFormValid()}
                            className="bg-military text-white hover:bg-military-light"
                          >
                            Next: Confirmation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="confirmation" className="space-y-4">
                  <Card className="military-card border-military/30">
                    <CardHeader>
                      <CardTitle>Request Confirmation</CardTitle>
                      <CardDescription>
                        Please review your details before submitting.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="border border-military/30 rounded-lg p-4 bg-military/5">
                          <h3 className="font-semibold mb-2">Selected Legal Assistance Category</h3>
                          <p>{selectedCategoryData?.titleEn}</p>
                          <p className="text-sm text-white/70 mt-1">{selectedCategoryData?.descriptionEn}</p>
                        </div>
                        
                        <div className="border border-military/30 rounded-lg p-4 bg-military/5">
                          <h3 className="font-semibold mb-2">Uploaded Documents</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedCategoryData?.requiredDocs.map(doc => (
                              <li key={doc.name} className="flex items-center gap-2">
                                <span>{doc.label}</span>
                                {uploadedDocs[doc.name] ? (
                                  <CheckCircle className="text-green-500 h-4 w-4" />
                                ) : (
                                  <AlertCircle className="text-red-500 h-4 w-4" />
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border border-military/30 rounded-lg p-4 bg-military/5">
                          <h3 className="font-semibold mb-2">Contact Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Name:</p>
                              <p>{contactInfo.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Phone:</p>
                              <p>{contactInfo.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email:</p>
                              <p>{contactInfo.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Family ID:</p>
                              <p>{contactInfo.familyId || 'Not provided'}</p>
                            </div>
                          </div>
                          {contactInfo.additionalInfo && (
                            <div className="mt-2">
                              <p className="text-sm font-medium">Additional Information:</p>
                              <p className="text-sm text-white/70">{contactInfo.additionalInfo}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="pt-2 text-center">
                          <p className="text-sm text-white/70 mb-4">
                            By submitting, you confirm that all information provided is true to the best of your knowledge.
                          </p>
                          
                          <div className="flex justify-between mt-6">
                            <Button 
                              variant="outline" 
                              onClick={() => setActiveTab('contact')}
                              className="border-military text-military hover:bg-military/10"
                            >
                              Previous: Contact
                            </Button>
                            <Button 
                              onClick={handleSubmit}
                              className="bg-military text-white hover:bg-military-light"
                            >
                              Submit Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {legalHelpCategories.map((category) => (
                <Card 
                  key={category.id}
                  className="border border-[#333333] hover:border-military transition-all cursor-pointer"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {category.icon}
                    </div>
                    <CardTitle className="text-center">{category.titleEn}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-white/70">{category.descriptionEn}</p>
                    <Button 
                      className="w-full mt-4 bg-military text-white hover:bg-military-light"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategorySelect(category.id);
                      }}
                    >
                      Get Assistance
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!selectedCategory && (
            <div className="max-w-4xl mx-auto mt-16 p-6 border border-military/30 rounded-lg bg-[#1A1A1A]/30">
              <h2 className="text-2xl font-bold mb-6 text-center">
                <span className="text-military">Lawyer Connection Process</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {connectionSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-military/20 text-military flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.titleEn}</h3>
                    <p className="text-sm text-white/70">{step.descriptionEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalHelp; 