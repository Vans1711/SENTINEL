import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, MessageSquare, User, Heart, ThumbsUp, Check, Clock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CommunitySpace = () => {
  // Community forum user data
  const communityUsers = [
    { name: "Hariom Gupta", role: "Verified Member", avatar: "HG" },
    { name: "Sneha Negi", role: "Verified Member", avatar: "SN" },
    { name: "Tushar Yadav", role: "Verified Member", avatar: "TY" },
    { name: "Mohammad Kaif", role: "Verified Member", avatar: "MK" },
    { name: "Vanshika Tyagi", role: "Verified Member", avatar: "VT" }
  ];

  // Sample forum threads
  const forumThreads = [
    {
      id: "thread1",
      type: "Ask a Question",
      title: "Support for children's education for martyrs of recent border clash",
      category: "Education Support",
      region: "North India",
      author: communityUsers[0],
      replies: 12,
      lastActivity: "2 hours ago",
      content: "My husband was martyred in the recent border clash. We have two children, ages 8 and 12. What educational support programs are available for them? Has anyone here accessed the PM scholarship scheme?",
      responses: [
        {
          author: communityUsers[2],
          content: "Hariom Gupta, I'm truly sorry for your loss. The PM scholarship scheme is excellent - my children are benefiting from it. The application process is straightforward but time-sensitive. I'd be happy to guide you through it.",
          timestamp: "1 hour ago",
          helpful: 15
        },
        {
          author: communityUsers[4],
          content: "In addition to what Tushar Yadav mentioned, check with your local Zila Sainik Board. They helped us tremendously with both paperwork and connecting to schools that reserve seats for martyrs' children.",
          timestamp: "30 minutes ago",
          helpful: 12
        }
      ]
    },
    {
      id: "thread2",
      type: "Share an Experience",
      title: "How I navigated the pension application process",
      category: "Pension Help",
      region: "Maharashtra",
      author: communityUsers[1],
      replies: 8,
      lastActivity: "1 day ago",
      content: "I wanted to share my experience with applying for the family pension in Maharashtra. The process took about 3 months, but with some persistence, we were able to get it approved.",
      responses: [
        {
          author: communityUsers[4],
          content: "Thank you for sharing this detailed experience, Sneha Negi. Your timeline is very helpful for others going through the same process. We'll add this to our resources.",
          timestamp: "22 hours ago",
          helpful: 8
        }
      ]
    },
    {
      id: "thread3",
      type: "Ask a Question",
      title: "Mental health resources for young children",
      category: "Mental Health Support",
      region: "All India",
      author: communityUsers[3],
      replies: 15,
      lastActivity: "3 days ago",
      content: "My 8-year-old has been struggling since we lost his father. Are there any specialized counseling services available for children of martyrs?",
      responses: [
        {
          author: communityUsers[2],
          content: "The Armed Forces has a dedicated child psychology unit that offers free services. I'll send you the contact details privately, Mohammad Kaif.",
          timestamp: "3 days ago",
          helpful: 10
        },
        {
          author: communityUsers[0],
          content: "We found great help through the Children's Resilience Program. They have centers in most major cities and offer both individual and group therapy.",
          timestamp: "2 days ago",
          helpful: 7
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Community <span className="text-military">Space</span>
            </h1>
            <p className="text-white/70 mb-6">
              A private forum where verified martyr families can connect, share experiences, and support each other.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="military-card border-military/30">
                <CardHeader className="border-b border-[#2D3748] pb-4">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-military" />
                    🧑‍🤝‍🧑 Community Forum
                  </CardTitle>
                  <p className="text-white/70 text-sm mt-1">
                    A private space where verified martyr families can connect, share experiences, and support each other.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Access Verification Section */}
                  <div className="bg-[#1A1A1A]/60 border border-military/30 rounded-xl p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                          <Shield className="mr-2 text-military" />
                          Verified Access Only
                        </h3>
                        <p className="text-white/70">
                          This private forum is exclusively for verified martyr families. 
                          Your verification ensures a safe, supportive environment for all members.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <Button className="bg-military hover:bg-military-light">
                          Enter Forum
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Forum Preview Section */}
                  <div className="space-y-8">
                    {/* Post Options */}
                    <div className="flex gap-3 mb-6">
                      <Button variant="outline" className="border-military/50 text-military flex-1">
                        Ask a Question
                      </Button>
                      <Button variant="outline" className="border-military/50 text-military flex-1">
                        Share an Experience
                      </Button>
                    </div>
                    
                    {/* Sample Thread Cards with Accordion */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium mb-4">Recent Discussions</h3>
                      
                      <Accordion type="single" collapsible className="space-y-4">
                        {forumThreads.map((thread, index) => (
                          <AccordionItem key={index} value={`thread-${index}`} className="border-0">
                            <div className="bg-[#1A1A1A]/40 border border-[#2D3748] rounded-lg overflow-hidden">
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="mb-1">
                                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                                        thread.type === "Ask a Question" ? "bg-blue-900/30 text-blue-400" : "bg-amber-900/30 text-amber-400"
                                      }`}>
                                        {thread.type}
                                      </span>
                                      <span className="ml-2 text-white/50 text-xs">{thread.category} • {thread.region}</span>
                                    </div>
                                    <AccordionTrigger className="hover:no-underline p-0">
                                      <h4 className="font-semibold text-left">{thread.title}</h4>
                                    </AccordionTrigger>
                                  </div>
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarFallback className="bg-military/20 text-xs">{thread.author.avatar}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-white/60">{thread.author.name}</span>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center mt-3 text-xs text-white/60">
                                  <span>{thread.replies} replies</span>
                                  <span>Last activity {thread.lastActivity}</span>
                                </div>
                              </div>
                              
                              <AccordionContent className="border-t border-[#2D3748] mt-0 px-4 py-3 bg-[#1A1A1A]/60">
                                <div className="mb-4">
                                  <p className="text-white/80">{thread.content}</p>
                                </div>
                                
                                {thread.responses.length > 0 && (
                                  <div className="border-t border-[#2D3748] pt-4 mt-4 space-y-4">
                                    <h5 className="text-sm font-medium text-white/70">Responses:</h5>
                                    
                                    {thread.responses.map((response, rIndex) => (
                                      <div key={rIndex} className="bg-[#1A1A1A]/30 rounded-lg p-3">
                                        <div className="flex items-center mb-2">
                                          <Avatar className="h-6 w-6 mr-2">
                                            <AvatarFallback className="bg-military/20 text-xs">{response.author.avatar}</AvatarFallback>
                                          </Avatar>
                                          <div>
                                            <span className="text-sm">{response.author.name}</span>
                                            <span className="text-xs text-white/50 ml-2">{response.timestamp}</span>
                                          </div>
                                        </div>
                                        <p className="text-sm text-white/80 mb-2">{response.content}</p>
                                        <div className="flex items-center text-xs text-white/50">
                                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                            <ThumbsUp className="h-3 w-3 mr-1" />
                                            Helpful ({response.helpful})
                                          </Button>
                                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                            <Heart className="h-3 w-3 mr-1" />
                                            Support
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                    
                                    <Button variant="outline" size="sm" className="mt-2 text-xs border-military/30 text-military w-full">
                                      Reply to this thread
                                    </Button>
                                  </div>
                                )}
                              </AccordionContent>
                            </div>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      
                      <Button variant="outline" className="w-full mt-2 border-military/50 text-military hover:bg-military/10">
                        See More Discussions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              {/* Forum Users */}
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <User className="mr-2 text-military" />
                    Community Members
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-[#2D3748] last:border-0">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-military/20">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-white/60">{user.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                        Message
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Categories Preview */}
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 text-military" />
                    Forum Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Pension Help", count: 42 },
                    { name: "School Admission", count: 28 },
                    { name: "Mental Health Support", count: 35 },
                    { name: "Career Guidance", count: 30 },
                    { name: "Document Assistance", count: 25 },
                  ].map((category, index) => (
                    <div key={index} className="flex justify-between items-center px-3 py-2 bg-[#1A1A1A]/30 rounded">
                      <span>{category.name}</span>
                      <span className="text-white/50 text-sm">{category.count} threads</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Guidelines Card */}
              <Card className="bg-[#1A1A1A]/40 border-military/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Check className="mr-2 text-military" />
                    Community Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70 mb-3">
                    Our community is built on respect, empathy, and mutual support. Please adhere to these guidelines:
                  </p>
                  <ul className="text-sm text-white/70 space-y-2 list-disc pl-5">
                    <li>Respect everyone's privacy and dignity</li>
                    <li>Provide supportive, constructive responses</li>
                    <li>Keep discussions on-topic and relevant</li>
                    <li>Report any concerning content immediately</li>
                  </ul>
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

export default CommunitySpace; 