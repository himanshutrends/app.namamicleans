
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Filter, Package, Car, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { subscriptions, getBookingsBySubscriptionId, bookings } from "@/data/bookings";
import { getSubscriptionPlansForService } from "@/data/services";
import { services } from "@/data/services";
import { Booking, Subscription } from "@/data/models";

const SubscriptionCard = ({ subscription }: { subscription: Subscription }) => {
  const subscriptionPlanId = subscription.planId;
  const planParts = subscriptionPlanId.split("-");
  const serviceId = planParts.slice(0, planParts.length - 1).join("-");
  const service = services.find(s => s.id === serviceId);
  const plans = getSubscriptionPlansForService(serviceId);
  const plan = plans.find(p => p.id === subscriptionPlanId);
  
  const subscriptionBookings = getBookingsBySubscriptionId(subscription.id);
  const upcomingBookings = subscriptionBookings.filter(b => b.status === "upcoming");
  const completedBookings = subscriptionBookings.filter(b => b.status === "completed");
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{service?.name || "Service"}</h3>
          <div className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
            {subscription.status.toUpperCase()}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1 mb-1">
            <Package size={14} className="text-teal-600" />
            <span>{plan?.planTypeName || "Subscription"}</span>
            <span className="mx-1">•</span>
            <span>{subscription.subscription_id}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-teal-600" />
            <span>Valid: {subscription.start_date} to {subscription.end_date}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-1">
            <Car size={14} className="text-teal-600" />
            <span>Vehicle: {subscription.vehicle_number}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg">
          <div>
            <span className="text-gray-600">Total visits:</span>
            <span className="font-medium ml-1">{subscription.total_visits}</span>
          </div>
          <div>
            <span className="text-gray-600">Used:</span>
            <span className="font-medium ml-1">{subscription.visits_used}</span>
          </div>
          <div>
            <span className="text-gray-600">Remaining:</span>
            <span className="font-medium ml-1">{subscription.total_visits - subscription.visits_used}</span>
          </div>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="border-t border-gray-100">
        <AccordionItem value="bookings" className="border-b-0">
          <AccordionTrigger className="px-4 py-2 text-sm hover:no-underline">
            View Bookings ({subscriptionBookings.length})
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-1">
            {subscriptionBookings.length > 0 ? (
              <div className="space-y-1">
                {upcomingBookings.length > 0 && (
                  <div className="px-4 mb-2">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">UPCOMING</h4>
                    {upcomingBookings.map(booking => (
                      <BookingItem key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
                
                {completedBookings.length > 0 && (
                  <div className="px-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-1">COMPLETED</h4>
                    {completedBookings.map(booking => (
                      <BookingItem key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">
                No bookings for this subscription
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const BookingItem = ({ booking }: { booking: Booking }) => {
  return (
    <Link to={`/bookings/${booking.id}`} className="block">
      <div className="border border-gray-100 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm font-medium">Visit #{booking.visit_number}</div>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar size={12} className="mr-1" />
              <span>{booking.date}</span>
              <span className="mx-1">•</span>
              <Clock size={12} className="mr-1" />
              <span>{booking.time}</span>
            </div>
          </div>
          
          <div className={`
            px-2 py-0.5 rounded-full text-xs font-medium
            ${booking.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : ''}
            ${booking.status === 'ongoing' ? 'bg-amber-100 text-amber-700' : ''}
            ${booking.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
            ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
          `}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center mt-2 gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img 
              src={booking.captainImage} 
              alt={booking.captainName} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-600">{booking.captainName}</span>
        </div>
      </div>
    </Link>
  );
};

const Bookings = () => {
  const [userSubscriptions, setUserSubscriptions] = useState<Subscription[]>([]);
  const [activeTab, setActiveTab] = useState<string>("subscriptions");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate API call
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        setUserSubscriptions(subscriptions);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);
  
  const activeSubscriptions = userSubscriptions.filter(sub => sub.status === "active");
  const inactiveSubscriptions = userSubscriptions.filter(sub => sub.status !== "active");
  
  const allBookings = bookings;
  const upcomingBookings = allBookings.filter(booking => booking.status === "upcoming");
  const completedBookings = allBookings.filter(booking => booking.status === "completed");
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-semibold">My Bookings</h1>
      </header>
      
      {/* Bookings Tabs */}
      <div className="px-4 pt-4">
        <Tabs defaultValue="subscriptions" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="subscriptions" className="text-xs">Subscriptions</TabsTrigger>
              <TabsTrigger value="bookings" className="text-xs">All Bookings</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
              <Filter size={16} />
            </Button>
          </div>
          
          <TabsContent value="subscriptions" className="mt-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
                <p className="mt-4 text-gray-500">Loading your subscriptions...</p>
              </div>
            ) : activeSubscriptions.length > 0 ? (
              <div className="pb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Active Subscriptions</h3>
                {activeSubscriptions.map((subscription) => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
                
                {inactiveSubscriptions.length > 0 && (
                  <>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 mt-6">Past Subscriptions</h3>
                    {inactiveSubscriptions.map((subscription) => (
                      <SubscriptionCard key={subscription.id} subscription={subscription} />
                    ))}
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-gray-400" size={24} />
                </div>
                <h3 className="text-gray-800 font-medium">No subscriptions found</h3>
                <p className="text-gray-500 mt-1">You haven't subscribed to any services yet</p>
                <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
                  <Link to="/">Browse Services</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
                <p className="mt-4 text-gray-500">Loading your bookings...</p>
              </div>
            ) : allBookings.length > 0 ? (
              <div className="pb-4">
                {upcomingBookings.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Upcoming Bookings</h3>
                    {upcomingBookings.map(booking => (
                      <Link to={`/bookings/${booking.id}`} key={booking.id} className="block">
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                              <img 
                                src={booking.captainImage} 
                                alt={booking.captainName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">Visit #{booking.visit_number}</h4>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Calendar size={12} />
                                    <span>{booking.date}</span>
                                    <span className="mx-1">•</span>
                                    <Clock size={12} />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                                
                                <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                  Upcoming
                                </div>
                              </div>
                              
                              <div className="mt-2 text-sm text-gray-600 line-clamp-1">
                                {booking.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                
                {completedBookings.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Completed Bookings</h3>
                    {completedBookings.map(booking => (
                      <Link to={`/bookings/${booking.id}`} key={booking.id} className="block">
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                              <img 
                                src={booking.captainImage} 
                                alt={booking.captainName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">Visit #{booking.visit_number}</h4>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <Calendar size={12} />
                                    <span>{booking.date}</span>
                                    <span className="mx-1">•</span>
                                    <Clock size={12} />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                                
                                <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                  Completed
                                </div>
                              </div>
                              
                              <div className="mt-2 text-sm text-gray-600 line-clamp-1">
                                {booking.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-gray-400" size={24} />
                </div>
                <h3 className="text-gray-800 font-medium">No bookings found</h3>
                <p className="text-gray-500 mt-1">You haven't made any bookings yet</p>
                <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
                  <Link to="/">Book Now</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Bookings;
