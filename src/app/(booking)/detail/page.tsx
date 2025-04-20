
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, MapPin, Car, Package, CalendarClock, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { getBookingById, getSubscriptionById } from "@/data/bookings";
import { Booking } from "@/data/models";

// Sample availability data for rescheduling
const availableTimes = [
  { id: "1", date: "2023-07-01", slots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"] },
  { id: "2", date: "2023-07-02", slots: ["10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"] },
  { id: "3", date: "2023-07-03", slots: ["08:00 AM", "12:00 PM", "02:00 PM", "06:00 PM"] },
];

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  useEffect(() => {
    const loadBookingDetails = () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const bookingData = getBookingById(id || "");
        
        if (bookingData) {
          setBooking(bookingData);
          
          // Get subscription
          const subscriptionData = getSubscriptionById(bookingData.subscriptionId);
          setSubscription(subscriptionData);
        }
        
        setIsLoading(false);
      }, 1000);
    };
    
    loadBookingDetails();
  }, [id]);
  
  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both date and time",
      });
      return;
    }
    
    // Simulate API call for rescheduling
    toast({
      title: "Booking Rescheduled",
      description: `Your booking has been rescheduled to ${selectedDate} at ${selectedTime}`,
    });
    
    // Update booking in state
    if (booking) {
      setBooking({
        ...booking,
        date: selectedDate,
        time: selectedTime
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
        <p className="mt-4 text-gray-500">Loading booking details...</p>
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold mb-2">Booking not found</h2>
        <p className="text-gray-600 mb-4">The booking you're looking for doesn't exist or may have been removed</p>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link to="/bookings">Go back to Bookings</Link>
        </Button>
      </div>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'ongoing': return 'bg-amber-100 text-amber-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/bookings" className="text-gray-800">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">Booking Details</h1>
        </div>
      </header>
      
      {/* Booking Header */}
      <div className="bg-white p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Visit #{booking.visit_number}</h2>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} className="text-teal-600" />
          <span>{booking.date}</span>
          <span className="mx-1">•</span>
          <Clock size={14} className="text-teal-600" />
          <span>{booking.time}</span>
        </div>
      </div>
      
      {/* Subscription Info */}
      {subscription && (
        <div className="bg-white p-4 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Package size={16} className="text-teal-600" />
            Subscription Details
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subscription ID:</span>
              <span className="font-medium">{subscription.subscription_id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Valid Until:</span>
              <span className="font-medium">{subscription.end_date}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Total Visits:</span>
              <span className="font-medium">{subscription.total_visits}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Visits Used:</span>
              <span className="font-medium">{subscription.visits_used} of {subscription.total_visits}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle:</span>
              <span className="font-medium">{subscription.vehicle_number}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Captain Info */}
      <div className="bg-white p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <User size={16} className="text-teal-600" />
          Captain
        </h3>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <img 
              src={booking.captainImage} 
              alt={booking.captainName} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="font-medium">{booking.captainName}</h4>
            <p className="text-sm text-gray-600">Professional Captain</p>
          </div>
          
          <Button variant="outline" size="sm" className="ml-auto rounded-full h-9 w-9 p-0">
            <Phone size={16} />
          </Button>
        </div>
      </div>
      
      {/* Location Info */}
      <div className="bg-white p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <MapPin size={16} className="text-teal-600" />
          Service Location
        </h3>
        
        <p className="text-sm text-gray-800 mb-2">{booking.address}</p>
        
        <div className="h-32 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
          <p className="text-sm text-gray-500">Map view will be displayed here</p>
        </div>
      </div>
      
      {/* Pricing Info */}
      <div className="bg-white p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Pricing</h3>
        <div className="text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Service Price</span>
            <span>${booking.price.toFixed(2)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span className="text-teal-600">${booking.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      {booking.status === "upcoming" && (
        <div className="px-4 space-y-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                <CalendarClock className="mr-2 h-4 w-4" />
                Reschedule Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reschedule Booking</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <h4 className="text-sm font-medium mb-2">Select a date</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {availableTimes.map(day => (
                    <Button
                      key={day.id}
                      variant={selectedDate === day.date ? "default" : "outline"}
                      className={selectedDate === day.date ? "bg-teal-600" : ""}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime(""); // Reset time when date changes
                      }}
                    >
                      {day.date.split("-")[2]}
                    </Button>
                  ))}
                </div>
                
                {selectedDate && (
                  <>
                    <h4 className="text-sm font-medium mb-2">Select a time</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes
                        .find(day => day.date === selectedDate)
                        ?.slots.map((time, idx) => (
                          <Button
                            key={idx}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={selectedTime === time ? "bg-teal-600" : ""}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button 
                    className="bg-teal-600 hover:bg-teal-700" 
                    onClick={handleReschedule}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm Reschedule
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Cancel Booking
          </Button>
        </div>
      )}
      
      <BottomNavigation />
    </div>
  );
};

export default BookingDetail;
