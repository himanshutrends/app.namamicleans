
import { Service, ServicePackage, SubscriptionPlan, SubscriptionPlanType } from "./models";

// Subscription plan types
export const subscriptionPlanTypes: SubscriptionPlanType[] = [
  {
    id: "one-time",
    name: "One Time",
    duration: 1
  },
  {
    id: "monthly",
    name: "Monthly",
    duration: 30
  },
  {
    id: "quarterly",
    name: "Quarterly",
    duration: 90
  },
  {
    id: "yearly",
    name: "Yearly",
    duration: 365
  }
];

// Sample data for services
export const services: Service[] = [
  {
    id: "deep-cleaning",
    name: "Deep Home Cleaning",
    service_code: "DHC001",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    icon: "home",
    rating: 4.8,
    description: "Complete deep cleaning of your entire home including kitchen, bathroom, and living areas.",
    category: "cleaning",
    popular: true,
    slots_required: 2,
    price: 249,
    providerType: "Professional"
  },
  {
    id: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    service_code: "BC001",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    icon: "bath",
    rating: 4.7,
    description: "Thorough cleaning of all bathroom fixtures, floors, and surfaces.",
    category: "cleaning",
    popular: true,
    slots_required: 1,
    price: 99,
    providerType: "Professional"
  },
  {
    id: "kitchen-cleaning",
    name: "Kitchen Deep Clean",
    service_code: "KDC001",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    icon: "utensils",
    rating: 4.9,
    description: "Detailed cleaning of kitchen counters, cabinets, appliances, and floors.",
    category: "cleaning",
    popular: true,
    slots_required: 1,
    price: 129,
    providerType: "Professional"
  },
  {
    id: "carpet-cleaning",
    name: "Carpet Cleaning",
    service_code: "CC001",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    icon: "broom",
    rating: 4.6,
    description: "Professional carpet cleaning using advanced equipment and safe products.",
    category: "cleaning",
    slots_required: 1,
    price: 149,
    providerType: "Professional"
  },
  {
    id: "plumbing-repair",
    name: "Plumbing Repair",
    service_code: "PR001",
    image: "/lovable-uploads/8e3fcc5c-e5e3-4ea6-873f-512db50bc8bd.png",
    icon: "wrench",
    rating: 4.7,
    description: "Expert plumbing repair services for leaks, clogs, and installations.",
    category: "plumbing",
    popular: true,
    slots_required: 1,
    price: 179,
    providerType: "Expert"
  },
  {
    id: "electrical-repair",
    name: "Electrical Services",
    service_code: "ES001",
    image: "/lovable-uploads/3c8ac677-b445-4127-9c2a-4ca42fad1afd.png",
    icon: "bolt",
    rating: 4.8,
    description: "Professional electrical repairs, installations, and maintenance.",
    category: "electrical",
    popular: true,
    slots_required: 1,
    price: 199,
    providerType: "Expert"
  }
];

// Sample subscription plans for each service
export const subscriptionPlans: SubscriptionPlan[] = [
  // Deep cleaning plans
  {
    id: "deep-cleaning-one-time",
    serviceId: "deep-cleaning",
    planTypeId: "one-time",
    planTypeName: "One Time",
    min_visits: 1,
    max_visits: 1,
    validity_days: 1,
    base_price: 249,
    extra_price_per_visit: 249,
    discount_percentage: 0
  },
  {
    id: "deep-cleaning-monthly",
    serviceId: "deep-cleaning",
    planTypeId: "monthly",
    planTypeName: "Monthly",
    min_visits: 2,
    max_visits: 4,
    validity_days: 30,
    base_price: 449,
    extra_price_per_visit: 200,
    discount_percentage: 10
  },
  {
    id: "deep-cleaning-quarterly",
    serviceId: "deep-cleaning",
    planTypeId: "quarterly",
    planTypeName: "Quarterly",
    min_visits: 6,
    max_visits: 12,
    validity_days: 90,
    base_price: 1299,
    extra_price_per_visit: 180,
    discount_percentage: 15
  },
  {
    id: "deep-cleaning-yearly",
    serviceId: "deep-cleaning",
    planTypeId: "yearly",
    planTypeName: "Yearly",
    min_visits: 24,
    max_visits: 36,
    validity_days: 365,
    base_price: 4999,
    extra_price_per_visit: 170,
    discount_percentage: 20
  },
  
  // Similar plans for other services...
  {
    id: "bathroom-cleaning-one-time",
    serviceId: "bathroom-cleaning",
    planTypeId: "one-time",
    planTypeName: "One Time",
    min_visits: 1,
    max_visits: 1,
    validity_days: 1,
    base_price: 99,
    extra_price_per_visit: 99,
    discount_percentage: 0
  },
  {
    id: "bathroom-cleaning-monthly",
    serviceId: "bathroom-cleaning",
    planTypeId: "monthly",
    planTypeName: "Monthly",
    min_visits: 2,
    max_visits: 4,
    validity_days: 30,
    base_price: 179,
    extra_price_per_visit: 85,
    discount_percentage: 10
  }
];

// Sample service packages
export const servicePackages: ServicePackage[] = [
  {
    id: "home-sparkle",
    serviceId: "deep-cleaning",
    name: "Home Sparkle Package",
    title: "Home Sparkle Package",
    description: "Keep your home sparkling clean all year round with our comprehensive cleaning package",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    subscriptionPlans: subscriptionPlans.filter(plan => plan.serviceId === "deep-cleaning"),
    bgColor: "bg-blue-50",
    price: 449,
    originalPrice: 499
  },
  {
    id: "bathroom-refresh",
    serviceId: "bathroom-cleaning",
    name: "Bathroom Refresh",
    title: "Bathroom Refresh",
    description: "Regular bathroom maintenance to keep your bathrooms hygienic and spotless",
    image: "/lovable-uploads/b7398ea0-7413-4f35-bcbb-7e4f1423dc9b.png",
    subscriptionPlans: subscriptionPlans.filter(plan => plan.serviceId === "bathroom-cleaning"),
    bgColor: "bg-green-50",
    price: 179,
    originalPrice: 199
  }
];

// Helper function to get subscription plans for a service
export const getSubscriptionPlansForService = (serviceId: string) => {
  return subscriptionPlans.filter(plan => plan.serviceId === serviceId);
};
