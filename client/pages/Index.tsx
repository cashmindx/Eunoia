import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Brain, Shield, BarChart3, Users, Zap, Heart, MessageCircle, Eye, TrendingUp, Star, Mic, HeadphonesIcon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Default to Spanish
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Supported languages for translation
  const supportedLanguages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' }
  ];

  // Timer effect for recording
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      alert('Unable to access microphone. Please allow microphone access and try again.');
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
    }
  };

  // Toggle recording function
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Speech recognition for transcription
  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    // In a real implementation, this would use Google Speech-to-Text API
    // For demo purposes, we'll simulate transcription
    return new Promise((resolve) => {
      setTimeout(() => {
        const demoTranscriptions = [
          "Hello, how are you doing today?",
          "Nice to meet you, I'm looking forward to our conversation.",
          "Can you help me understand this better?",
          "Thank you for your time and assistance.",
          "I hope you have a wonderful day."
        ];
        const randomTranscription = demoTranscriptions[Math.floor(Math.random() * demoTranscriptions.length)];
        resolve(randomTranscription);
      }, 1500);
    });
  };

  // AI Translation function
  const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    // In a real implementation, this would use Google Translate API or similar
    const translations: Record<string, Record<string, string>> = {
      'es': {
        "Hello, how are you doing today?": "Hola, ¿cómo estás hoy?",
        "Nice to meet you, I'm looking forward to our conversation.": "Mucho gusto en conocerte, espero con interés nuestra conversación.",
        "Can you help me understand this better?": "¿Puedes ayudarme a entender esto mejor?",
        "Thank you for your time and assistance.": "Gracias por tu tiempo y asistencia.",
        "I hope you have a wonderful day.": "Espero que tengas un día maravilloso."
      },
      'fr': {
        "Hello, how are you doing today?": "Bonjour, comment allez-vous aujourd'hui?",
        "Nice to meet you, I'm looking forward to our conversation.": "Ravi de vous rencontrer, j'ai hâte de notre conversation.",
        "Can you help me understand this better?": "Pouvez-vous m'aider à mieux comprendre cela?",
        "Thank you for your time and assistance.": "Merci pour votre temps et votre aide.",
        "I hope you have a wonderful day.": "J'espère que vous passerez une merveilleuse journée."
      },
      'de': {
        "Hello, how are you doing today?": "Hallo, wie geht es dir heute?",
        "Nice to meet you, I'm looking forward to our conversation.": "Schön dich kennenzulernen, ich freue mich auf unser Gespräch.",
        "Can you help me understand this better?": "Können Sie mir helfen, das besser zu verstehen?",
        "Thank you for your time and assistance.": "Vielen Dank für Ihre Zeit und Hilfe.",
        "I hope you have a wonderful day.": "Ich hoffe, Sie haben einen wundervollen Tag."
      }
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        const translation = translations[targetLanguage]?.[text] || `[${targetLanguage.toUpperCase()}] ${text}`;
        resolve(translation);
      }, 1000);
    });
  };

  // Generate human-like AI response
  const generateAiResponse = async (originalText: string, targetLanguage: string): Promise<string> => {
    // In a real implementation, this would use OpenAI GPT or similar
    const responses: Record<string, Record<string, string[]>> = {
      'es': {
        "Hello, how are you doing today?": [
          "¡Hola! Estoy muy bien, gracias por preguntar. Es un placer conocerte. ¿Cómo ha sido tu día?",
          "¡Qué gusto saludarte! Me siento excelente hoy. ¿Y tú, cómo te encuentras?",
          "¡Hola! Todo va de maravilla por aquí. Gracias por tu amable saludo. ¿Qué tal tu día?"
        ],
        "Nice to meet you, I'm looking forward to our conversation.": [
          "¡El placer es mío! También estoy emocionado de poder conversar contigo. ¿De qué te gustaría hablar?",
          "¡Igualmente! Me encanta conocer gente nueva. Estoy seguro de que tendremos una conversación muy interesante.",
          "¡Qué alegría conocerte! Yo también tengo muchas ganas de nuestra charla. ¿Hay algo específico que te interese?"
        ]
      },
      'fr': {
        "Hello, how are you doing today?": [
          "Bonjour ! Je vais très bien, merci de demander. C'est un plaisir de vous rencontrer. Comment s'est passée votre journée ?",
          "Salut ! Je me sens excellent aujourd'hui. Et vous, comment allez-vous ?",
          "Bonjour ! Tout va à merveille ici. Merci pour votre aimable salutation. Comment va votre journée ?"
        ]
      },
      'de': {
        "Hello, how are you doing today?": [
          "Hallo! Mir geht es sehr gut, danke der Nachfrage. Es ist eine Freude, Sie kennenzulernen. Wie war Ihr Tag?",
          "Hallo! Ich fühle mich heute ausgezeichnet. Und wie geht es Ihnen?",
          "Hallo! Hier läuft alles wunderbar. Danke für Ihre freundliche Begrüßung. Wie ist Ihr Tag verlaufen?"
        ]
      }
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        const responseOptions = responses[targetLanguage]?.[originalText];
        if (responseOptions) {
          const randomResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
          resolve(randomResponse);
        } else {
          resolve(`[${targetLanguage.toUpperCase()}] ¡Gracias por tu mensaje! Es un placer poder ayudarte hoy.`);
        }
      }, 2000);
    });
  };

  // Text-to-Speech function
  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set language for natural pronunciation
      const languageMap: Record<string, string> = {
        'es': 'es-ES',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'pt': 'pt-PT',
        'ru': 'ru-RU',
        'ja': 'ja-JP',
        'ko': 'ko-KR',
        'zh': 'zh-CN',
        'ar': 'ar-SA',
        'hi': 'hi-IN',
        'nl': 'nl-NL'
      };

      utterance.lang = languageMap[language] || 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser.');
    }
  };

  // Process recording with AI translation and response
  const processRecordingWithAI = async () => {
    if (!audioBlob) return;

    try {
      setIsTranslating(true);
      setRecognizedText('');
      setTranslatedText('');
      setAiResponse('');

      // Step 1: Transcribe audio to text
      const transcribed = await transcribeAudio(audioBlob);
      setRecognizedText(transcribed);

      // Step 2: Translate to target language
      const translated = await translateText(transcribed, selectedLanguage);
      setTranslatedText(translated);

      // Step 3: Generate AI response
      setIsGeneratingResponse(true);
      const response = await generateAiResponse(transcribed, selectedLanguage);
      setAiResponse(response);

      // Step 4: Speak the AI response
      speakText(response, selectedLanguage);

    } catch (error) {
      console.error('Error processing with AI:', error);
      alert('Error processing with AI. Please try again.');
    } finally {
      setIsTranslating(false);
      setIsGeneratingResponse(false);
    }
  };

  // Play recorded audio
  const playRecordedAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Error playing audio. Please try recording again.');
      });
    } else {
      alert('No recording available. Please record something first.');
    }
  };

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Record & Translate Conversations",
      description: "Record your conversations and get instant AI translation in any language you choose. Perfect for meetings, calls, and face-to-face chats."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Communication Style Matching",
      description: "Adjusts how you speak based on how others think and talk (like direct vs. indirect, or detail vs. big picture)."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Emotion Check",
      description: "Detects the emotional tone and suggests ways to respond better."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust Monitor",
      description: "Spots moments where trust might drop and gives tips to build it back up."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Conversation Simulator",
      description: "Practice important chats with AI characters and get cultural feedback."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Hierarchy Detector",
      description: "Understands who holds power in a group and how you should speak to them."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Bias Filter",
      description: "Warns you if your words might sound biased or offensive."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Conversation Summary",
      description: "Gives you a report on how the talk went and how to improve."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Export to Sheets",
      description: "Download your conversation history and insights as spreadsheets to track progress or share with your team."
    }
  ];

  const benefits = [
    "Spot Hidden Messages",
    "Build Real Trust",
    "Communicate Smarter",
    "Feel Confident",
    "Grow With Feedback",
    "Use It Anywhere"
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      period: "",
      description: "Travelers and learners",
      features: [
        "Voice Translation",
        "Phrasebook",
        "5 min/day calls, 20 messages/day",
        "Ads"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Connect",
      price: "$19.99",
      period: "/month",
      description: "Freelancers and small teams",
      features: [
        "Everything in Basic",
        "Unlimited insights",
        "Idiom translations",
        "No ads",
        "Priority support"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Synergy",
      price: "$49.99",
      period: "/month",
      description: "HR, consultants, travelers",
      features: [
        "Everything in Connect",
        "Unlimited simulations",
        "Persona tools",
        "Power structure helper",
        "2 debriefs/month"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Large companies and diplomacy",
      features: [
        "Everything in Synergy",
        "Full analytics & integrations",
        "Unlimited debriefs",
        "Team tools",
        "Custom modules"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Eunoia</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" onClick={() => alert('Sign In functionality coming soon!')}>Sign In</Button>
                <Button className="gradient-primary hover:opacity-90 transition-opacity" onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' })}>Get Started</Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <Link
                to="/contact"
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    alert('Sign In functionality coming soon!');
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full gradient-primary hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              The Global Empathy Nexus AI
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Speak Clearly.<br />
              <span className="gradient-text">Connect Deeply.</span><br />
              Understand Across Cultures.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Eunoia is a powerful AI partner that helps you communicate across different cultures with empathy and precision. It goes far beyond translation to help you connect with people in a real, meaningful way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg" onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' })}>
                <Zap className="w-5 h-5 mr-2" />
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg" onClick={() => alert('Demo video coming soon! For now, scroll down to see all features.')}>
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recording Feature Highlight */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
                  New Feature
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Record & Translate <span className="gradient-text">Any Conversation</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Record your conversations and get instant AI translation in any language you choose. Perfect for business meetings, phone calls, and face-to-face chats.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-primary" />
                    <span>One-tap recording for any conversation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>Instant translation to 100+ languages</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                    <span>Natural voice playback in target language</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Export conversation logs to spreadsheets</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className={`gradient-primary hover:opacity-90 transition-opacity ${isRecording ? 'animate-pulse' : ''}`}
                  onClick={toggleRecording}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  {isRecording ? `Recording... ${formatTime(recordingTime)}` : 'Try Recording Now'}
                </Button>
              </div>

              <div className="relative">
                <div className="glass-effect p-8 rounded-2xl border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                      <span className="text-sm font-medium">{isRecording ? 'Recording...' : audioBlob ? 'Recording Complete' : 'Ready to Record'}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{formatTime(recordingTime)}</div>
                  </div>

                  <div className="space-y-4">
                    {isRecording ? (
                      <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary animate-pulse">
                        <div className="text-sm text-muted-foreground mb-1">Listening...</div>
                        <div className="text-primary">🎙️ Speak now to record your voice</div>
                      </div>
                    ) : audioBlob ? (
                      <>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Your Recording</div>
                          <div>✅ Audio recorded successfully! ({formatTime(recordingTime)})</div>
                        </div>

                        <div className="bg-accent/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Ready for Translation</div>
                          <div>🌐 Click the buttons below to play or export your recording</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Demo Example (English)</div>
                          <div>"Hello, nice to meet you. How are you doing today?"</div>
                        </div>

                        <div className="bg-accent/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Translation (Spanish)</div>
                          <div>"Hola, mucho gusto en conocerte. ¿Cómo estás hoy?"</div>
                        </div>

                        <div className="bg-secondary/20 rounded-lg p-4">
                          <div className="text-sm text-primary font-medium mb-1">💡 Cultural Tip</div>
                          <div className="text-sm">Click "Try Recording Now" to test real voice recording!</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={playRecordedAudio}
                      disabled={!audioBlob}
                    >
                      <HeadphonesIcon className="w-4 h-4 mr-2" />
                      {audioBlob ? 'Play Audio' : 'No Audio'}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => alert('Export to spreadsheet feature coming soon!')}>
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Eunoia Can Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Eunoia helps you go beyond words to truly understand people. Record conversations, get instant translations, and learn how to communicate better across cultures.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect hover:glow-primary transition-all duration-300 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Use <span className="gradient-text">Eunoia</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Transform how you connect, communicate, and succeed with people from different cultures.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20 border border-border/50">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Pricing Plans</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-2xl scale-105' : ''} glass-effect border-border/50`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? 'gradient-primary' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => {
                      if (plan.name === "Basic") {
                        alert("Sign up for free! This will redirect to the registration page.");
                      } else if (plan.name === "Enterprise") {
                        alert("Contact our sales team at support@eunoia.ai for enterprise pricing.");
                      } else {
                        alert(`Start your free trial for ${plan.name} plan! This will redirect to the signup page with the ${plan.name} plan selected.`);
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Getting <span className="gradient-text">Started</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Start using Eunoia in just a few simple steps
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
                <p className="text-sm text-muted-foreground">Create your free account</p>
              </div>

              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Allow Microphone</h3>
                <p className="text-sm text-muted-foreground">Give permission to record</p>
              </div>

              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose Language</h3>
                <p className="text-sm text-muted-foreground">Pick your target language</p>
              </div>

              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Speaking</h3>
                <p className="text-sm text-muted-foreground">Press record and talk</p>
              </div>

              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">5</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Feedback</h3>
                <p className="text-sm text-muted-foreground">See live translations & tips</p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              How <span className="gradient-text">Eunoia Works</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Google Gemini AI</h4>
                <p className="text-muted-foreground">Smart language understanding and cultural knowledge</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Voice Recognition</h4>
                <p className="text-muted-foreground">Google Speech-to-Text for clear voice recording and translation</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <HeadphonesIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Voice Output</h4>
                <p className="text-muted-foreground">Google Text-to-Speech for natural-sounding translations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Connect Across Cultures?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join people who use Eunoia to have better conversations and build stronger relationships across cultures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg" onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' })}>
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg" onClick={() => alert('To schedule a demo, please contact us at support@eunoia.ai')}>
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-muted/30 border-t border-border/40 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">Eunoia</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The Global Empathy Nexus AI - Helping you communicate better across cultures with smart AI translation and cultural guidance.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Email:</strong> <a href="mailto:support@eunoia.ai" className="text-primary hover:underline">support@eunoia.ai</a>
                </p>
                <p className="text-sm">
                  <strong>Website:</strong> <a href="http://www.eunoia.ai" className="text-primary hover:underline">www.eunoia.ai</a>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-12 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Eunoia. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
