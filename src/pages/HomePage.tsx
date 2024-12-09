import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ArrowRight, Download, Star, Users, Box, 
  Library, GraduationCap, Zap, Globe, Clock, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModelGrid } from '@/components/model/ModelGrid';
import { useModelStore } from '@/stores/modelStore';
import { formatNumber } from '@/lib/utils';

function HomePage() {
  const { models } = useModelStore();

  // Get featured and recent models
  const featuredModels = models
    .filter(model => model.isPro)
    .slice(0, 4);

  const recentModels = [...models]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="inline-flex items-center bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-6">
            <Library className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Premium 3D Model Library</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light mb-6 max-w-2xl">
            Optimized 3D Models for Performance
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
            Access thousands of high-quality, low-poly 3D models optimized for real-time applications and game development.
          </p>

          <div className="relative mb-8 max-w-2xl">
            <input
              type="text"
              placeholder="Search 3D models..."
              className="w-full h-14 pl-12 pr-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" href="/models">
              Browse Library
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button size="lg" variant="outline" href="/upload">
              Upload Model
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Globe, value: "150+", label: "Countries" },
              { icon: Users, value: "100K+", label: "Active Users" },
              { icon: Download, value: "1M+", label: "Downloads" },
              { icon: Box, value: "50K+", label: "Models" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-light mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Models */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-light">Recent Uploads</h2>
              </div>
              <p className="text-gray-600">Latest additions to our collection</p>
            </div>
            <Link 
              to="/models?sort=newest" 
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          <ModelGrid models={recentModels} />
        </div>
      </section>

      {/* Featured Models */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-light">Featured Models</h2>
              </div>
              <p className="text-gray-600">Handpicked premium 3D models</p>
            </div>
            <Link 
              to="/models?featured=true" 
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          <ModelGrid models={featuredModels} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
              <GraduationCap className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">VI-Academy</span>
            </div>
            <h2 className="text-3xl font-light mb-4">Level Up Your 3D Skills</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access professional tutorials, workshops, and resources to master 3D modeling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Quick Start Guides",
                description: "Get up to speed with our beginner-friendly tutorials"
              },
              {
                icon: Star,
                title: "Pro Workshops",
                description: "Deep-dive sessions with industry experts"
              },
              {
                icon: Heart,
                title: "Community",
                description: "Connect and learn from fellow creators"
              }
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="group bg-white p-8 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 mb-6 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-gray-900 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-light text-white mb-6">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators using VI-Library to build amazing 3D experiences.
            </p>
            <Button size="lg" href="/join" variant="default" className="bg-white text-gray-900 hover:bg-gray-100">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;