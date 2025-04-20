
import { useState } from "react";
import { Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleSelectorProps {
  onVehicleSelect: (vehicle: {
    vehicle_number: string;
    vehicle_type: string;
    vehicle_model: string;
  }) => void;
  defaultVehicle?: {
    vehicle_number: string;
    vehicle_type: string;
    vehicle_model: string;
  };
}

const vehicleTypes = [
  { id: "sedan", name: "Sedan" },
  { id: "suv", name: "SUV" },
  { id: "hatchback", name: "Hatchback" },
  { id: "pickup", name: "Pickup Truck" },
  { id: "minivan", name: "Minivan" },
];

const VehicleSelector = ({ onVehicleSelect, defaultVehicle }: VehicleSelectorProps) => {
  const [vehicle, setVehicle] = useState({
    vehicle_number: defaultVehicle?.vehicle_number || "",
    vehicle_type: defaultVehicle?.vehicle_type || "",
    vehicle_model: defaultVehicle?.vehicle_model || "",
  });

  const handleChange = (field: string, value: string) => {
    const updatedVehicle = {
      ...vehicle,
      [field]: value,
    };
    
    setVehicle(updatedVehicle);
    onVehicleSelect(updatedVehicle);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-teal-600 mb-2">
        <Car size={20} />
        <h3 className="font-medium">Vehicle Information</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="vehicle_number">Vehicle Number/License Plate</Label>
          <Input
            id="vehicle_number"
            placeholder="e.g., ABC-1234"
            value={vehicle.vehicle_number}
            onChange={(e) => handleChange("vehicle_number", e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="vehicle_type">Vehicle Type</Label>
          <Select
            value={vehicle.vehicle_type}
            onValueChange={(value) => handleChange("vehicle_type", value)}
          >
            <SelectTrigger id="vehicle_type" className="mt-1">
              <SelectValue placeholder="Select vehicle type" />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="vehicle_model">Vehicle Model</Label>
          <Input
            id="vehicle_model"
            placeholder="e.g., Toyota Camry"
            value={vehicle.vehicle_model}
            onChange={(e) => handleChange("vehicle_model", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;
