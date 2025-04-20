
import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

const CITIES = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState("Los Angeles");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 bg-white text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
          <MapPin size={16} className="text-teal-600" />
          <span className="truncate max-w-[150px]">{selectedLocation}</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 rounded-2xl">
        <div className="py-2">
          <div className="px-3 py-2 text-sm font-medium text-gray-500">
            Select your location
          </div>
          <div className="max-h-64 overflow-y-auto">
            {CITIES.map((city) => (
              <button
                key={city}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                  selectedLocation === city ? "text-teal-600 font-medium" : "text-gray-700"
                }`}
                onClick={() => setSelectedLocation(city)}
              >
                <MapPin size={14} />
                {city}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
