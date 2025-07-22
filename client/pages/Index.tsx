import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Brain, Shield, BarChart3, Users, Zap, Heart, MessageCircle, Eye, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Cognitive Mirroring",
      description: "Adapts your communication style to resonate with the other person's thought patterns (direct vs. indirect, big picture vs. detail-oriented)."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Emotional Resonance Check",
      description: "Gauges emotional tone and advises on delivery adjustments for maximum impact."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust Indicator & Mitigation",
      description: "Monitors subtle trust cues and suggests real-time mitigation actions to build rapport."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Digital Diplomat Sandbox",
      description: "Simulate interactions with AI avatars and receive cultural feedback before real conversations."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Contextual Persona Adaptation",
      description: "Tailors your communication persona for specific cultural contexts and social situations."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Hierarchical Compass",
      description: "Identifies unspoken power structures and advises on appropriate address forms and conversation flow."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Bias Blocker",
      description: "Detects and rephrases potentially biased or insensitive language in real-time."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Communication Debrief",
      description: "Summarizes communication dynamics and offers improvement insights after each interaction."
    }
  ];

  const benefits = [
    "Eliminate Communication Blind Spots",
    "Forge Deeper Connections & Trust",
    "Achieve Strategic Communication Mastery",
    "Boost Confidence & Reduce Anxiety",
    "Experience Personalized Growth",
    "Enjoy Unparalleled Convenience"
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      period: "",
      description: "Perfect for travelers and learners",
      features: [
        "Core STT/TTS",
        "Phrasebook",
        "5min/day calls, 20 msgs/day",
        "Ad-supported"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Connect",
      price: "$19.99",
      period: "/month",
      description: "Ideal for freelancers and SMBs",
      features: [
        "Unlimited Contextual Feedback",
        "Idiom Localizer",
        "Priority Support",
        "Ad-Free Experience"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Synergy",
      price: "$49.99",
      period: "/month",
      description: "For international sales, HR, consultants",
      features: [
        "All Connect Features",
        "Digital Sandbox",
        "Persona Adaptation",
        "Hierarchical Compass",
        "Bias & Consent Tools",
        "2 Debriefs/month",
        "Account Manager"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For corporates and diplomacy",
      features: [
        "All Synergy Features",
        "Unlimited Debriefs",
        "API Integration",
        "Team Dashboard",
        "SSO & Tech Support",
        "Custom Modules",
        "Compliance Audits"
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
              Connect Beyond Words.<br />
              <span className="gradient-text">Understand Every Culture.</span><br />
              Master Every Conversation.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Eunoia is a revolutionary AI companion that transforms cross-cultural communication from transactional exchanges into deeply empathetic and strategically effective interactions.
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
              Real-time Implicit Contextual Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Eunoia isn't just about what's spoken; it's about what's truly understood. Our AI goes beyond translation to decode the implicit layers of human connection.
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
                Benefits for <span className="gradient-text">You</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                With Eunoia, you will transform how you connect, communicate, and succeed globally.
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
              Choose Your Path to <span className="gradient-text">Global Fluency</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Select the plan that fits your communication needs and budget.
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
              Powered by <span className="gradient-text">Cutting-Edge AI</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Google Gemini AI</h3>
                <p className="text-muted-foreground">Advanced language understanding and cultural intelligence</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Processing</h3>
                <p className="text-muted-foreground">Instant speech-to-text and text-to-speech capabilities</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/20 border border-border/50">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                <p className="text-muted-foreground">Enterprise-grade security and compliance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Global Communications?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Eunoia to navigate cross-cultural conversations with confidence and empathy.
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
                The Global Empathy Nexus AI - Transforming cross-cultural communication through advanced AI and deep cultural understanding.
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
