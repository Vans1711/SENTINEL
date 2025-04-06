import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  MapPin, 
  Award,
  Heart,
  Users,
  FileText,
  GraduationCap,
  School,
  Coins,
  Home,
  HeartHandshake,
  Briefcase,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock3,
  CirclePlus
} from 'lucide-react';

// Types for the family detail data
export type FamilyMember = {
  id: number;
  name: string;
  relationship: string;
  age: number;
  education?: string;
  occupation?: string;
};

export type SupportStatus = {
  pension: 'Approved' | 'Pending' | 'In Progress';
  housing: 'Provided' | 'Pending' | 'In Progress';
  education: 'Approved' | 'Pending' | 'In Progress';
  healthcare: 'Approved' | 'Pending' | 'In Progress';
  employment: 'Approved' | 'Pending' | 'In Progress';
};

export type SupportActivity = {
  id: number;
  date: string;
  activity: string;
  volunteer: string;
  status: 'completed' | 'scheduled' | 'canceled';
};

export type SupportRequest = {
  id: number;
  date: string;
  type: string;
  description: string;
  status: 'approved' | 'in-review' | 'pending' | 'rejected';
};

export type FamilyDetail = {
  id: number;
  name: string;
  region: string;
  status: 'green' | 'yellow' | 'red';
  primaryContact: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  lastVisit: string;
  martyrInfo: {
    name: string;
    rank: string;
    unit: string;
    dateOfMartyrdom: string;
    placeOfMartyrdom: string;
    awards: string[];
  };
  familyMembers: FamilyMember[];
  supportStatus: SupportStatus;
  monthlyPension: number;
  supportActivities: SupportActivity[];
  supportRequests: SupportRequest[];
  notes: string;
  assignedVolunteers: {
    id: number;
    name: string;
    role: string;
    contact: string;
  }[];
};

type FamilyDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  familyDetail: FamilyDetail | null;
};

