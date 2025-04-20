
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, CreditCard, Wallet, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/data/services";

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit_card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay using credit or debit card"
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    icon: Wallet,
    description: "Google Pay, Apple Pay, etc."
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    icon: DollarSign,
    description: "Pay when service is completed"
  }
];

const frequencyDiscount = {
  once: 0,
  weekly: 10,
  biweekly: 5,
  monthly: 15,
};

const BookingPayment = () => {
  const [searchParams] = useSearchParams();
  const infoParam = searchParams.get("info") || "";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookingInfo, setBookingInfo] = useState<any>({});
  const [service, setService] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Parse booking info from URL
    if (infoParam) {
      try {
        const parsedInfo = JSON.parse(decodeURIComponent(infoParam));
        setBookingInfo(parsedInfo);
        
        // Get service details
        if (parsedInfo.serviceId) {
          const foundService = services.find(s => s.id === parsedInfo.serviceId);
          if (foundService) {
            setService(foundService);
          }
        }
      } catch (e) {
        console.error("Error parsing booking info:", e);
      }
    }
  }, [infoParam]);
  
  const calculatePrice = () => {
    if (!service) return { basePrice: 0, discount: 0, total: 0 };
    
    const basePrice = service.price;
    const discountPercent = frequencyDiscount[bookingInfo.frequency as keyof typeof frequencyDiscount] || 0;
    const discount = basePrice * (discountPercent / 100);
    const total = basePrice - discount;
    
    return {
      basePrice,
      discount,
      discountPercent,
      total
    };
  };
  
  const priceInfo = calculatePrice();
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demonstration
      
      if (success) {
        // Generate a random booking ID
        const bookingId = `BK${Math.floor(Math.random() * 1000000)}`;
        navigate(`/booking/success?id=${bookingId}&info=${infoParam}`);
      } else {
        navigate("/booking/failed?reason=payment_failed");
      }
      
      setIsProcessing(false);
    }, 2000);
  };
  
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading booking information...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to={`/booking/${service.id}/time?frequency=${bookingInfo.frequency}&address=${encodeURIComponent(JSON.stringify(bookingInfo.address))}`} className="text-gray-800">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">Payment</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="booking-progress mt-4 flex items-center">
          <div className="step-circle step-circle-completed">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="step-connector step-connector-active"></div>
          <div className="step-circle step-circle-completed">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="step-connector step-connector-active"></div>
          <div className="step-circle step-circle-active">3</div>
        </div>
      </header>
      
      <div className="p-4">
        {/* Price Summary */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <h3 className="font-medium mb-3">Price Summary</h3>
          
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{service.name}</span>
              <span>${priceInfo.basePrice}</span>
            </div>
            
            {priceInfo.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{bookingInfo.frequency} Discount ({priceInfo.discountPercent}%)</span>
                <span>-${priceInfo.discount}</span>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${priceInfo.total}</span>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Payment Method</h3>
          
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div 
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`
                  flex items-center p-3 bg-white rounded-xl border transition-colors cursor-pointer
                  ${selectedPayment === method.id 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200'
                  }
                `}
              >
                <div className="flex-shrink-0 mr-3">
                  <method.icon 
                    className={`h-6 w-6 ${selectedPayment === method.id ? 'text-teal-600' : 'text-gray-500'}`} 
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-xs text-gray-500">{method.description}</p>
                </div>
                
                {selectedPayment === method.id && (
                  <CheckCircle className="h-5 w-5 text-teal-600" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Booking Summary */}
        <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-medium mb-2">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frequency:</span>
              <span className="font-medium capitalize">{bookingInfo.frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">
                {bookingInfo.date}, {bookingInfo.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium truncate max-w-[180px]">
                {bookingInfo.address.street}, {bookingInfo.address.city}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl"
        >
          {isProcessing ? "Processing..." : `Pay $${priceInfo.total}`}
        </Button>
      </div>
    </div>
  );
};

export default BookingPayment;
