"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Search, Filter } from "lucide-react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import ServiceCard from "@/components/home/ServiceCard";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { services } from "@/data/services";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  // Find the category
  const category = categories.find(cat => cat.id === id);
  
  // Filter services by category
  const categoryServices = services.filter(service => service.category === id);
  
  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-semibold mb-2">Category not found</h2>
        <p className="text-gray-600 mb-4">The category you're looking for doesn't exist or may have been removed.</p>
        <Link href="/" className="bg-teal-600 text-white px-4 py-2 rounded-full">
          Go back to home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-teal-600 px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-white text-lg font-semibold">{category.name} Services</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-4 py-4">
        {/* Search and Filter */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder={`Search in ${category.name}...`}
              className="pl-10 pr-4 py-3 h-12 rounded-xl shadow-sm"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
            />
          </div>
          <button className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
            <Filter size={18} className="text-gray-700" />
          </button>
        </div>
        
        {/* Category Banner */}
        <div className="relative h-36 rounded-xl overflow-hidden mb-6">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center">
            <div className="p-4">
              <h2 className="text-white text-2xl font-bold mb-1">{category.name}</h2>
              <p className="text-white/90 text-sm">{categoryServices.length} services available</p>
            </div>
          </div>
        </div>
        
        {/* Services List */}
        {categoryServices.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {categoryServices.map(service => (
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
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No services available in this category.</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
