"use client";
import { useState } from "react";
import { ChevronLeft, Star, Clock, Package, Info, Check, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { services, getSubscriptionPlansForService } from "@/data/services";
import { SubscriptionPlan } from "@/data/models";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ServiceDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    details: true,
    inclusions: false,
    reviews: false,
    plans: true
  });
  
  const service = services.find(s => s.id === id);
  const subscriptionPlans = getSubscriptionPlansForService(id || "");
  
  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-semibold mb-2">Service not found</h2>
        <p className="text-gray-600 mb-4">The service you're looking for doesn't exist or may have been removed.</p>
        <Link href="/" className="bg-teal-600 text-white px-4 py-2 rounded-full">
          Go back to home
        </Link>
      </div>
    );
  }
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const getSelectedPlan = (): SubscriptionPlan | undefined => {
    return subscriptionPlans.find(plan => plan.id === selectedPlan);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <Link
          href="/"
        >
          <ChevronLeft size={20} />
        </Link>
      </div>
      
      {/* Service Info */}
      <div className="bg-white -mt-6 rounded-t-3xl relative px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{service.name}</h1>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center bg-green-50 px-2 py-0.5 rounded-full">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs ml-1 font-medium">{service.rating}</span>
          </div>
          {service.providerType && (
            <>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{service.providerType}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              From ${subscriptionPlans.length > 0 ? subscriptionPlans[0].base_price : (service.price || 0)}
            </span>
          </div>
          <div className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            60 mins
          </div>
        </div>
        
        {/* Subscription Plans Selection */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <Package size={18} className="mr-2 text-teal-600" />
              Subscription Plans
            </h3>
            <button onClick={() => toggleSection("plans")}>
              {expandedSections.plans ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>
          </div>
          
          {expandedSections.plans && (
            <div className="space-y-3">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-4 border rounded-xl transition-all ${
                    selectedPlan === plan.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{plan.planTypeName}</h4>
                        {plan.discount_percentage > 0 && (
                          <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            {plan.discount_percentage}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {plan.min_visits} {plan.min_visits > 1 ? 'visits' : 'visit'} • Valid for {plan.validity_days} days
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-teal-700">${plan.base_price}</span>
                      {plan.discount_percentage > 0 && (
                        <p className="text-xs text-gray-500">
                          <span className="line-through">${Math.round(plan.base_price / (1 - plan.discount_percentage / 100))}</span>
                          {' '}per package
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Extra visits at ${plan.extra_price_per_visit}/visit
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Service Details */}
        <div className="border-t border-gray-200 pt-4">
          {/* Details Section */}
          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center"
              onClick={() => toggleSection("details")}
            >
              <h3 className="text-base font-semibold text-gray-900 flex items-center">
                <Info size={18} className="mr-2 text-teal-600" />
                About This Service
              </h3>
              {expandedSections.details ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections.details && (
              <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                <p>{service.description}</p>
                <p className="mt-2">
                  Our professional service providers use eco-friendly products and state-of-the-art
                  equipment to ensure quality results.
                </p>
              </div>
            )}
          </div>
          
          {/* Inclusions Section */}
          <div className="py-4 border-t border-gray-200">
            <button
              className="w-full flex justify-between items-center"
              onClick={() => toggleSection("inclusions")}
            >
              <h3 className="text-base font-semibold text-gray-900 flex items-center">
                <Check size={18} className="mr-2 text-teal-600" />
                What's Included
              </h3>
              {expandedSections.inclusions ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>
            
            {expandedSections.inclusions && (
              <div className="mt-3">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-teal-600 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Professional service from trained experts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-teal-600 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      High-quality equipment and materials
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-teal-600 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Service warranty
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="mr-2 text-teal-600 mt-0.5" />
                    <span className="text-sm text-gray-600">
                      Customer support
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between z-10">
        <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center">
          <ShoppingCart size={20} className="text-gray-700" />
        </button>
        <Link
          href={selectedPlan ? `/booking/${service.id}?planId=${selectedPlan}` : "#"}
          className={`flex-1 ml-3 py-3 rounded-full text-center font-medium ${
            selectedPlan 
              ? "bg-teal-600 text-white" 
              : "bg-gray-200 text-gray-500 pointer-events-none"
          }`}
          onClick={(e) => !selectedPlan && e.preventDefault()}
        >
          {selectedPlan ? "Book Now" : "Select a Plan"}
        </Link>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ServiceDetail;
