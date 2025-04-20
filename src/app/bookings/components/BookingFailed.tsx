import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { XCircle, RefreshCw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/layout/BottomNavigation";

const BookingFailed = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorInfo, setErrorInfo] = useState<any>(null);
  
  useEffect(() => {
    // Get error info from URL
    const errorData = searchParams.get('error');
    
    if (errorData) {
      try {
        const parsedError = JSON.parse(decodeURIComponent(errorData));
        setErrorInfo(parsedError);
      } catch (e) {
        setErrorInfo({
          message: "Unknown error occurred",
          code: "UNKNOWN"
        });
      }
    } else {
      setErrorInfo({
        message: "Payment could not be processed",
        code: "PAYMENT_FAILED"
      });
    }
  }, [searchParams]);
  
  // Handler to retry booking
  const handleRetry = () => {
    const returnUrl = searchParams.get('returnUrl');
    
    if (returnUrl) {
      router.push(returnUrl);
    } else {
      router.back();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Failed Header */}
      <header className="bg-red-600 px-4 py-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white rounded-full p-3 mb-2">
            <XCircle size={40} className="text-red-600" />
          </div>
          <h1 className="text-white text-2xl font-semibold">Booking Failed</h1>
          <p className="text-white/90">{errorInfo?.message || "There was an issue with your booking"}</p>
        </div>
      </header>
      
      {/* Error Details */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-semibold mb-4">What Happened?</h2>
          
          <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-4">
            <p className="text-red-800">
              {errorInfo?.details || "We couldn't process your booking request. This could be due to a payment issue or a temporary system problem."}
            </p>
          </div>
          
          <h3 className="font-medium mb-2">What can you do?</h3>
          <ul className="space-y-2 text-gray-700 list-disc pl-5 mb-4">
            <li>Check your payment details and try again</li>
            <li>Try a different payment method</li>
            <li>Contact customer support if the issue persists</li>
          </ul>
          
          {errorInfo?.code && (
            <div className="text-sm text-gray-500">
              Error code: {errorInfo.code}
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="space-y-4">
          <Button onClick={handleRetry} className="w-full bg-red-600 hover:bg-red-700 flex gap-2 items-center justify-center">
            <RefreshCw size={18} />
            Try Again
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          
          <Button asChild variant="link" className="w-full">
            <a href="mailto:support@example.com">Contact Support</a>
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default BookingFailed;
