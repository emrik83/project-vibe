import React from 'react';
import { 
  Download, Cpu, Brain, Palette, Layers, Share2, 
  Monitor, CheckCircle
} from 'lucide-react';

function VibePage() {
  const partners = [
    {
      name: "UNREAL ENGINE",
      logo: "https://cdn2.unrealengine.com/ue-logo-white-e34b6ba9383f.svg",
      url: "https://www.unrealengine.com/en-US",
      description: "Powering next-gen visualization"
    },
    {
      name: "NVIDIA",
      logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
      url: "https://www.nvidia.com/tr-tr/",
      description: "RTX technology partner"
    },
    {
      name: "VARJO",
      logo: "//i.namu.wiki/i/m8ie0_7Cck_02sN0Po6dsFMsIe071hwACGnhAwOMovSFWmne_h1MdgCE6fzY4SIvdhyjOJEYsaIfzniUe9dIGFWm8VcqpN2QwxFZAXxGR5fZWSBVvNZXJNMrQ_-h0_WYFddkIk2aBukjTxSXmg6CQQ.svg",
      url: "https://varjo.com/",
      description: "Premium VR hardware"
    },
    {
      name: "WEART",
      logo: "https://weart.it/wp-content/uploads/2021/03/logo-white.svg",
      url: "https://weart.it/",
      description: "Haptic feedback technology"
    }
  ];

  const features = [
    {
      icon: Cpu,
      title: "RTX Lumen Technology",
      description: "Experience photorealistic rendering in real-time"
    },
    {
      icon: Brain,
      title: "AI-Powered Design",
      description: "Smart recommendations and automated workflows"
    },
    {
      icon: Monitor,
      title: "Immersive VR",
      description: "One-click VR mode with haptic feedback"
    },
    {
      icon: Palette,
      title: "Smart Materials",
      description: "AI-optimized material creation and management"
    },
    {
      icon: Layers,
      title: "Poly Optimization",
      description: "Automatic high to low poly conversion"
    },
    {
      icon: Share2,
      title: "Real-time Collaboration",
      description: "Seamless team workflows and sharing"
    }
  ];

  const detailedFeatures = [
    {
      title: "Real-Time Render-Quality Walkthroughs",
      description: "Experience your designs with unprecedented realism. Powered by RTX Lumen technology, every detail comes alive in real-time.",
      features: [
        "Photorealistic lighting and shadows",
        "Real-time material adjustments",
        "Interactive environment controls"
      ]
    },
    {
      title: "Haptic VR Experience",
      description: "Feel your designs with Weart's haptic gloves technology. Touch, grab, and interact with your 3D models in virtual reality.",
      features: [
        "Tactile feedback for materials",
        "Pressure-sensitive interaction",
        "Real-time force feedback"
      ]
    },
    {
      title: "AI-Powered Design Intelligence",
      description: "Let artificial intelligence enhance your creative process with smart suggestions and automated optimizations.",
      features: [
        "Smart layout recommendations",
        "Automated material generation",
        "Design style analysis"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
        
        <div className="relative max-w-[1400px] mx-auto px-6 pt-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-light mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              The Future of Interior Design and Visualization
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
              Welcome to Vibe, where cutting-edge technology meets creative excellence. 
              Powered by Unreal Engine and enhanced with AI, Vibe transforms how designers 
              bring their visions to life.
            </p>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download VIBE
              </span>
            </button>
          </div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_800px_at_50%_-100%,#3b82f6,transparent)]" />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_800px_at_80%_60%,#7c3aed,transparent)]" />
        </div>
      </section>

      {/* Detailed Features */}
      <section className="bg-black/40 py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-24">
            {detailedFeatures.map((content, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row gap-12 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-light">{content.title}</h3>
                  <p className="text-gray-400 text-lg">{content.description}</p>
                  <ul className="space-y-4">
                    {content.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="p-1 rounded-full bg-blue-500/20">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="relative aspect-video">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl" />
                    <img
                      src={`https://source.unsplash.com/800x600/?technology,${idx}`}
                      alt={content.title}
                      className="relative rounded-xl w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-32 bg-black/40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h4 className="text-purple-500 mb-4">OUR PARTNERS</h4>
            <h2 className="text-3xl md:text-4xl font-light">
              Powered by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, idx) => (
              <a
                key={idx}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/50"
              >
                <div className="h-12 mb-4 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {partner.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">
            Powered by Next-Gen Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group p-8 rounded-2xl bg-black/50 border border-white/10 hover:border-blue-500/50 transition-colors"
              >
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-fit">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-medium mb-4 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default VibePage;