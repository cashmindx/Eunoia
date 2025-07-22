import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Brain, Shield, BarChart3, Users, Zap, Heart, MessageCircle, Eye, TrendingUp, Star, Mic, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
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
              <Button variant="ghost">Sign In</Button>
              <Button className="gradient-primary hover:opacity-90 transition-opacity">Get Started</Button>
            </div>
          </div>
        </div>
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
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Start Your Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
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
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              How <span className="gradient-text">Eunoia Works</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Google Gemini AI</h3>
                <p className="text-muted-foreground">Smart language understanding and cultural knowledge</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Voice Recognition</h3>
                <p className="text-muted-foreground">Google Speech-to-Text for clear voice recording and translation</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Voice Output</h3>
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
            <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
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