const FamilyDetailModal: React.FC<FamilyDetailModalProps> = ({ isOpen, onClose, familyDetail }) => {
  if (!familyDetail) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Provided':
      case 'completed':
      case 'approved':
        return 'bg-green-600 text-white';
      case 'Pending':
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'In Progress':
      case 'scheduled':
      case 'in-review':
        return 'bg-blue-500 text-white';
      case 'canceled':
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green':
        return <CheckCircle className="h-5 w-5 text-green-500 mr-2" />;
      case 'yellow':
        return <Clock3 className="h-5 w-5 text-yellow-500 mr-2" />;
      case 'red':
        return <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-[#121212] text-white border-[#333]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center">
              {familyDetail.name}
              <Badge className="ml-3 text-xs px-2 py-1 bg-[#1A1A1A] border border-military/50 text-white">
                ID: {familyDetail.id}
              </Badge>
            </DialogTitle>
            <Badge className={
              familyDetail.status === 'green' ? 'bg-green-500' : 
              familyDetail.status === 'yellow' ? 'bg-yellow-500' : 
              'bg-red-500'
            }>
              {familyDetail.status === 'green' ? 'All Good' : 
               familyDetail.status === 'yellow' ? 'Need Attention' : 
               'Urgent Help Needed'}
            </Badge>
          </div>
          <DialogDescription className="text-white/70">
            Family of {familyDetail.martyrInfo.name}, {familyDetail.martyrInfo.rank}, {familyDetail.martyrInfo.unit}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-150px)] pr-4">
          <div className="space-y-6">
            {/* Overview Section */}
            <div className="flex items-center space-x-2 mb-4">
              {getStatusIcon(familyDetail.status)}
              <span className="font-medium">
                {familyDetail.status === 'green' ? 'Family is doing well and has all necessary support' : 
                 familyDetail.status === 'yellow' ? 'Family needs attention on specific matters' : 
                 'Family requires immediate intervention and support'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Contact Information */}
              <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-military" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <User className="text-military h-4 w-4 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-white/60">Primary Contact</p>
                      <p>{familyDetail.primaryContact} ({familyDetail.relationship})</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="text-military h-4 w-4 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-white/60">Phone</p>
                      <p>{familyDetail.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="text-military h-4 w-4 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-white/60">Email</p>
                      <p>{familyDetail.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-military h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white/60">Address</p>
                      <p>{familyDetail.address}</p>
                      <p>{familyDetail.district}, {familyDetail.state} - {familyDetail.pincode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="text-military h-4 w-4 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-white/60">Last Visit</p>
                      <p>{familyDetail.lastVisit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Martyr Information */}
              <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Award className="h-4 w-4 mr-2 text-military" />
                    Martyr Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/60">Name & Rank</p>
                    <p>{familyDetail.martyrInfo.name}, {familyDetail.martyrInfo.rank}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/60">Unit</p>
                    <p>{familyDetail.martyrInfo.unit}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/60">Date of Martyrdom</p>
                    <p>{new Date(familyDetail.martyrInfo.dateOfMartyrdom).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/60">Place of Martyrdom</p>
                    <p>{familyDetail.martyrInfo.placeOfMartyrdom}</p>
                  </div>
                  
                  {familyDetail.martyrInfo.awards.length > 0 && (
                    <div>
                      <p className="text-white/60">Awards & Honors</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {familyDetail.martyrInfo.awards.map((award, index) => (
                          <Badge key={index} className="bg-military/20 text-military border border-military text-xs">
                            {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Financial Support */}
              <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Coins className="h-4 w-4 mr-2 text-military" />
                    Financial Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-white/60">Monthly Pension</p>
                      <Badge className={getStatusColor(familyDetail.supportStatus.pension)}>
                        {familyDetail.supportStatus.pension}
                      </Badge>
                    </div>
                    <p className="text-lg font-semibold">₹{familyDetail.monthlyPension.toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-white/60 mb-1">Support Status</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Housing</span>
                          <Badge className={getStatusColor(familyDetail.supportStatus.housing)}>
                            {familyDetail.supportStatus.housing}
                          </Badge>
                        </div>
                        <Progress value={
                          familyDetail.supportStatus.housing === 'Provided' ? 100 :
                          familyDetail.supportStatus.housing === 'In Progress' ? 50 : 25
                        } className="h-1.5 bg-[#333]" indicatorClassName="bg-military" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Education</span>
                          <Badge className={getStatusColor(familyDetail.supportStatus.education)}>
                            {familyDetail.supportStatus.education}
                          </Badge>
                        </div>
                        <Progress value={
                          familyDetail.supportStatus.education === 'Approved' ? 100 :
                          familyDetail.supportStatus.education === 'In Progress' ? 50 : 25
                        } className="h-1.5 bg-[#333]" indicatorClassName="bg-military" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Healthcare</span>
                          <Badge className={getStatusColor(familyDetail.supportStatus.healthcare)}>
                            {familyDetail.supportStatus.healthcare}
                          </Badge>
                        </div>
                        <Progress value={
                          familyDetail.supportStatus.healthcare === 'Approved' ? 100 :
                          familyDetail.supportStatus.healthcare === 'In Progress' ? 50 : 25
                        } className="h-1.5 bg-[#333]" indicatorClassName="bg-military" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Employment</span>
                          <Badge className={getStatusColor(familyDetail.supportStatus.employment)}>
                            {familyDetail.supportStatus.employment}
                          </Badge>
                        </div>
                        <Progress value={
                          familyDetail.supportStatus.employment === 'Approved' ? 100 :
                          familyDetail.supportStatus.employment === 'In Progress' ? 50 : 25
                        } className="h-1.5 bg-[#333]" indicatorClassName="bg-military" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Family Members */}
            <Card className="bg-[#1A1A1A]/40 border-military/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-2 text-military" />
                  Family Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familyDetail.familyMembers.map((member) => (
                    <div key={member.id} className="p-3 bg-military/10 rounded-md">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-military/30 flex items-center justify-center mr-3 flex-shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <div className="flex text-xs text-white/70">
                                <span>{member.relationship}</span>
                                <span className="mx-1">•</span>
                                <span>{member.age} years</span>
                              </div>
                            </div>
                            {member.education && (
                              <Badge className="bg-[#1A1A1A] text-xs border border-military/50">
                                <School className="h-3 w-3 mr-1" /> {member.education}
                              </Badge>
                            )}
                          </div>
                          {member.occupation && (
                            <div className="mt-2 text-sm text-white/70 flex items-center">
                              <Briefcase className="h-3 w-3 mr-1" /> {member.occupation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Support */}
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <HeartHandshake className="h-4 w-4 mr-2 text-military" />
                    Recent Support Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {familyDetail.supportActivities.length > 0 ? (
                      familyDetail.supportActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-2">
                          <Badge className={`${
                            activity.status === 'completed' ? 'bg-green-600' :
                            activity.status === 'scheduled' ? 'bg-blue-500' :
                            'bg-red-500'
                          } h-6 rounded-full flex items-center justify-center flex-shrink-0`}>
                            {activity.status === 'completed' ? <CheckCircle className="h-3 w-3" /> :
                             activity.status === 'scheduled' ? <Clock className="h-3 w-3" /> :
                             <AlertTriangle className="h-3 w-3" />}
                          </Badge>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.activity}</p>
                            <div className="flex text-xs text-white/70">
                              <span>{new Date(activity.date).toLocaleDateString('en-US', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric'
                              })}</span>
                              <span className="mx-1">•</span>
                              <span>By: {activity.volunteer}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-white/60 text-sm py-2">No recent support activities</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Support Requests */}
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-military" />
                    Support Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {familyDetail.supportRequests.length > 0 ? (
                      familyDetail.supportRequests.map((request) => (
                        <div key={request.id} className="p-2 bg-[#1A1A1A]/50 rounded-md">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm">{request.type}</p>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status === 'approved' ? 'Approved' : 
                               request.status === 'in-review' ? 'In Review' : 
                               request.status === 'pending' ? 'Pending' : 'Rejected'}
                            </Badge>
                          </div>
                          <p className="text-xs text-white/70 mt-1">{request.description}</p>
                          <p className="text-xs text-white/50 mt-1">
                            Requested on: {new Date(request.date).toLocaleDateString('en-US', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-white/60 text-sm py-2">No support requests</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assigned Volunteers */}
            <Card className="bg-[#1A1A1A]/40 border-military/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-military" />
                  Assigned Volunteers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {familyDetail.assignedVolunteers.length > 0 ? (
                    familyDetail.assignedVolunteers.map((volunteer) => (
                      <div key={volunteer.id} className="flex items-center p-2 bg-military/10 rounded-md">
                        <div className="h-8 w-8 rounded-full bg-military/30 flex items-center justify-center mr-3 flex-shrink-0">
                          <Heart className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{volunteer.name}</p>
                          <div className="flex text-xs text-white/70">
                            <span>{volunteer.role}</span>
                            <span className="mx-1">•</span>
                            <span>{volunteer.contact}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-white/60 text-sm py-2">
                      No volunteers assigned yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {familyDetail.notes && (
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-military" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-line">{familyDetail.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="border-[#333]">Close</Button>
          <Button className="bg-military text-white hover:bg-military-light">
            <HeartHandshake className="h-4 w-4 mr-2" />
            Provide Support
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FamilyDetailModal; 