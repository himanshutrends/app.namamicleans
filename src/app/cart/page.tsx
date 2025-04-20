"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/layout/BottomNavigation";

// Mock cart data
const initialCartItems = [
  {
    id: "item1",
    serviceId: "service1",
    name: "Deep House Cleaning",
    image: "/lovable-uploads/08d6a86e-521a-4825-a80d-9a710adba49d.png",
    price: 89.99,
    frequency: "once",
    quantity: 1
  },
  {
    id: "item2",
    serviceId: "service2",
    name: "Carpet Cleaning",
    image: "/lovable-uploads/6e5146ef-4d43-4e61-8d34-38df78d306a6.png",
    price: 49.99,
    frequency: "once",
    quantity: 1
  }
];

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate API call to fetch cart
    const fetchCart = () => {
      setIsLoading(true);
      setTimeout(() => {
        setCartItems(initialCartItems);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchCart();
  }, []);
  
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? {...item, quantity: newQuantity} : item
      )
    );
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };
  
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const handleCheckout = () => {
    // In a real app, this would start the booking flow for each item
    // For simplicity, we'll just navigate to the booking page for the first item
    if (cartItems.length > 0) {
      router.push(`/booking/${cartItems[0].serviceId}?frequency=${cartItems[0].frequency}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-800">
              <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">My Cart</h1>
          <span className="text-gray-500 text-sm ml-auto">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>
      </header>
      
      {/* Cart Content */}
      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 text-center">Looks like you haven't added any services to your cart yet</p>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/">
               Browse Services
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-3">
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 capitalize mb-2">
                        Frequency: {item.frequency}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm flex items-center gap-1 mt-1"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < cartItems.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Price Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <h3 className="font-medium mb-3">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>$0.00</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-teal-600">${getSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Checkout Button */}
            <Button 
              onClick={handleCheckout}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Cart;
