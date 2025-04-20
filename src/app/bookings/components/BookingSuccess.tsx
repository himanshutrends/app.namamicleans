import { useEffect, useState } from "react";
import { CheckCircle2, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/layout/BottomNavigation";
import confetti from "canvas-confetti";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const BookingSuccess = () => {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  
  useEffect(() => {
    // Get booking info from URL
    const params = new URLSearchParams(window.location.search);
    const bookingInfo = params.get('info');
    
    if (bookingInfo) {
      try {
        const parsedBooking = JSON.parse(decodeURIComponent(bookingInfo));
        setBooking(parsedBooking);
      } catch (e) {
        console.error("Error parsing booking info:", e);
      }
    } else {
      // If no booking info is provided, redirect to home
      router.push("/");
    }
    
    // Trigger confetti effect
    shootConfetti();
  }, [router]);
  
  const shootConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 250);
  };
  
  // If no booking data, show loading
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Success Header */}
      <header className="bg-teal-600 px-4 py-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white rounded-full p-3 mb-2">
            <CheckCircle2 size={40} className="text-teal-600" />
          </div>
          <h1 className="text-white text-2xl font-semibold">Booking Confirmed!</h1>
          <p className="text-white/90">Your service has been booked successfully.</p>
        </div>
      </header>
      
      {/* Booking Details */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Service</span>
              <span className="font-medium">{booking.serviceName || "Home Cleaning"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-medium">{booking.bookingId || "BOK123456"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-medium">{booking.date || "2023-06-15"} at {booking.time || "10:00 AM"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Frequency</span>
              <span className="font-medium capitalize">{booking.frequency || "Once"}</span>
            </div>
            
            <div className="border-t border-gray-100 my-4"></div>
            
            <div className="flex justify-between text-lg">
              <span className="font-semibold">Total Amount</span>
              <span className="font-bold text-teal-600">${booking.amount || "99.00"}</span>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="bg-teal-50 p-2 rounded-full">
                <Calendar size={20} className="text-teal-600" />
              </div>
              <div className="flex-1">
                <p>You can check your booking details anytime</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
            <Link href="/bookings">View My Bookings</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Book Another Service</Link>
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default BookingSuccess;
