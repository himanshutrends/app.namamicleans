
// Core data models for the application

export interface State {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
}

export interface Service {
  id: string;
  name: string;
  service_code: string;
  description: string;
  icon: string;
  image: string;
  rating: number;
  category: string;
  popular?: boolean;
  slots_required: number;
  price?: number; // Added for backward compatibility
  providerType?: string; // Added for backward compatibility
}

export interface ServiceSection {
  id: string;
  serviceId: string;
  description: string;
  content: string;
  icon: string;
}

export interface ServiceGallery {
  id: string;
  serviceId: string;
  image: string;
}

export interface SubscriptionPlanType {
  id: string;
  name: string;
  duration: number; // in days
}

export interface SubscriptionPlan {
  id: string;
  serviceId: string;
  planTypeId: string;
  planTypeName: string; // For display convenience
  min_visits: number;
  max_visits: number;
  validity_days: number;
  base_price: number;
  extra_price_per_visit: number;
  discount_percentage: number;
}

export interface Subscription {
  id: string;
  subscription_id: string;
  planId: string;
  userId: string;
  vehicle_number: string;
  start_date: string;
  end_date: string;
  total_visits: number;
  visits_used: number;
  status: "active" | "inactive" | "expired";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "captain";
  cityId: string;
  address: string;
  image: string;
}

export interface Captain {
  id: string;
  userId: string;
  name: string;
  image: string;
  rating: number;
}

export interface CaptainSchedule {
  id: string;
  captainId: string;
  date: string;
  start_time: string;
  end_time: string;
  booked_slots: number;
}

export interface Booking {
  id: string;
  subscriptionId: string;
  visit_number: number; // Which visit number in the subscription
  captainScheduleId: string;
  captainId: string;
  captainName: string;
  captainImage: string;
  date: string;
  time: string;
  address: string;
  price: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

export interface Vehicle {
  id: string;
  userId: string;
  vehicle_number: string;
  vehicle_type: string;
  vehicle_model: string;
}

export interface ServicePackage {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  image: string;
  subscriptionPlans: SubscriptionPlan[];
  title?: string; // Added for backward compatibility
  price?: number; // Added for backward compatibility
  originalPrice?: number; // Added for backward compatibility
  bgColor?: string; // Added for backward compatibility
}
