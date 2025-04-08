import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LegacyWallCard from '../components/LegacyWallCard';
import MartyrDetailCard from '../components/MartyrDetailCard';
import { useTranslation } from 'react-i18next';

// Demo data for martyrs
const martyrsData = [
  {
    id: 1,
    name: 'Major Amit Kumar',
    rank: 'Major',
    unit: '9 Para (Special Forces)',
    dob: 'January 15, 1985',
    dod: 'November 9, 2022',
    age: 37,
    location: 'Kupwara, Jammu & Kashmir',
    photo: '/images/martyrs/placeholder.svg',
    story: 'Major Amit Kumar made the ultimate sacrifice while leading an anti-terror operation in Kupwara. He single-handedly neutralized two terrorists while protecting his team, displaying extraordinary courage and leadership.',
    decorations: ['Shaurya Chakra (Posthumous)', 'Sena Medal'],
    tributes: [
      { id: 1, author: 'Col. Rajesh Singh', message: 'A true hero and an inspiration to all of us. Your sacrifice will never be forgotten.', date: '2023-01-15' },
      { id: 2, author: 'Priya Sharma', message: "My brother was always the bravest person I knew. He lived for the nation and gave his all.", date: '2022-12-25', relation: 'Sister' },
      { id: 3, author: 'Lt. Vikram Mehta', message: 'Served with him in multiple operations. His courage was unmatched. Rest in glory, brother.', date: '2022-11-30' }
    ]
  },
  {
    id: 2,
    name: 'Captain Neha Sharma',
    rank: 'Captain',
    unit: 'Army Medical Corps',
    dob: 'March 21, 1990',
    dod: 'July 17, 2023',
    age: 33,
    location: 'Siachen Glacier',
    photo: '/images/martyrs/placeholder.svg',
    story: 'Captain Neha Sharma lost her life during a rescue mission at the Siachen Glacier, saving six soldiers trapped in an avalanche. Despite deteriorating weather conditions, she insisted on completing the medical evacuation.',
    decorations: ['Kirti Chakra (Posthumous)'],
    tributes: [
      { id: 1, author: 'Dr. Rajiv Khanna', message: "Neha was the most dedicated doctor I've ever worked with. Her patients always came first.", date: '2023-08-10' },
      { id: 2, author: 'Maj. Sunil Sharma', message: "My wife's courage saved many lives that day. Her sacrifice will continue to inspire many more.", date: '2023-07-30', relation: 'Husband' },
      { id: 3, author: 'Sgt. Ramesh Kumar', message: 'I am alive today because of Captain Sharma. She gave her life so that we could live.', date: '2023-08-05' }
    ]
  },
  {
    id: 3,
    name: 'Havildar Rajendra Singh',
    rank: 'Havildar',
    unit: '10 Rajputana Rifles',
    dob: 'October 5, 1982',
    dod: 'February 14, 2022',
    age: 39,
    location: 'Galwan Valley, Ladakh',
    photo: '/images/martyrs/placeholder.svg',
    story: 'Havildar Rajendra Singh displayed exceptional bravery during the border skirmish in Galwan Valley. Despite being heavily outnumbered, he protected his post until his last breath, ensuring the safety of his unit.',
    decorations: ['Vir Chakra (Posthumous)'],
    tributes: [
      { id: 1, author: 'Capt. Vikram Singh', message: 'The bravery shown by Havildar Rajendra will be taught in military schools for generations.', date: '2022-03-05' },
      { id: 2, author: 'Sunita Devi', message: 'My husband always said he would put the nation first. He lived and died by those words.', date: '2022-02-28', relation: 'Wife' },
      { id: 3, author: 'Rakesh Singh', message: 'Papa, you are my hero forever. I will follow in your footsteps and serve our motherland.', date: '2022-04-10', relation: 'Son' }
    ]
  },
  {
    id: 4,
    name: 'Colonel Santosh Babu',
    rank: 'Colonel',
    unit: '16 Bihar Regiment',
    dob: 'February 13, 1978',
    dod: 'June 15, 2020',
    age: 42,
    location: 'Galwan Valley, Ladakh',
    photo: '/images/martyrs/placeholder.svg',
    story: 'Colonel Santosh Babu, Commanding Officer of 16 Bihar Regiment, led from the front during the clash with Chinese troops in Galwan Valley. His extraordinary courage and leadership prevented Chinese encroachment, but he made the supreme sacrifice while defending India\'s territorial integrity.',
    decorations: ['Maha Vir Chakra (Posthumous)'],
    tributes: [
      { id: 1, author: 'Gen. M.M. Naravane', message: 'Colonel Santosh epitomized the finest qualities of a soldier and a leader. His actions in Galwan will inspire generations of soldiers.', date: '2020-07-01' },
      { id: 2, author: 'Santoshi Babu', message: 'My husband always said duty comes first. He lived and died by those principles. Our children will grow up knowing their father was a true hero.', date: '2020-06-25', relation: 'Wife' },
      { id: 3, author: 'Lt. Col. Anand Tiwari', message: 'I had the privilege of serving with Col. Santosh. His leadership skills and dedication to his men were unparalleled. You will be remembered, Sir.', date: '2020-06-30' }
    ]
  },
  {
    id: 5,
    name: 'Major Mukund Varadarajan',
    rank: 'Major',
    unit: '44 Rashtriya Rifles',
    dob: 'April 12, 1983',
    dod: 'April 25, 2014',
    age: 31,
    location: 'Shopian, Jammu & Kashmir',
    photo: '/images/martyrs/placeholder.svg',
    story: 'Major Mukund Varadarajan led a counter-terrorist operation in Shopian district where he eliminated three terrorists. During the fierce gunfight, he sustained gunshot wounds but continued fighting until his last breath, displaying exceptional courage and leadership.',
    decorations: ['Ashok Chakra (Posthumous)'],
    tributes: [
      { id: 1, author: 'Brig. K. S. Rao', message: 'Major Mukund\'s tactical brilliance and courage were extraordinary. He led his men with unflinching determination.', date: '2014-05-10' },
      { id: 2, author: 'Indhu Rebecca Varghese', message: 'My husband lived for the uniform and died with honor. His sacrifice gives me strength every day.', date: '2014-06-15', relation: 'Wife' },
      { id: 3, author: 'Capt. Arun Kumar', message: 'Sir, your leadership during operations was inspirational. You saved many lives through your sacrifice.', date: '2014-05-20' }
    ]
  },
  {
    id: 6,
    name: 'Major Mohit Sharma',
    rank: 'Major',
    unit: '1 Para (Special Forces)',
    dob: 'January 13, 1978',
    dod: 'March 21, 2009',
    age: 31,
    location: 'Kupwara, Jammu & Kashmir',
    photo: '/images/martyrs/placeholder.svg',
    story: 'Major Mohit Sharma, a Para Special Forces officer, infiltrated terrorist ranks using his undercover identity "Iftikhar Bhatt". In a daring operation in Kupwara, he eliminated four terrorists before making the supreme sacrifice, displaying unparalleled courage and commitment.',
    decorations: ['Ashok Chakra (Posthumous)'],
    tributes: [
      { id: 1, author: 'Gen. Deepak Kapoor', message: 'Major Mohit exemplified the highest traditions of the Special Forces. His undercover operations saved countless innocent lives.', date: '2009-05-20' },
      { id: 2, author: 'Rishu Sharma', message: 'My husband always believed that serving the nation was worth any sacrifice. His courage continues to inspire me every day.', date: '2009-04-15', relation: 'Wife' },
      { id: 3, author: 'Maj. Amit Deswal', message: 'Serving alongside Major Mohit was an honor. His tactical brilliance and leadership in the most dangerous operations were legendary.', date: '2009-06-10' }
    ]
  },
  {
    id: 7,
    name: 'Captain Manoj Kumar Pandey',
    rank: 'Captain',
    unit: '1/11 Gorkha Rifles',
    dob: 'June 25, 1975',
    dod: 'July 3, 1999',
    age: 24,
    location: 'Batalik Sector, Kargil',
    photo: '/images/martyrs/placeholder.svg',
    story: 'During the Kargil War, Captain Manoj Kumar Pandey led multiple successful attacks against enemy positions at high altitudes. During the assault on Jubar Top, despite being severely wounded, he continued to lead his men, clearing several enemy bunkers before making the supreme sacrifice. His battle cry "Na Chhodnu" (Don\'t Leave) continues to inspire the Indian Army.',
    decorations: ['Param Vir Chakra (Posthumous)'],
    tributes: [
      { id: 1, author: 'Gen. V.P. Malik', message: 'Captain Manoj\'s exceptional courage during the Kargil operations epitomizes the spirit of the Indian soldier. His sacrifice ensured victory at a critical juncture.', date: '2000-07-03' },
      { id: 2, author: 'Gopichand Pandey', message: 'My son always said he would either come back after raising the Indian flag in victory or return wrapped in it. He fulfilled his promise.', date: '1999-08-15', relation: 'Father' },
      { id: 3, author: 'Lt. Col. Y.K. Joshi', message: 'I witnessed Captain Manoj leading from the front in the face of enemy fire. His actions saved many lives and ensured the success of our mission.', date: '1999-12-10' }
    ]
  }
];

