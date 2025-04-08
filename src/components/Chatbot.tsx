import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Mic, MicOff, Volume2, VolumeX, Heart, HeartPulse, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  emotionTag?: string; // Emotion tag for the message
}

// Emotion types that can be detected
type EmotionType = 'neutral' | 'happy' | 'sad' | 'anxious' | 'angry' | 'stressed' | 'hopeful';

// Basic keywords for emotion detection
const emotionKeywords: Record<EmotionType, string[]> = {
  neutral: [],
  happy: ['खुश', 'आनंदित', 'प्रसन्न', 'अच्छा', 'शानदार', 'बेहतरीन', 'हैप्पी', 'happy', 'good', 'great', 'wonderful', 'excellent', 'joy', 'joyful', '😊', '😄', '😃'],
  sad: ['दुखी', 'उदास', 'निराश', 'परेशान', 'बुरा', 'sad', 'unhappy', 'depressed', 'disappointed', 'upset', 'down', 'terrible', '😔', '😢', '😭'],
  anxious: ['चिंतित', 'घबराहट', 'भयभीत', 'डर', 'टेंशन', 'anxious', 'worried', 'nervous', 'scared', 'fear', 'tension', 'afraid', 'fearful', '😰', '😨'],
  angry: ['गुस्सा', 'नाराज', 'क्रोधित', 'irritated', 'angry', 'mad', 'frustrated', 'annoyed', 'furious', '😠', '😡'],
  stressed: ['तनाव', 'दबाव', 'थका हुआ', 'थकान', 'परेशान', 'stressed', 'pressure', 'overwhelmed', 'exhausted', 'tired', 'fatigued', '😩', '😫'],
  hopeful: ['आशावादी', 'आशा', 'उम्मीद', 'सकारात्मक', 'positive', 'hopeful', 'optimistic', 'looking forward', 'better future', '🙏', '✨']
};

// Responses for each emotional state
const emotionalResponses: Record<EmotionType, string[]> = {
  neutral: [
    "How are you feeling today?",
    "Would you like to share how you're feeling?"
  ],
  happy: [
    "I'm glad to hear you're feeling happy! Can you share what's making you feel good?",
    "Positive emotions are important. What else might help maintain your happiness?"
  ],
  sad: [
    "I'm sorry to hear you're feeling sad. Would you like to share what's troubling you?",
    "Sometimes expressing your feelings helps. Is there someone you could talk to about this?"
  ],
  anxious: [
    "Feeling anxious is normal. Can you tell me what's causing your anxiety?",
    "Deep breathing often helps reduce anxiety. Should we try some breathing exercises together?"
  ],
  angry: [
    "It's natural to feel angry sometimes. Can you tell me what's bothering you?",
    "Could we try to look at this situation from a different perspective?"
  ],
  stressed: [
    "Feeling stressed is very common. Can you tell me what's causing your stress?",
    "Taking a short break might help. Could you try to rest for a little while?"
  ],
  hopeful: [
    "Being hopeful is wonderful! What are you feeling optimistic about?",
    "Your positive outlook is inspiring. How do you maintain this feeling?"
  ]
};

