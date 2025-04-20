
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Home, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/services";
import VehicleSelector from "@/components/booking/VehicleSelector";

// Sample saved addresses
const savedAddresses = [
  {
    id: "addr1",
    name: "Home",
    street: "123 Main St, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true
  },
  {
    id: "addr2",
    name: "Office",
    street: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    isDefault: false
  }
];

interface Vehicle {
  vehicle_number: string;
  vehicle_type: string;
  vehicle_model: string;
}

const BookingAddress = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("planId") || "";
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [service, setService] = useState<any>(null);
  const [addressType, setAddressType] = useState<string>("saved");
  const [selectedAddress, setSelectedAddress] = useState<string>(savedAddresses[0].id);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [vehicle, setVehicle] = useState<Vehicle>({
    vehicle_number: "",
    vehicle_type: "",
    vehicle_model: ""
  });
  
  useEffect(() => {
    // Get service details
    if (id) {
      const serviceDetails = services.find(s => s.id === id);
      if (serviceDetails) {
        setService(serviceDetails);
      }
    }
  }, [id]);
  
  const handleAddressTypeChange = (value: string) => {
    setAddressType(value);
  };
  
  const handleSavedAddressChange = (value: string) => {
    setSelectedAddress(value);
  };
  
  const handleNewAddressChange = (field: string, value: string) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleVehicleChange = (vehicleData: Vehicle) => {
    setVehicle(vehicleData);
  };
  
  const handleContinue = () => {
    let addressData;
    
    if (addressType === "saved") {
      addressData = savedAddresses.find(addr => addr.id === selectedAddress);
    } else {
      addressData = newAddress;
    }
    
    // Encode address and vehicle data
    const bookingData = {
      serviceId: id,
      planId: planId,
      address: addressData,
      vehicle: vehicle
    };
    
    navigate(`/booking/${id}/time?planId=${planId}&info=${encodeURIComponent(JSON.stringify(bookingData))}`);
  };
  
  const isFormValid = () => {
    if (addressType === "saved") {
      return selectedAddress && vehicle.vehicle_number && vehicle.vehicle_type && vehicle.vehicle_model;
    } else {
      return newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode && 
             vehicle.vehicle_number && vehicle.vehicle_type && vehicle.vehicle_model;
    }
  };
  
  if (!service) {
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
          <Link to={`/service/${id}`} className="text-gray-800">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-semibold">Enter Address</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="booking-progress mt-4 flex items-center">
          <div className="step-circle step-circle-active">1</div>
          <div className="step-connector"></div>
          <div className="step-circle">2</div>
          <div className="step-connector"></div>
          <div className="step-circle">3</div>
        </div>
      </header>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">{service.name}</h2>
          <p className="text-sm text-gray-600">Please provide your service address</p>
        </div>
        
        {/* Address Type Selection */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <RadioGroup value={addressType} onValueChange={handleAddressTypeChange} className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="saved" id="saved" />
              <Label htmlFor="saved" className="font-medium cursor-pointer">Use Saved Address</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new" className="font-medium cursor-pointer">Enter New Address</Label>
            </div>
          </RadioGroup>
          
          {/* Saved Addresses */}
          {addressType === "saved" && (
            <div className="space-y-3">
              <RadioGroup value={selectedAddress} onValueChange={handleSavedAddressChange}>
                {savedAddresses.map(address => (
                  <div 
                    key={address.id}
                    className={`border rounded-lg p-3 ${
                      selectedAddress === address.id ? 'border-teal-600 bg-teal-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start">
                      <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                      <Label htmlFor={address.id} className="flex-1 ml-2 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-2">
                            {address.name === "Home" ? (
                              <Home size={14} className="text-teal-700" />
                            ) : (
                              <Building size={14} className="text-teal-700" />
                            )}
                          </div>
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 ml-8 mt-1">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {/* New Address Form */}
          {addressType === "new" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="House/Apt number, Street name"
                  value={newAddress.street}
                  onChange={(e) => handleNewAddressChange("street", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => handleNewAddressChange("city", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => handleNewAddressChange("state", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="ZIP Code"
                    value={newAddress.zipCode}
                    onChange={(e) => handleNewAddressChange("zipCode", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special instructions for finding your location"
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Vehicle Information */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <VehicleSelector onVehicleSelect={handleVehicleChange} />
        </div>
        
        <Button 
          onClick={handleContinue}
          disabled={!isFormValid()}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BookingAddress;
