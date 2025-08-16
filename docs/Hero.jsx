import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import solarPanelsImage from '../assets/images/solar_panels_1.jpg';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-orange-50 py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={solarPanelsImage}
          alt="Solar panels"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-orange-900/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the Best
            <span className="text-orange-500 block">Solar Energy Companies</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover trusted solar energy providers, read authentic reviews, and make informed decisions 
            for your renewable energy journey. Join thousands of satisfied customers who found their 
            perfect solar solution.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by company name, location, or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-14 pl-12 text-lg border-2 border-gray-300 focus:border-orange-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8 bg-orange-500 hover:bg-orange-600">
                Search Companies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-700">Verified Companies</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">10,000+</div>
              <div className="text-gray-700">Customer Reviews</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">1,000MW+</div>
              <div className="text-gray-700">Total Capacity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

