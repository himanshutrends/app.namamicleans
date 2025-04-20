
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { services, getSubscriptionPlansForService } from "@/data/services";

// Sample available time slots
const availableTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
];

const BookingDateTime = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId") || "";
  const infoParam = searchParams.get("info") || "";
  const navigate = useNavigate();
  
  const [bookingInfo, setBookingInfo] = useState<any>({});
  const [service, setService] = useState<any>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  useEffect(() => {
    // Parse booking info
    if (infoParam) {
      try {
        const parsedInfo = JSON.parse(decodeURIComponent(infoParam));
        setBookingInfo(parsedInfo);
      } catch (e) {
        console.error("Error parsing booking info:", e);
      }
    }
    
    // Get service and plan details
    if (id) {
      const serviceDetails = services.find(s => s.id === id);
      if (serviceDetails) {
        setService(serviceDetails);
        
        // Get subscription plan
        const plans = getSubscriptionPlansForService(id);
        const plan = plans.find(p => p.id === planId);
        if (plan) {
          setSubscriptionPlan(plan);
        }
      }
    }
  }, [id, planId, infoParam]);
  
  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;
    
    // Format date for storage/display
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    
    // Prepare updated booking info
    const updatedBookingInfo = {
      ...bookingInfo,
      date: formattedDate,
      time: selectedTime,
      serviceName: service?.name,
      planType: subscriptionPlan?.planTypeName,
      amount: subscriptionPlan?.base_price
    };
    
    // Navigate to payment
    navigate(`/booking/${id}/payment?planId=${planId}&info=${encodeURIComponent(JSON.stringify(updatedBookingInfo))}`);
  };
  
  if (!service || !subscriptionPlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p>Loading service details...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link 
            to={`/booking/${id}?planId=${planId}`} 
            className="text-gray-800"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">Select Date & Time</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="booking-progress mt-4 flex items-center">
          <div className="step-circle step-circle-completed">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="step-connector step-connector-active"></div>
          <div className="step-circle step-circle-active">2</div>
          <div className="step-connector"></div>
          <div className="step-circle">3</div>
        </div>
      </header>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">{service.name}</h2>
          <p className="text-sm text-gray-600">{subscriptionPlan.planTypeName} Plan - ${subscriptionPlan.base_price}</p>
        </div>
        
        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-medium flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-teal-600" />
            Select Date
          </h3>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <Calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  // Disable past dates and dates more than 60 days in the future
                  return date < new Date() || 
                         date > new Date(new Date().setDate(new Date().getDate() + 60));
                }}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Time Selection */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-medium flex items-center gap-2 mb-3">
            <Clock size={18} className="text-teal-600" />
            Select Time
          </h3>
          
          {selectedDate ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={cn(
                    selectedTime === time && "bg-teal-600 hover:bg-teal-700"
                  )}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              Please select a date first
            </p>
          )}
        </div>
        
        <Button 
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BookingDateTime;
