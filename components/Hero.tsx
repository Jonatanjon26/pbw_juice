import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-stone-50 pt-10 pb-20 lg:pt-20 lg:pb-28">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-300 to-transparent"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-t from-green-200 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="text-center lg:text-left lg:w-1/2 z-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>AI-Powered Nutrition</span>
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-stone-900 sm:text-5xl md:text-6xl">
            <span className="block">Freshness Blended</span>
            <span className="block text-orange-500">Just For You</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-base text-stone-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl lg:mx-0">
            Experience the future of juice. Build your own custom blend powered by AI analysis, or choose from our chef-curated classics. 100% Organic.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <a href="#create" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg transition-all shadow-lg hover:shadow-orange-500/30">
              Start Blending
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a href="#menu" className="flex items-center justify-center px-8 py-3 border border-stone-300 text-base font-medium rounded-full text-stone-700 bg-white hover:bg-stone-50 md:py-4 md:text-lg transition-all">
              View Menu
            </a>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center relative">
          {/* Abstract shapes for decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ml-20"></div>

          <img
            src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=800&fit=crop"
            alt="Fresh Juice"
            className="relative rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 object-cover w-full max-w-md aspect-square"
          />
        </div>
      </div>
    </div>
  );
};