const LegacyWall = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMartyr, setSelectedMartyr] = useState<number | null>(null);
  const [tributeMessage, setTributeMessage] = useState('');
  const { t } = useTranslation();

  const handleTributeSubmit = (e: React.FormEvent, martyrId: number) => {
    e.preventDefault();
    if (tributeMessage.trim()) {
      toast({
        title: "Tribute Submitted",
        description: "Your message has been added to the legacy wall.",
      });
      setTributeMessage('');
    }
  };

  const martyr = selectedMartyr ? martyrsData.find(m => m.id === selectedMartyr) : null;

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-military">{t('legacy_wall.title')}</span>
            </h1>
            <p className="text-white/70">
              {t('legacy_wall.description')}
            </p>
          </div>

          {selectedMartyr ? (
            <div className="max-w-5xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedMartyr(null)}
                className="mb-6 border-military text-military hover:bg-military/10"
              >
                {t('legacy_wall.back_to_wall')}
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Martyr Profile */}
                <div className="lg:col-span-1">
                  {martyr && <MartyrDetailCard martyr={martyr} />}
                </div>

                {/* Story and Tributes */}
                <div className="lg:col-span-2">
                  <Tabs defaultValue="story" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-6">
                      <TabsTrigger value="story">{t('legacy_wall.story')}</TabsTrigger>
                      <TabsTrigger value="tributes">{t('legacy_wall.tributes')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="story">
                      <Card className="bg-[#1A1A1A] border-[#333333]">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-military" />
                            Story of Valor
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="leading-relaxed">{martyr?.story}</p>
                          
                          <div className="mt-8 bg-[#252525] rounded-lg p-6 border border-[#333333]">
                            <h3 className="text-lg font-semibold mb-4">Leave Your Tribute</h3>
                            <form onSubmit={(e) => handleTributeSubmit(e, martyr?.id || 0)}>
                              <textarea
                                value={tributeMessage}
                                onChange={(e) => setTributeMessage(e.target.value)}
                                placeholder="Share your message, memory, or tribute..."
                                className="w-full bg-[#1A1A1A]/70 border border-[#444444] rounded-md px-4 py-3 min-h-[120px] text-white focus:outline-none focus:ring-2 focus:ring-military resize-none"
                              />
                              <div className="flex justify-end mt-4">
                                <Button 
                                  type="submit"
                                  className="bg-military hover:bg-military-light text-white"
                                  disabled={!tributeMessage.trim()}
                                >
                                  Post Tribute
                                </Button>
                              </div>
                            </form>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="tributes">
                      <Card className="bg-[#1A1A1A] border-[#333333]">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-military" />
                            Tributes & Memories
                          </CardTitle>
                          <CardDescription>
                            {martyr?.tributes.length} messages of support and remembrance
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {martyr?.tributes.map(tribute => (
                              <div key={tribute.id} className="border-b border-[#333333] pb-5 last:border-0">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-10 w-10 border border-[#333333]">
                                    <AvatarFallback className="bg-military/20 text-military">
                                      {tribute.author.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-baseline gap-2">
                                      <h4 className="font-medium">{tribute.author}</h4>
                                      {tribute.relation && (
                                        <span className="text-xs bg-military/20 text-military px-2 py-0.5 rounded-full">
                                          {tribute.relation}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-white/50 mt-0.5">
                                      {new Date(tribute.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                    <p className="mt-2 text-white/90">{tribute.message}</p>
                                    <div className="flex items-center gap-4 mt-3">
                                      <button className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
                                        <Heart className="h-4 w-4" /> Like
                                      </button>
                                      <button className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
                                        <Share2 className="h-4 w-4" /> Share
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-8 bg-[#252525] rounded-lg p-6 border border-[#333333]">
                            <h3 className="text-lg font-semibold mb-4">Leave Your Tribute</h3>
                            <form onSubmit={(e) => handleTributeSubmit(e, martyr?.id || 0)}>
                              <textarea
                                value={tributeMessage}
                                onChange={(e) => setTributeMessage(e.target.value)}
                                placeholder="Share your message, memory, or tribute..."
                                className="w-full bg-[#1A1A1A]/70 border border-[#444444] rounded-md px-4 py-3 min-h-[120px] text-white focus:outline-none focus:ring-2 focus:ring-military resize-none"
                              />
                              <div className="flex justify-end mt-4">
                                <Button 
                                  type="submit"
                                  className="bg-military hover:bg-military-light text-white"
                                  disabled={!tributeMessage.trim()}
                                >
                                  Post Tribute
                                </Button>
                              </div>
                            </form>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto mb-10">
                <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                  <TabsTrigger value="all">All Heroes</TabsTrigger>
                  <TabsTrigger value="recent">Recently Added</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {martyrsData.map(martyr => (
                  <LegacyWallCard 
                    key={martyr.id} 
                    martyr={martyr} 
                    onClick={setSelectedMartyr} 
                  />
                ))}
              </div>
              
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Know a Martyr?</h3>
                <p className="text-white/70 mb-6">
                  Help us honor more heroes by submitting information about martyrs to be featured on our Digital Legacy Wall.
                </p>
                <Button className="bg-military hover:bg-military-light text-white">
                  Submit a Martyr Profile
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegacyWall; 