export function Chatbot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);
  
  // Emotional state tracking
  const [userEmotionalState, setUserEmotionalState] = useState<EmotionType>('neutral');
  const [lastEmotionalCheckIn, setLastEmotionalCheckIn] = useState(Date.now());
  const [showingEmotionalResponse, setShowingEmotionalResponse] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Check if speech recognition and speech synthesis are supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Try to match language with current i18n language if possible
      const currentLang = i18n.language || 'en';
      try {
        recognitionRef.current.lang = currentLang;
      } catch (e) {
        console.warn("Could not set speech recognition language", e);
        recognitionRef.current.lang = 'en-US';
      }
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(() => handleSendMessage(transcript), 500);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    if (speechSynthesis) {
      setSpeechSynthesisSupported(true);
    }
  }, [i18n.language]);

  // Initialize messages when component mounts or language changes
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: t("chatbot.welcome_message", "नमस्ते! मैं आपकी कैसे सहायता कर सकता हूं?"),
        isUser: false,
      },
    ]);
    setShowOptions(true);
    
    // Schedule initial emotional check-in after a delay
    const timer = setTimeout(() => {
      performEmotionalCheckIn();
    }, 60000); // 1 minute after start
    
    return () => clearTimeout(timer);
  }, [t]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  // Detect emotions from text
  const detectEmotion = (text: string): EmotionType => {
    text = text.toLowerCase();
    
    // Check each emotion category for matching keywords
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword.toLowerCase())) {
          return emotion as EmotionType;
        }
      }
    }
    
    return 'neutral'; // Default if no emotion is detected
  };
  
  // Perform an emotional check-in with the user
  const performEmotionalCheckIn = () => {
    if (showingEmotionalResponse) return;
    
    const checkInMessage: Message = {
      id: crypto.randomUUID(),
      content: t("chatbot.emotional.check_in", "How are you feeling today? You can share your emotions with me."),
      isUser: false,
      emotionTag: 'check-in'
    };
    
    setMessages((prev) => [...prev, checkInMessage]);
    setLastEmotionalCheckIn(Date.now());
    setShowingEmotionalResponse(true);
    
    // Speak the check-in if speech synthesis is enabled
    if (isSpeaking && speechSynthesisSupported) {
      speakText(checkInMessage.content);
    }
  };
  
  // Respond to detected emotions
  const respondToEmotion = (emotion: EmotionType) => {
    if (emotion === 'neutral') return;
    
    const responses = emotionalResponses[emotion];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const emotionResponseMessage: Message = {
      id: crypto.randomUUID(),
      content: response,
      isUser: false,
      emotionTag: emotion
    };
    
    setMessages((prev) => [...prev, emotionResponseMessage]);
    setShowingEmotionalResponse(true);
    
    // Speak the response if speech synthesis is enabled
    if (isSpeaking && speechSynthesisSupported) {
      speakText(response);
    }
    
    // Reset the emotional response flag after a delay
    setTimeout(() => {
      setShowingEmotionalResponse(false);
    }, 10000);
  };

  const handleSendMessage = (text = input) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: text,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowOptions(false);
    
    // Detect emotion in the user's message
    const detectedEmotion = detectEmotion(text);
    if (detectedEmotion !== 'neutral') {
      setUserEmotionalState(detectedEmotion);
      
      // Respond to emotional content after a short delay
      setTimeout(() => {
        respondToEmotion(detectedEmotion);
      }, 1500);
    } else {
      // For neutral messages, check if we need to do an emotional check-in
      const timeSinceLastCheckIn = Date.now() - lastEmotionalCheckIn;
      if (timeSinceLastCheckIn > 300000 && !showingEmotionalResponse) { // 5 minutes
        setTimeout(() => {
          performEmotionalCheckIn();
        }, 2000);
      } else {
        // Normal bot response for neutral messages
        setTimeout(() => {
          const botResponse = t("chatbot.processing_message", "हम आपकी प्रश्न पर काम कर रहे हैं और जल्द ही आपको उत्तर देंगे।");
          
          const botMessage: Message = {
            id: crypto.randomUUID(),
            content: botResponse,
            isUser: false,
          };
          setMessages((prev) => [...prev, botMessage]);
          
          // Speak the response if speech synthesis is enabled
          if (isSpeaking && speechSynthesisSupported) {
            speakText(botResponse);
          }
        }, 1000);
      }
    }
  };

  const handleOptionClick = (option: keyof typeof optionMessages) => {
    const optionText = t(`chatbot.options.${option}`);
    handleSendMessage(optionText);
  };

  const toggleListening = () => {
    if (!speechSupported) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Error starting speech recognition", e);
      }
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    
    // If turning off, stop any current speech
    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakText = (text: string) => {
    if (!speechSynthesisSupported) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to match language with current i18n language if possible
    const currentLang = i18n.language || 'en';
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a voice that matches the current language
    const voice = voices.find(v => v.lang.startsWith(currentLang));
    if (voice) {
      utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  };
  
  // Get emotion icon based on emotional state
  const getEmotionIcon = (emotion: EmotionType) => {
    switch (emotion) {
      case 'happy':
        return <Heart className="h-4 w-4 text-green-400" />;
      case 'sad':
        return <Heart className="h-4 w-4 text-blue-400" />;
      case 'anxious':
        return <HeartPulse className="h-4 w-4 text-yellow-400" />;
      case 'angry':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'stressed':
        return <HeartPulse className="h-4 w-4 text-purple-400" />;
      case 'hopeful':
        return <Heart className="h-4 w-4 text-teal-400" />;
      default:
        return <Heart className="h-4 w-4 text-gray-400" />;
    }
  };

  const optionMessages = {
    resources: "resources",
    pension: "pension",
    volunteer: "volunteer",
    report: "report",
    contact: "contact",
    emotional_support: "emotional_support", // New option for emotional support
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-lg">
          <div className="flex items-center justify-between bg-primary text-primary-foreground p-3 rounded-t-lg">
            <div className="flex items-center">
              <h3 className="font-semibold">{t("chatbot.title", "सहायता बॉट")}</h3>
              {userEmotionalState !== 'neutral' && (
                <Badge variant="outline" className="ml-2 flex items-center gap-1">
                  {getEmotionIcon(userEmotionalState)}
                  <span className="capitalize">{userEmotionalState}</span>
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {speechSynthesisSupported && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSpeaking} 
                  title={isSpeaking ? t("chatbot.voice.mute", "Mute voice") : t("chatbot.voice.unmute", "Unmute voice")}
                  className="h-8 w-8 text-primary-foreground"
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-primary-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : message.emotionTag === 'check-in' 
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100" 
                          : "bg-muted"
                    )}
                  >
                    {message.content}
                    {message.emotionTag && !message.isUser && message.emotionTag !== 'check-in' && (
                      <div className="mt-1 flex items-center gap-1 text-xs opacity-70">
                        {getEmotionIcon(message.emotionTag as EmotionType)}
                        <span className="capitalize">Emotional Response</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {showOptions && (
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-2">{t("common.select", "Select an option:")}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(optionMessages).map((option) => (
                      <Button
                        key={option}
                        variant={option === 'emotional_support' ? 'default' : 'outline'}
                        size="sm"
                        className={cn(
                          "text-xs",
                          option === 'emotional_support' && "bg-blue-600 hover:bg-blue-700"
                        )}
                        onClick={() => {
                          if (option === 'emotional_support') {
                            performEmotionalCheckIn();
                          } else {
                            handleOptionClick(option as keyof typeof optionMessages);
                          }
                        }}
                      >
                        {option === 'emotional_support' ? (
                          <span className="flex items-center gap-1">
                            <HeartPulse className="h-3 w-3" />
                            Emotional Check-in
                          </span>
                        ) : (
                          t(`chatbot.options.${option}`)
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-3 border-t flex gap-2">
            <Input
              placeholder={t("chatbot.input_placeholder", "अपना संदेश यहां टाइप करें...")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            {speechSupported && (
              <Button 
                variant={isListening ? "destructive" : "outline"} 
                size="icon" 
                onClick={toggleListening}
                title={isListening ? t("chatbot.voice.stop_listening", "Stop listening") : t("chatbot.voice.start_listening", "Start listening")}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            )}
            <Button size="icon" onClick={() => handleSendMessage()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-military to-military-light relative"
        >
          <MessageCircle className="h-6 w-6" />
          {userEmotionalState !== 'neutral' && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center">
              {getEmotionIcon(userEmotionalState)}
            </span>
          )}
        </Button>
      )}
    </div>
  );
} 