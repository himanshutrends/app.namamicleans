"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, User, Mail, Phone, MapPin, CreditCard, LogOut, ChevronRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/layout/BottomNavigation";

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Apt 4B, New York, NY 10001",
  image: "https://randomuser.me/api/portraits/men/32.jpg"
};

const ProfileSection = ({ icon, title, value, linkTo }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string,
  linkTo?: string
}) => {
  const content = (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="font-medium">{value}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
  
  if (linkTo) {
    return <Link href={linkTo}>{content}</Link>;
  }
  
  return content;
};

const Profile = () => {
  const [user] = useState(userData);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-800">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">My Profile</h1>
        </div>
      </header>
      
      {/* Profile Content */}
      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-white">
                <img src={user.image} alt={user.name} className="object-cover" />
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-1">
                <Camera className="h-3 w-3 text-white" />
              </button>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
          
          <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
            Edit Profile
          </Button>
        </div>
        
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-2">Account Settings</h3>
          <Separator className="mb-2" />
          
          <div className="space-y-1">
            <ProfileSection 
              icon={<User className="h-4 w-4 text-teal-600" />}
              title="Personal Information"
              value={user.name}
              linkTo="/profile/personal"
            />
            
            <Separator />
            
            <ProfileSection 
              icon={<Mail className="h-4 w-4 text-teal-600" />}
              title="Email Address"
              value={user.email}
              linkTo="/profile/email"
            />
            
            <Separator />
            
            <ProfileSection 
              icon={<Phone className="h-4 w-4 text-teal-600" />}
              title="Phone Number"
              value={user.phone}
              linkTo="/profile/phone"
            />
            
            <Separator />
            
            <ProfileSection 
              icon={<MapPin className="h-4 w-4 text-teal-600" />}
              title="Addresses"
              value="2 saved addresses"
              linkTo="/profile/addresses"
            />
            
            <Separator />
            
            <ProfileSection 
              icon={<CreditCard className="h-4 w-4 text-teal-600" />}
              title="Payment Methods"
              value="3 saved cards"
              linkTo="/profile/payment"
            />
          </div>
        </div>
        
        {/* Other Options */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-2">Other</h3>
          <Separator className="mb-2" />
          
          <div className="space-y-1">
            <Link href="/help" className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Help & Support</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            
            <Separator />
            
            <Link href="/terms" className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 12.16L10.04 15.2L17.04 8.2" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-medium">Terms & Policies</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>
        
        {/* Logout */}
        <Button variant="outline" className="w-full border-red-500 text-red-600 hover:bg-red-50 flex gap-2 items-center justify-center">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;
