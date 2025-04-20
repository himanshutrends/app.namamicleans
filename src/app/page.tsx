
"use client";
import { useRef } from "react";
import { Search, ChevronRight } from "lucide-react";

// Components
import BottomNavigation from "@/components/layout/BottomNavigation";
import LocationSelector from "@/components/layout/LocationSelector";
import BannerSlider from "@/components/home/BannerSlider";
import CategoryItem from "@/components/home/CategoryItem";
import ServiceCard from "@/components/home/ServiceCard";
import { Input } from "@/components/ui/input";

// Data
import { categories } from "@/data/categories";
import { banners } from "@/data/banners";
import { services, servicePackages } from "@/data/services";

const Index = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Filter popular services
  const popularServices = services.filter(service => service.popular);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-teal-600 px-4 py-3 sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-semibold">CleanConnect</h1>
            <LocationSelector />
          </div>
          <div className="flex gap-3">
            <button className="w-9 h-9 rounded-full flex items-center justify-center bg-teal-500 text-white">
              <Search size={18} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-4 pt-4">
        {/* Search Bar */}
        <div className="mb-5">
          <div className="relative">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for services..."
              className="pl-10 pr-4 py-3 h-12 rounded-xl shadow-sm"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>
        
        {/* Banner Slider */}
        <div className="mb-6">
          <BannerSlider banners={banners} />
        </div>
        
        {/* Categories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            <button className="text-teal-600 text-sm font-medium flex items-center">
              View All
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                id={category.id}
                icon={<span className="text-2xl">{category.icon}</span>}
                name={category.name}
              />
            ))}
          </div>
        </div>
        
        {/* Special Packages */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Special Packages</h2>
            <button className="text-teal-600 text-sm font-medium flex items-center">
              View All
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {servicePackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`${pkg.bgColor || 'bg-gray-50'} p-4 rounded-xl flex items-center`}
              >
                <div className="w-1/2 pr-2">
                  <h3 className="text-base font-semibold mb-1">{pkg.title || pkg.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{pkg.description}</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold text-teal-600">${pkg.price || pkg.subscriptionPlans[0]?.base_price || 0}</span>
                    {pkg.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-teal-600 text-white text-xs px-4 py-1.5 rounded-full">
                    Book Now
                  </button>
                </div>
                <div className="w-1/2">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title || pkg.name}
                    className="w-full h-28 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Services */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Popular Services</h2>
            <button className="text-teal-600 text-sm font-medium flex items-center">
              View All
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                image={service.image}
                rating={service.rating}
                price={service.price}
                providerType={service.providerType}
              />
            ))}
          </div>
        </div>
        
        {/* Recently Viewed */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recently Viewed</h2>
          </div>
          
          <div className="space-y-3">
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                name={service.name}
                image={service.image}
                rating={service.rating}
                price={service.price}
                providerType={service.providerType}
                horizontal={true}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
