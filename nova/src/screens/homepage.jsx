import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Zap, Globe, ArrowRight, Menu, X, Star, Cpu, Shield, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NOVAting() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const FloatingParticles = () => {
    const particles = Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-70"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 4}s`,
          boxShadow: '0 0 6px currentColor'
        }}
      />
    ));
    return <div className="fixed inset-0 pointer-events-none z-0">{particles}</div>;
  };

  const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
    <div className="group relative p-8 bg-gradient-to-br from-slate-900/70 to-slate-800/50 backdrop-blur-xl border border-cyan-500/20 rounded-3xl hover:border-cyan-400/60 transition-all duration-700 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-cyan-400/25 overflow-hidden">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl`} />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-600/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />
      
      <div className="relative z-10">
        <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
          <Icon className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
        <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300">{description}</p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );

  const StatCard = ({ number, label, suffix = "" }) => (
    <div className="text-center group">
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
        {number}{suffix}
      </div>
      <div className="text-slate-400 font-medium">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Dynamic gradient background */}
      <div 
        className="fixed inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), rgba(139, 92, 246, 0.1), rgba(15, 23, 42, 0.8))`
        }}
      />
      
      {/* Base gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-800" />
      
      <FloatingParticles />
      
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20' 
          : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 shadow-lg shadow-cyan-400/30">
                <Sparkles className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-600 bg-clip-text text-transparent">
              NOVAting
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-slate-300 hover:text-cyan-400 transition-all duration-300 font-semibold text-lg group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-50 blur-sm group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            ))}
            <button className="relative group px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/30 hover:scale-105 overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-xl hover:bg-slate-800/50 backdrop-blur-sm transition-all duration-300 border border-slate-700 hover:border-cyan-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-cyan-500/20`}>
          <div className="px-6 py-6 space-y-6">
            {['Home', 'Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-semibold text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-10 inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 rounded-full backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Star className="w-5 h-5 text-cyan-400 mr-3 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-lg font-semibold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Revolutionizing AI Technology
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
              NOVA
            </span>
            <span className="text-white drop-shadow-2xl">ting</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Unleash the power of <span className="text-cyan-400 font-semibold">next-generation AI</span> to transform your business, 
            automate complex workflows, and unlock <span className="text-purple-400 font-semibold">unprecedented possibilities</span> in the digital realm.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <button
            onClick={()=> {
                navigate('/login');
                console.log('Navigating to login');
            }}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/40 hover:scale-105 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Experience AI Magic
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            </button>
            
            <button className="group px-10 py-5 border-2 border-cyan-400/50 rounded-2xl font-bold text-xl hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/20 backdrop-blur-sm">
              <span className="flex items-center">
                Watch Demo
                <div className="ml-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-2xl mx-auto">
            <StatCard number="99.9" suffix="%" label="Accuracy Rate" />
            <StatCard number="10" suffix="M+" label="Queries Processed" />
            <StatCard number="150" suffix="+" label="Happy Clients" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 rounded-full backdrop-blur-sm">
              <span className="text-lg font-semibold text-cyan-300">Why Choose NOVAting?</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              Cutting-Edge Features
            </h2>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed">
              Discover the revolutionary capabilities that make NOVAting the ultimate AI solution for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            <FeatureCard
              icon={Brain}
              title="Advanced AI Models"
              description="State-of-the-art neural networks trained on massive datasets to deliver unprecedented accuracy and insights across all domains."
              gradient="from-cyan-500 to-blue-600"
            />
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Optimized algorithms and distributed cloud infrastructure ensure blazing-fast response times for all your AI operations."
              gradient="from-purple-500 to-pink-600"
            />
            <FeatureCard
              icon={Globe}
              title="Global Scale"
              description="Deploy AI solutions worldwide with our distributed infrastructure, multi-language support, and 99.9% uptime guarantee."
              gradient="from-emerald-500 to-teal-600"
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Bank-level encryption, compliance certifications, and advanced threat protection keep your data safe and secure."
              gradient="from-red-500 to-orange-600"
            />
            <FeatureCard
              icon={Cpu}
              title="Smart Automation"
              description="Intelligent workflow automation that learns from your processes and continuously optimizes performance."
              gradient="from-indigo-500 to-purple-600"
            />
            <FeatureCard
              icon={Rocket}
              title="Rapid Deployment"
              description="Get up and running in minutes with our streamlined onboarding process and comprehensive API documentation."
              gradient="from-yellow-500 to-red-600"
            />
          </div>

          <div className="text-center">
            <button className="group relative px-16 py-6 bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-cyan-400/30 rounded-2xl font-bold text-xl hover:border-cyan-400 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 overflow-hidden backdrop-blur-sm">
              <span className="relative z-10 flex items-center">
                Explore All Features
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-gradient-to-r from-slate-800/50 to-purple-900/50 backdrop-blur-xl">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent leading-tight">
            Ready to Transform Your Business?
          </h2>
          <p className="text-2xl text-slate-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            Join thousands of companies already using NOVAting to revolutionize their operations with cutting-edge AI technology
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/40 hover:scale-105 overflow-hidden">
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            </button>
            <button className="px-12 py-6 border-2 border-white/30 rounded-2xl font-bold text-2xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-slate-900/90 backdrop-blur-xl border-t border-cyan-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-6 md:mb-0 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                NOVAting
              </span>
            </div>
            <div className="text-slate-400 text-center md:text-right">
              <p className="text-lg font-semibold">&copy; 2025 NOVAting. All rights reserved.</p>
              <p className="text-sm mt-2 text-slate-500">Powered by next-generation AI technology</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}