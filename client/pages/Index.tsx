import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Brain, Shield, BarChart3, Users, Zap, Heart, MessageCircle, Eye, TrendingUp, Star, Mic, HeadphonesIcon, Menu, X, Camera, Image, FileText, Coffee, Briefcase } from "lucide-react";
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
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [photoMode, setPhotoMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [translatedPhoto, setTranslatedPhoto] = useState('');
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [conversationMode, setConversationMode] = useState<'casual' | 'business' | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Supported languages for translation (100+ languages)
  const supportedLanguages = [
    // Major European Languages
    { code: 'es', name: 'Spanish', flag: '🇪🇸', region: 'Europe' },
    { code: 'fr', name: 'French', flag: '🇫🇷', region: 'Europe' },
    { code: 'de', name: 'German', flag: '🇩🇪', region: 'Europe' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', region: 'Europe' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', region: 'Europe' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', region: 'Europe' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', region: 'Europe' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱', region: 'Europe' },
    { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', region: 'Europe' },
    { code: 'cs', name: 'Czech', flag: '🇨🇿', region: 'Europe' },
    { code: 'sk', name: 'Slovak', flag: '🇸🇰', region: 'Europe' },
    { code: 'hu', name: 'Hungarian', flag: '🇭🇺', region: 'Europe' },
    { code: 'ro', name: 'Romanian', flag: '🇷🇴', region: 'Europe' },
    { code: 'bg', name: 'Bulgarian', flag: '🇧🇬', region: 'Europe' },
    { code: 'hr', name: 'Croatian', flag: '🇭🇷', region: 'Europe' },
    { code: 'sr', name: 'Serbian', flag: '🇷🇸', region: 'Europe' },
    { code: 'sl', name: 'Slovenian', flag: '🇸🇮', region: 'Europe' },
    { code: 'lt', name: 'Lithuanian', flag: '🇱🇹', region: 'Europe' },
    { code: 'lv', name: 'Latvian', flag: '🇱🇻', region: 'Europe' },
    { code: 'et', name: 'Estonian', flag: '🇪🇪', region: 'Europe' },
    { code: 'fi', name: 'Finnish', flag: '🇫🇮', region: 'Europe' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪', region: 'Europe' },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴', region: 'Europe' },
    { code: 'da', name: 'Danish', flag: '🇩🇰', region: 'Europe' },
    { code: 'is', name: 'Icelandic', flag: '🇮🇸', region: 'Europe' },
    { code: 'ga', name: 'Irish', flag: '🇮🇪', region: 'Europe' },
    { code: 'cy', name: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', region: 'Europe' },
    { code: 'mt', name: 'Maltese', flag: '🇲🇹', region: 'Europe' },
    { code: 'sq', name: 'Albanian', flag: '🇦🇱', region: 'Europe' },
    { code: 'mk', name: 'Macedonian', flag: '🇲🇰', region: 'Europe' },
    { code: 'bs', name: 'Bosnian', flag: '🇧🇦', region: 'Europe' },

    // Asian Languages
    { code: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳', region: 'Asia' },
    { code: 'zh-tw', name: 'Chinese (Traditional)', flag: '🇹🇼', region: 'Asia' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', region: 'Asia' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', region: 'Asia' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', region: 'Asia' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩', region: 'Asia' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰', region: 'Asia' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', region: 'Asia' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', region: 'Asia' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', region: 'Asia' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', region: 'Asia' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', region: 'Asia' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳', region: 'Asia' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳', region: 'Asia' },
    { code: 'ne', name: 'Nepali', flag: '🇳🇵', region: 'Asia' },
    { code: 'si', name: 'Sinhala', flag: '🇱🇰', region: 'Asia' },
    { code: 'my', name: 'Myanmar (Burmese)', flag: '🇲🇲', region: 'Asia' },
    { code: 'th', name: 'Thai', flag: '🇹🇭', region: 'Asia' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', region: 'Asia' },
    { code: 'lo', name: 'Lao', flag: '🇱🇦', region: 'Asia' },
    { code: 'km', name: 'Khmer', flag: '🇰🇭', region: 'Asia' },
    { code: 'ms', name: 'Malay', flag: '🇲🇾', region: 'Asia' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', region: 'Asia' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭', region: 'Asia' },
    { code: 'mn', name: 'Mongolian', flag: '🇲🇳', region: 'Asia' },
    { code: 'ka', name: 'Georgian', flag: '🇬🇪', region: 'Asia' },
    { code: 'hy', name: 'Armenian', flag: '🇦🇲', region: 'Asia' },
    { code: 'az', name: 'Azerbaijani', flag: '🇦🇿', region: 'Asia' },
    { code: 'kk', name: 'Kazakh', flag: '🇰🇿', region: 'Asia' },
    { code: 'ky', name: 'Kyrgyz', flag: '🇰🇬', region: 'Asia' },
    { code: 'uz', name: 'Uzbek', flag: '🇺🇿', region: 'Asia' },
    { code: 'tk', name: 'Turkmen', flag: '🇹🇲', region: 'Asia' },
    { code: 'tg', name: 'Tajik', flag: '🇹🇯', region: 'Asia' },

    // Middle Eastern Languages
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', region: 'Middle East' },
    { code: 'fa', name: 'Persian', flag: '🇮🇷', region: 'Middle East' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', region: 'Middle East' },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱', region: 'Middle East' },
    { code: 'ku', name: 'Kurdish', flag: '🏴', region: 'Middle East' },

    // African Languages
    { code: 'sw', name: 'Swahili', flag: '🇰🇪', region: 'Africa' },
    { code: 'am', name: 'Amharic', flag: '🇪🇹', region: 'Africa' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', region: 'Africa' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', region: 'Africa' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬', region: 'Africa' },
    { code: 'zu', name: 'Zulu', flag: '🇿🇦', region: 'Africa' },
    { code: 'xh', name: 'Xhosa', flag: '🇿🇦', region: 'Africa' },
    { code: 'st', name: 'Sotho', flag: '🇿🇦', region: 'Africa' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦', region: 'Africa' },
    { code: 'mg', name: 'Malagasy', flag: '🇲🇬', region: 'Africa' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼', region: 'Africa' },
    { code: 'so', name: 'Somali', flag: '🇸🇴', region: 'Africa' },

    // Americas Languages
    { code: 'en', name: 'English', flag: '🇺🇸', region: 'Americas' },
    { code: 'pt-br', name: 'Portuguese (Brazil)', flag: '🇧🇷', region: 'Americas' },
    { code: 'qu', name: 'Quechua', flag: '🇵🇪', region: 'Americas' },
    { code: 'gn', name: 'Guarani', flag: '🇵🇾', region: 'Americas' },

    // Pacific Languages
    { code: 'haw', name: 'Hawaiian', flag: '🇺🇸', region: 'Pacific' },
    { code: 'mi', name: 'Maori', flag: '🇳🇿', region: 'Pacific' },
    { code: 'fj', name: 'Fijian', flag: '🇫🇯', region: 'Pacific' },
    { code: 'to', name: 'Tongan', flag: '🇹🇴', region: 'Pacific' },
    { code: 'sm', name: 'Samoan', flag: '🇼🇸', region: 'Pacific' }
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
      },
      'en': {
        "Hello, how are you doing today?": "Hello, how are you doing today?",
        "Nice to meet you, I'm looking forward to our conversation.": "Nice to meet you, I'm looking forward to our conversation.",
        "Can you help me understand this better?": "Can you help me understand this better?",
        "Thank you for your time and assistance.": "Thank you for your time and assistance.",
        "I hope you have a wonderful day.": "I hope you have a wonderful day."
      },
      'af': {
        "Hello, how are you doing today?": "Hallo, hoe gaan dit vandag met jou?",
        "Nice to meet you, I'm looking forward to our conversation.": "Aangename kennis, ek sien uit na ons gesprek.",
        "Can you help me understand this better?": "Kan jy my help om dit beter te verstaan?",
        "Thank you for your time and assistance.": "Dankie vir jou tyd en hulp.",
        "I hope you have a wonderful day.": "Ek hoop jy het 'n wonderlike dag."
      },
      'zu': {
        "Hello, how are you doing today?": "Sawubona, unjani namuhla?",
        "Nice to meet you, I'm looking forward to our conversation.": "Kuyajabulisa ukukubona, ngibheke phambili enkulumweni yethu.",
        "Can you help me understand this better?": "Ungangisiza ukuthi ngiqonde kangcono?",
        "Thank you for your time and assistance.": "Ngiyabonga ngesikhathi sakho nosizo.",
        "I hope you have a wonderful day.": "Ngifisa ukuthi ube nosuku olumnandi."
      },
      'xh': {
        "Hello, how are you doing today?": "Molo, unjani namhlanje?",
        "Nice to meet you, I'm looking forward to our conversation.": "Kuyonwaba ukudibana nawe, ndijonge phambili kwincoko yethu.",
        "Can you help me understand this better?": "Ungandinceda ukuba ndiqonde ngcono?",
        "Thank you for your time and assistance.": "Enkosi ngexesha lakho noncedo.",
        "I hope you have a wonderful day.": "Ndiyathemba ukuba uya kuba nemini entle."
      },
      'st': {
        "Hello, how are you doing today?": "Dumela, o phela jwang kajeno?",
        "Nice to meet you, I'm looking forward to our conversation.": "Ho thabo ho kopana le wena, ke lebelletse puisano ya rona.",
        "Can you help me understand this better?": "O ka nthusa hore ke utlwisise botjhaba?",
        "Thank you for your time and assistance.": "Ke leboga nako ya hao le thuso.",
        "I hope you have a wonderful day.": "Ke solofela hore o tla ba le letsatsi le monate."
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
        ]
      },
      'fr': {
        "Hello, how are you doing today?": [
          "Bonjour ! Je vais très bien, merci de demander. C'est un plaisir de vous rencontrer. Comment s'est passée votre journée ?",
          "Salut ! Je me sens excellent aujourd'hui. Et vous, comment allez-vous ?",
          "Bonjour ! Tout va �� merveille ici. Merci pour votre aimable salutation. Comment va votre journée ?"
        ]
      },
      'de': {
        "Hello, how are you doing today?": [
          "Hallo! Mir geht es sehr gut, danke der Nachfrage. Es ist eine Freude, Sie kennenzulernen. Wie war Ihr Tag?",
          "Hallo! Ich fühle mich heute ausgezeichnet. Und wie geht es Ihnen?",
          "Hallo! Hier läuft alles wunderbar. Danke für Ihre freundliche Begrüßung. Wie ist Ihr Tag verlaufen?"
        ]
      },
      'zh': {
        "Hello, how are you doing today?": [
          "你好！我今天很好，谢谢你的问候。很高兴认识你。你今天过得怎么样？",
          "你好！我感觉很棒。你呢，你好吗？",
          "你好！我这里一切都很好。谢谢你友好的问候。你今天怎么样？"
        ]
      },
      'ja': {
        "Hello, how are you doing today?": [
          "こんにちは！今日は元気です、お聞きいただきありがとうございます。お会いできて嬉しいです。今日はいかがでしたか？",
          "こんにちは！今日は素晴らしい気分です。あなたはいかがですか？",
          "こんにちは！こちらはすべて順調です。親切なご挨拶をありがとうございます。今日はどうでしたか？"
        ]
      },
      'ar': {
        "Hello, how are you doing today?": [
          "مرحبا! أنا بخير جداً، شكراً لسؤالك. من دواعي سروري أن ألتقي بك. كيف كان يومك؟",
          "أهلا! أشعر بحالة ممتازة اليوم. وأنت، كيف حالك؟",
          "مرحبا! كل شيء يسير بشكل رائع هنا. شكراً لتحيتك اللطيفة. كيف كان يومك؟"
        ]
      },
      'ko': {
        "Hello, how are you doing today?": [
          "안녕하세요! 오늘 정말 좋아요, 물어봐 주셔서 감사합니다. 만나서 반가워요. 오늘 어떠셨어요?",
          "안녕하세요! 오늘 기분이 아주 좋아요. 당신은 어떠세요?",
          "안녕하세요! 여기 모든 것이 훌륭해요. 친절한 인사 감사해요. 오늘 어땠어요?"
        ]
      },
      'pt': {
        "Hello, how are you doing today?": [
          "Olá! Estou muito bem, obrigado por perguntar. É um prazer conhecê-lo. Como foi o seu dia?",
          "Oi! Estou me sentindo excelente hoje. E você, como está?",
          "Olá! Tudo está indo maravilhosamente aqui. Obrigado pela saudação amável. Como está o seu dia?"
        ]
      },
      'it': {
        "Hello, how are you doing today?": [
          "Ciao! Sto molto bene, grazie per aver chiesto. È un piacere conoscerti. Com'è stata la tua giornata?",
          "Ciao! Mi sento eccellente oggi. E tu, come stai?",
          "Ciao! Tutto va meravigliosamente qui. Grazie per il gentile saluto. Com'è la tua giornata?"
        ]
      },
      'ru': {
        "Hello, how are you doing today?": [
          "Привет! У меня всё очень хорошо, спасибо что спросили. Приятно познакомиться. Как прошёл ваш день?",
          "Привет! Я сегодня прекрасно себя чувствую. А как дела у вас?",
          "Привет! Здесь всё замечательно. Спасибо за доброе приветствие. Как ваш день?"
        ]
      },
      'hi': {
        "Hello, how are you doing today?": [
          "नमस्ते! मैं आज बहुत अच्छा हूँ, पूछने के लिए धन्यवाद। आपसे मिलकर खुशी हुई। आपका दिन कैसा रहा?",
          "हैलो! मैं आज बेहतरीन महसूस कर रहा हूँ। और आप कैसे हैं?",
          "नमस्ते! यहाँ सब कुछ बहुत अच्छा चल रहा है। आपके मिलनसार अभिवादन के लिए धन्यवाद। आपका दिन कैसा रहा?"
        ]
      },
      'th': {
        "Hello, how are you doing today?": [
          "สวัสดีครับ! วันนี้ผมสบายดีมากครับ ขอบคุณที่ถาม ยินดีที่ได้รู้จักครับ วันนี้เป็นอย่างไรบ้างครับ?",
          "สวัสดี! วันนี้รู้สึกดีมากเลยครับ แล้วคุณล่ะครับ เป็นอย่างไรบ้าง?",
          "สวัสดีครับ! ที่นี่ทุกอย่างเป็นไปด้วยดีมากครับ ขอบคุณสำหรับคำทักทายที่น่ารักครับ วันนี้เป็นอย่างไรบ้างครับ?"
        ]
      },
      'vi': {
        "Hello, how are you doing today?": [
          "Xin chào! Hôm nay tôi rất khỏe, cảm ơn bạn đã hỏi. Rất vui được gặp bạn. Ngày hôm nay của bạn thế nào?",
          "Chào bạn! Hôm nay tôi cảm thấy tuyệt vời. Còn bạn thì sao?",
          "Xin chào! Mọi thứ ở đây đều tuyệt vời. Cảm ơn lời chào thân thiện của bạn. Ngày của bạn như thế nào?"
        ]
      },
      'en': {
        "Hello, how are you doing today?": [
          "Hello! I'm doing great today, thanks for asking. It's wonderful to meet you. How has your day been going?",
          "Hi there! I'm feeling excellent today. How about you, how are you doing?",
          "Hello! Everything is going wonderfully here. Thank you for the friendly greeting. How's your day been?"
        ],
        "Nice to meet you, I'm looking forward to our conversation.": [
          "It's my pleasure! I'm also excited to have this conversation with you. What would you like to talk about?",
          "Likewise! I love meeting new people. I'm sure we'll have a very interesting conversation.",
          "How wonderful to meet you! I'm also looking forward to our chat. Is there anything specific you'd like to discuss?"
        ],
        "Can you help me understand this better?": [
          "Of course! I'd be happy to help you understand better. What specifically would you like me to explain?",
          "Absolutely! I'm here to help. Please let me know what you'd like clarification on.",
          "Certainly! I'll do my best to help you understand. What part would you like me to elaborate on?"
        ]
      },
      'af': {
        "Hello, how are you doing today?": [
          "Hallo! Ek gaan vandag baie goed, dankie dat jy vra. Dis wonderlik om jou te ontmoet. Hoe gaan dit met jou dag?",
          "Hallo daar! Ek voel uitstekend vandag. En jy, hoe gaan dit met jou?",
          "Hallo! Alles gaan wonderlik hier. Dankie vir die vriendelike groet. Hoe was jou dag?"
        ],
        "Nice to meet you, I'm looking forward to our conversation.": [
          "Dis my plesier! Ek is ook opgewonde om hierdie gesprek met jou te hê. Waaroor wil jy gesels?",
          "Insgelyks! Ek hou daarvan om nuwe mense te ontmoet. Ek weet ons gaan 'n baie interessante gesprek hê.",
          "Hoe wonderlik om jou te ontmoet! Ek sien ook uit na ons geselsie. Is daar iets spesifieks waaroor jy wil praat?"
        ],
        "Can you help me understand this better?": [
          "Natuurlik! Ek sal graag wil help dat jy dit beter verstaan. Wat spesifiek wil jy hê moet ek verduidelik?",
          "Absoluut! Ek is hier om te help. Laat weet my asseblief waaroor jy verduideliking wil hê.",
          "Beslis! Ek sal my beste probeer om jou te help verstaan. Watter deel wil jy hê moet ek uitbrei?"
        ]
      },
      'zu': {
        "Hello, how are you doing today?": [
          "Sawubona! Ngikhona kahle namuhla, ngiyabonga ukubuza. Kuyajabulisa ukukubona. Usuku lwakho lunjani?",
          "Yebo sawubona! Ngizizwa ngcono kakhulu namuhla. Wena-ke, unjani?",
          "Sawubona! Konke kuhamba kahle lapha. Ngiyabonga ngokubingelela okuhle. Usuku lwakho lunjani?"
        ],
        "Nice to meet you, I'm looking forward to our conversation.": [
          "Kuyajabulisa! Nami ngijabulela ukuxoxa nawe. Yini ongathanda ukuxoxa ngayo?",
          "Nami njalo! Ngiyakuthanda ukuhlangana nabantu abasha. Ngazi ukuthi sizoba nenkulumo emnandi.",
          "Kuyamangalisa ukukubona! Nami ngibheke phambili enkulumweni yethu. Kungabe kukhona okuqondile ongathanda ukukhuluma ngakho?"
        ],
        "Can you help me understand this better?": [
          "Yebo! Ngiyajabula ukusiza ukuthi uqonde kangcono. Yini eqondile ongifuna ngikhulume ngayo?",
          "Nqayizivele! Ngilapha ukusiza. Ngicela ungazise ukuthi yini ofuna ukucaciswa ngayo.",
          "Impela! Ngizozama konke okusemandleni ami ukukusiza uqonde. Yiluphi uhlangothi ongifuna ngiluqhubeke?"
        ]
      },
      'xh': {
        "Hello, how are you doing today?": [
          "Molo! Ndiphilile kakuhle namhlanje, enkosi ngokubuza. Kuyonwaba ukudibana nawe. Injani imini yakho?",
          "Ewe molo! Ndiziva kakuhle kakhulu namhlanje. Wena ke, unjani?",
          "Molo! Konke kuhamba kakuhle apha. Enkosi ngentetho enobubele. Injani imini yakho?"
        ],
        "Nice to meet you, I'm looking forward to our conversation.": [
          "Luvuyo lwam! Nam ndiyonwaba ukuncokola nawe. Yintoni ongathanda ukuncokola ngayo?",
          "Nam kwanjalo! Ndiyakuthanda ukudibana nabantu abatsha. Ndazi ukuba siyakuba nencoko emnandi.",
          "Kuyamangalisa ukudibana nawe! Nam ndijonge phambili kwincoko yethu. Ngaba ikho into ethile ongathanda ukuthetha ngayo?"
        ],
        "Can you help me understand this better?": [
          "Ewe! Ndiyavuya ukunceda ukuba uqonde ngcono. Yintoni ekhethekileyo ongafuna ndikuchazele?",
          "Ngokuqinisekileyo! Ndilapha ukunceda. Nceda undazise ukuba yintoni ofuna ukucaciswa ngayo.",
          "Ngokuqinisekileyo! Ndiza kuzama konke okusemandleni am ukukunceda uqonde. Leliphi icandelo ongafuna ndiqhubeke nalo?"
        ]
      },
      'st': {
        "Hello, how are you doing today?": [
          "Dumela! Ke phela hantle kajeno, ke leboga ho botsa. Ho thabo ho kopana le wena. O phela jwang kajeno?",
          "Ee dumela! Ke ikutlwa ke phela hantle haholo kajeno. Wena o jwang?",
          "Dumela! Tsohle di tsamaya hantle mona. Ke leboga ho dumedisa ka thabo. O ile wa phela jwang kajeno?"
        ],
        "Nice to meet you, I'm looking forward to our conversation.": [
          "Ke thabo ya ka! Le nna ke thabetse ho bua le wena. Ke eng seo o ka ratang ho bua ka sona?",
          "Le nna hape! Ke rata ho kopana le batho ba bacha. Ke tseba hore re tla ba le puisano e monate.",
          "Ho makatsang ho kopana le wena! Le nna ke lebelletse puisano ya rona. Na ho na le ntho e itseng eo o ka ratang ho bua ka yona?"
        ],
        "Can you help me understand this better?": [
          "Ee! Ke thabela ho o thusa hore o utlwisise botjhaba. Ke eng se itseng seo o batlang ke o hlalosetseng?",
          "Ka sebele! Ke mona ho o thusa. Ka kopo ntsebise hore na ke eng seo o batlang ho hlalosetswa ka sona.",
          "Ka sebele! Ke tla leka sohle se ka matla a ka ho o thusa ho utlwisisa. Ke karolo efe eo o batlang ke tswele pele ka yona?"
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
        // European Languages
        'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE', 'it': 'it-IT', 'pt': 'pt-PT',
        'ru': 'ru-RU', 'nl': 'nl-NL', 'pl': 'pl-PL', 'uk': 'uk-UA', 'cs': 'cs-CZ',
        'sk': 'sk-SK', 'hu': 'hu-HU', 'ro': 'ro-RO', 'bg': 'bg-BG', 'hr': 'hr-HR',
        'sr': 'sr-RS', 'sl': 'sl-SI', 'lt': 'lt-LT', 'lv': 'lv-LV', 'et': 'et-EE',
        'fi': 'fi-FI', 'sv': 'sv-SE', 'no': 'no-NO', 'da': 'da-DK', 'is': 'is-IS',
        'ga': 'ga-IE', 'cy': 'cy-GB', 'mt': 'mt-MT', 'sq': 'sq-AL', 'mk': 'mk-MK',
        'bs': 'bs-BA',

        // Asian Languages
        'zh': 'zh-CN', 'zh-tw': 'zh-TW', 'ja': 'ja-JP', 'ko': 'ko-KR', 'hi': 'hi-IN',
        'bn': 'bn-BD', 'ur': 'ur-PK', 'ta': 'ta-IN', 'te': 'te-IN', 'mr': 'mr-IN',
        'gu': 'gu-IN', 'kn': 'kn-IN', 'ml': 'ml-IN', 'pa': 'pa-IN', 'ne': 'ne-NP',
        'si': 'si-LK', 'my': 'my-MM', 'th': 'th-TH', 'vi': 'vi-VN', 'lo': 'lo-LA',
        'km': 'km-KH', 'ms': 'ms-MY', 'id': 'id-ID', 'tl': 'tl-PH', 'mn': 'mn-MN',
        'ka': 'ka-GE', 'hy': 'hy-AM', 'az': 'az-AZ', 'kk': 'kk-KZ', 'ky': 'ky-KG',
        'uz': 'uz-UZ', 'tk': 'tk-TM', 'tg': 'tg-TJ',

        // Middle Eastern Languages
        'ar': 'ar-SA', 'fa': 'fa-IR', 'tr': 'tr-TR', 'he': 'he-IL', 'ku': 'ku-TR',

        // African Languages
        'sw': 'sw-KE', 'am': 'am-ET', 'ha': 'ha-NG', 'yo': 'yo-NG', 'ig': 'ig-NG',
        'zu': 'zu-ZA', 'xh': 'xh-ZA', 'st': 'st-ZA', 'af': 'af-ZA', 'mg': 'mg-MG', 'rw': 'rw-RW',
        'so': 'so-SO',

        // Americas Languages
        'en': 'en-US', 'pt-br': 'pt-BR', 'qu': 'qu-PE', 'gn': 'gn-PY',

        // Pacific Languages
        'haw': 'haw-US', 'mi': 'mi-NZ', 'fj': 'fj-FJ', 'to': 'to-TO', 'sm': 'sm-WS'
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

  // Camera and Photo Functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera if available
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setPhotoMode(true);
      }
    } catch (error) {
      alert('Unable to access camera. Please allow camera access and try again.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setPhotoMode(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
        processImageWithOCR(imageData);
      }
    }
  };

  // Simulated OCR processing (in real app, would use Google Vision API)
  const processImageWithOCR = async (imageData: string) => {
    setIsProcessingPhoto(true);
    setExtractedText('');
    setTranslatedPhoto('');

    try {
      // Simulate OCR text extraction
      await new Promise(resolve => setTimeout(resolve, 2000));

      const simulatedOCRTexts = {
        'casual': [
          "Welcome to Café Luna\nToday's Special: Cappuccino ��3.50\nEspresso €2.00\nCroissant €2.50\nOpen 7AM - 9PM",
          "Menu\nPasta Carbonara €12\nMargherita Pizza €10\nCaesar Salad €8\nTiramisu €5",
          "Bus Schedule\nNext bus: 15 minutes\nDestination: City Center\nPlatform 3"
        ],
        'business': [
          "Invoice #INV-2024-001\nAmount Due: $1,250.00\nDue Date: March 15, 2024\nPayment Terms: Net 30",
          "Meeting Room A\nBooked: 2:00 PM - 4:00 PM\nPresentation: Q4 Results\nContact: extension 1234",
          "Contract Agreement\nParties: Company A & Company B\nEffective Date: January 1, 2024\nTerms: 12 months"
        ]
      };

      const textPool = conversationMode ? simulatedOCRTexts[conversationMode] : simulatedOCRTexts['casual'];
      const extractedText = textPool[Math.floor(Math.random() * textPool.length)];
      setExtractedText(extractedText);

      // Translate the extracted text
      await new Promise(resolve => setTimeout(resolve, 1500));
      const translated = await translateText(extractedText, selectedLanguage);
      setTranslatedPhoto(translated);

    } catch (error) {
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  // Upload image from device
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        processImageWithOCR(imageData);
      };
      reader.readAsDataURL(file);
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
      icon: <Camera className="w-6 h-6" />,
      title: "Photo Translation",
      description: "Take photos of menus, signs, documents, and get instant AI translation with OCR technology."
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
      description: "Very limited trial",
      features: [
        "Voice Translation",
        "Basic Phrasebook",
        "5 min/day calls ONLY",
        "2 messages total, then upgrade required",
        "Ads"
      ],
      cta: "Try Free (Limited)",
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
                The Global Empathy Nexus AI
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Speak Clearly.<br />
                <span className="gradient-text">Connect Deeply.</span><br />
                Understand Across Cultures.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Eunoia is a powerful AI partner that helps you communicate across different cultures with empathy and precision. It goes far beyond translation to help you connect with people in a real, meaningful way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg" onClick={() => window.scrollTo({ top: document.getElementById('pricing')?.offsetTop || 0, behavior: 'smooth' })}>
                  <Zap className="w-5 h-5 mr-2" />
                  Start Your Free Trial
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg" onClick={() => alert('Demo video coming soon! For now, scroll down to see all features.')}>
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F1a417d5c5eed4762904e3cc9f8fc6248%2Fb2d66fc782ca4f8fba1f35e5a632a2cf?format=webp&width=800"
                  alt="Business professionals having a cross-cultural conversation"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>

                {/* Floating UI Elements */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Real-time Translation</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                  <div className="text-white text-sm">
                    <div className="font-medium">🇺🇸 → 🇿🇦</div>
                    <div className="text-xs opacity-80">English to Zulu</div>
                  </div>
                </div>
              </div>
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
                  Record, Photo & Translate <span className="gradient-text">Everything</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Your complete AI translation companion for voice conversations, written text, and visual content. Perfect for business meetings, café visits, travel, and daily interactions.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-5 h-5 text-primary" />
                    <span>One-tap voice recording and translation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-primary" />
                    <span>Photo translation for menus, signs, documents</span>
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
                    <Coffee className="w-5 h-5 text-primary" />
                    <span>Casual café conversations & business meetings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Export conversation logs to spreadsheets</span>
                  </div>
                </div>

                {/* Language Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">🌐 Select Response Language:</label>

                  {/* Popular Languages (Quick Select) */}
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Popular Languages:</div>
                    <div className="grid grid-cols-4 gap-2">
                      {supportedLanguages.filter(lang =>
                        ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ar', 'af', 'zu', 'xh', 'st'].includes(lang.code)
                      ).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setSelectedLanguage(lang.code)}
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            selectedLanguage === lang.code
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <div className="text-xs">{lang.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* More Languages Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllLanguages(!showAllLanguages)}
                    className="w-full mb-4"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {showAllLanguages ? 'Hide' : 'Show All'} Languages ({supportedLanguages.length}+)
                  </Button>

                  {/* All Languages Selector */}
                  {showAllLanguages && (
                    <div className="border rounded-lg p-4 bg-muted/20 max-h-80 overflow-y-auto">
                      {/* Search and Filter */}
                      <div className="mb-4 space-y-3">
                        <input
                          type="text"
                          placeholder="Search languages..."
                          value={languageSearch}
                          onChange={(e) => setLanguageSearch(e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
                        />

                        <div className="flex flex-wrap gap-2">
                          {['all', 'Europe', 'Asia', 'Middle East', 'Africa', 'Americas', 'Pacific'].map((region) => (
                            <button
                              key={region}
                              onClick={() => setSelectedRegion(region)}
                              className={`px-3 py-1 text-xs rounded-full transition-all ${
                                selectedRegion === region
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {region === 'all' ? 'All Regions' : region}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filtered Languages Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {supportedLanguages
                          .filter(lang => {
                            const matchesSearch = lang.name.toLowerCase().includes(languageSearch.toLowerCase());
                            const matchesRegion = selectedRegion === 'all' || lang.region === selectedRegion;
                            return matchesSearch && matchesRegion;
                          })
                          .map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setSelectedLanguage(lang.code);
                                setShowAllLanguages(false);
                              }}
                              className={`p-3 rounded-lg border text-sm transition-all text-left ${
                                selectedLanguage === lang.code
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{lang.flag}</span>
                                <div>
                                  <div className="text-xs font-medium">{lang.name}</div>
                                  <div className="text-xs text-muted-foreground">{lang.region}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>

                      {supportedLanguages.filter(lang => {
                        const matchesSearch = lang.name.toLowerCase().includes(languageSearch.toLowerCase());
                        const matchesRegion = selectedRegion === 'all' || lang.region === selectedRegion;
                        return matchesSearch && matchesRegion;
                      }).length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No languages found matching your criteria.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selected Language Display */}
                  <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{supportedLanguages.find(l => l.code === selectedLanguage)?.flag}</span>
                      <div>
                        <div className="text-sm font-medium">Selected: {supportedLanguages.find(l => l.code === selectedLanguage)?.name}</div>
                        <div className="text-xs text-muted-foreground">AI will respond in this language</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversation Mode Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">💬 Select Conversation Type:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setConversationMode('casual')}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        conversationMode === 'casual'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Coffee className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-medium">Casual</div>
                      <div className="text-xs text-muted-foreground">Café, Travel, Social</div>
                    </button>

                    <button
                      onClick={() => setConversationMode('business')}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        conversationMode === 'business'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Briefcase className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-medium">Business</div>
                      <div className="text-xs text-muted-foreground">Meetings, Contracts, Formal</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className={`w-full gradient-primary hover:opacity-90 transition-opacity ${isRecording ? 'animate-pulse' : ''}`}
                    onClick={toggleRecording}
                    disabled={isTranslating || isGeneratingResponse}
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    {isRecording ? `Recording... ${formatTime(recordingTime)}` : 'Try Recording Now'}
                  </Button>

                  {audioBlob && !isRecording && (
                    <Button
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 transition-opacity"
                      onClick={processRecordingWithAI}
                      disabled={isTranslating || isGeneratingResponse}
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      {isTranslating ? 'Processing with AI...' : isGeneratingResponse ? 'Generating Response...' : 'Translate & Get AI Response'}
                    </Button>
                  )}
                </div>

                {/* Photo Translation Section */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    📷 Photo Translation
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Translate menus, signs, documents, and any printed text instantly
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button
                      variant="outline"
                      onClick={startCamera}
                      disabled={photoMode || isProcessingPhoto}
                      className="h-12"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>

                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="w-full h-12"
                        disabled={isProcessingPhoto}
                        asChild
                      >
                        <span>
                          <Image className="w-4 h-4 mr-2" />
                          Upload Image
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Camera View */}
                  {photoMode && (
                    <div className="relative mb-4">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg bg-black"
                        style={{ maxHeight: '300px' }}
                      />
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        <Button
                          onClick={capturePhoto}
                          className="gradient-primary"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Capture
                        </Button>
                        <Button
                          variant="outline"
                          onClick={stopCamera}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <canvas ref={canvasRef} className="hidden" />
                </div>
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
                    {capturedImage && (
                      <div className="bg-blue-500/10 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="text-sm text-muted-foreground mb-2">📷 Captured Image</div>
                        <img src={capturedImage} alt="Captured" className="w-full rounded-lg mb-3 max-h-48 object-cover" />

                        {isProcessingPhoto ? (
                          <div className="text-blue-600 animate-pulse">🔍 Processing with AI OCR...</div>
                        ) : extractedText ? (
                          <>
                            <div className="bg-white/10 rounded p-3 mb-3">
                              <div className="text-xs text-muted-foreground mb-1">Extracted Text</div>
                              <div className="text-sm font-mono whitespace-pre-line">{extractedText}</div>
                            </div>

                            {translatedPhoto && (
                              <div className="bg-green-500/10 rounded p-3">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Translation ({supportedLanguages.find(l => l.code === selectedLanguage)?.name})
                                </div>
                                <div className="text-sm font-mono whitespace-pre-line text-green-700 dark:text-green-300">
                                  {translatedPhoto}
                                </div>
                              </div>
                            )}
                          </>
                        ) : null}
                      </div>
                    )}

                    {isRecording ? (
                      <div className="bg-primary/10 rounded-lg p-4 border-l-4 border-primary animate-pulse">
                        <div className="text-sm text-muted-foreground mb-1">Listening...</div>
                        <div className="text-primary">🎙️ Speak now to record your voice</div>
                      </div>
                    ) : isTranslating || isGeneratingResponse ? (
                      <>
                        {recognizedText && (
                          <div className="bg-primary/10 rounded-lg p-4">
                            <div className="text-sm text-muted-foreground mb-1">You said (English)</div>
                            <div>"{recognizedText}"</div>
                          </div>
                        )}

                        {translatedText && (
                          <div className="bg-accent/10 rounded-lg p-4">
                            <div className="text-sm text-muted-foreground mb-1">Translation ({supportedLanguages.find(l => l.code === selectedLanguage)?.name})</div>
                            <div>"{translatedText}"</div>
                          </div>
                        )}

                        <div className="bg-secondary/20 rounded-lg p-4">
                          <div className="text-sm text-primary font-medium mb-1">
                            🤖 {isGeneratingResponse ? 'AI Generating Response...' : 'AI Processing...'}
                          </div>
                          <div className="text-sm">
                            {isGeneratingResponse ?
                              'Creating a human-like response in your selected language...' :
                              'Transcribing and translating your voice...'
                            }
                          </div>
                        </div>
                      </>
                    ) : aiResponse ? (
                      <>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">You said (English)</div>
                          <div>"{recognizedText}"</div>
                        </div>

                        <div className="bg-accent/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Translation ({supportedLanguages.find(l => l.code === selectedLanguage)?.name})</div>
                          <div>"{translatedText}"</div>
                        </div>

                        <div className="bg-green-500/10 rounded-lg p-4 border-l-4 border-green-500">
                          <div className="text-sm text-muted-foreground mb-1">🤖 AI Response ({supportedLanguages.find(l => l.code === selectedLanguage)?.name})</div>
                          <div className="text-green-700 dark:text-green-300">"{aiResponse}"</div>
                          <div className="text-xs text-muted-foreground mt-2">🔊 Playing audio response...</div>
                        </div>
                      </>
                    ) : audioBlob ? (
                      <>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Your Recording</div>
                          <div>✅ Audio recorded successfully! ({formatTime(recordingTime)})</div>
                        </div>

                        <div className="bg-accent/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Ready for AI Translation</div>
                          <div>🌐 Click "Translate & Get AI Response" to process with AI</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">🎙️ Voice Translation</div>
                          <div>"Hello, nice to meet you. How are you doing today?"</div>
                          <div className="text-xs text-muted-foreground mt-1">→ Record your voice for instant translation</div>
                        </div>

                        <div className="bg-blue-500/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">📷 Photo Translation Example</div>
                          <div className="bg-white/10 rounded p-2 mb-2 font-mono text-sm">
                            Menu del Día<br/>
                            Paella €15<br/>
                            Sangría €8<br/>
                            Flan €4
                          </div>
                          <div className="text-xs text-muted-foreground">→ Take a photo to translate menus, signs, documents</div>
                        </div>

                        <div className="bg-accent/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">AI Response (Multiple Languages)</div>
                          <div className="space-y-2 text-sm">
                            <div><strong>🇪🇸 Spanish:</strong> "¡Hola! Estoy muy bien, gracias por preguntar."</div>
                            <div><strong>🇺🇸 English:</strong> "Hello! I'm doing great today, thanks for asking!"</div>
                            <div><strong>🇿🇦 Afrikaans:</strong> "Hallo! Ek gaan vandag baie goed, dankie dat jy vra."</div>
                          </div>
                        </div>

                        <div className="bg-secondary/20 rounded-lg p-4">
                          <div className="text-sm text-primary font-medium mb-1">🌍 Complete AI Translation Suite</div>
                          <div className="text-sm">Voice + Photo translation in 100+ languages for business meetings, café conversations, travel, and more!</div>
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
                      {audioBlob ? 'Play Recording' : 'No Audio'}
                    </Button>

                    {aiResponse && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-green-500/10 hover:bg-green-500/20"
                        onClick={() => speakText(aiResponse, selectedLanguage)}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Replay AI Response
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => alert('Export conversation logs to spreadsheet - Coming soon!')}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
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
                        alert("Free trial: 5 minutes/day calls + 2 messages total. After that, choose a paid plan to continue using Eunoia.");
                      } else if (plan.name === "Enterprise") {
                        alert("Contact our sales team at support@eunoia.ai for enterprise pricing and PayPal setup.");
                      } else {
                        // PayPal integration would go here
                        const paypalAmount = plan.name === "Connect" ? "19.99" : "49.99";
                        alert(`PayPal Integration:\n\nTo integrate PayPal payments:\n\n1. Sign up at PayPal Developer (developer.paypal.com)\n2. Create a PayPal app and get Client ID\n3. Add PayPal SDK to your project\n4. Use this amount: $${paypalAmount}\n5. Redirect to PayPal with item details\n\nExample PayPal button code:\n<PayPalButtons\n  createOrder={(data, actions) => {\n    return actions.order.create({\n      purchase_units: [{\n        amount: {\n          value: "${paypalAmount}"\n        }\n      }]\n    });\n  }}\n  onApprove={(data, actions) => {\n    return actions.order.capture().then((details) => {\n      alert('Payment successful!');\n    });\n  }}\n/>`);
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

      {/* PayPal Integration Guide */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              💳 PayPal Payment Integration
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-effect p-6 rounded-lg border border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Setup Instructions
                </h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-xs text-white font-bold">1</span>
                    <span>Create PayPal Developer account at <code className="bg-muted px-1 rounded">developer.paypal.com</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-xs text-white font-bold">2</span>
                    <span>Create a new app and get your Client ID & Secret</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-xs text-white font-bold">3</span>
                    <span>Install PayPal SDK: <code className="bg-muted px-1 rounded">npm install @paypal/react-paypal-js</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary rounded-full w-6 h-6 flex items-center justify-center text-xs text-white font-bold">4</span>
                    <span>Configure environment variables with your PayPal credentials</span>
                  </li>
                </ol>
              </div>

              <div className="glass-effect p-6 rounded-lg border border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Integration Code
                </h3>
                <div className="bg-muted/50 rounded p-3 text-xs font-mono">
                  <div className="text-green-600 mb-2">// PayPal Wrapper Component</div>
                  <div>{`<PayPalScriptProvider options={{`}</div>
                  <div className="ml-2">{`"client-id": "YOUR_CLIENT_ID",`}</div>
                  <div className="ml-2">{`currency: "USD"`}</div>
                  <div>{`}}>`}</div>
                  <div className="mt-2">{`<PayPalButtons`}</div>
                  <div className="ml-2">{`createOrder={(data, actions) => {`}</div>
                  <div className="ml-4">{`return actions.order.create({`}</div>
                  <div className="ml-6">{`purchase_units: [{`}</div>
                  <div className="ml-8">{`amount: { value: "19.99" }`}</div>
                  <div className="ml-6">{`}]`}</div>
                  <div className="ml-4">{`});`}</div>
                  <div className="ml-2">{`}}`}</div>
                  <div className="ml-2">{`onApprove={handlePayment}`}</div>
                  <div>{`/>`}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="font-semibold text-blue-600 mb-2">🚀 Quick Setup for Testing:</h4>
              <p className="text-sm text-muted-foreground">
                Use PayPal Sandbox for testing payments. All current pricing buttons will show PayPal integration instructions when clicked.
                Connect Plan: $19.99/month • Synergy Plan: $49.99/month • Enterprise: Custom pricing via sales team.
              </p>
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
