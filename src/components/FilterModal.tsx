import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Slider } from "@/components/ui/slider";

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  // Filter state
  const [priceRange, setPriceRange] = useState([50, 1000]);
  const [rooms, setRooms] = useState({ bedrooms: 0, beds: 0, bathrooms: 0 });
  const [propertyType, setPropertyType] = useState("");
  const [amenities, setAmenities] = useState([]);

  // Property types
  const propertyTypes = [
    "House",
    "Apartment",
    "Guesthouse",
    "Hotel",
    "Villa",
    "Cabin",
  ];

  // Available amenities
  const availableAmenities = [
    { id: "wifi", label: "Wifi" },
    { id: "kitchen", label: "Kitchen" },
    { id: "washer", label: "Washer" },
    { id: "dryer", label: "Dryer" },
    { id: "ac", label: "Air conditioning" },
    { id: "heating", label: "Heating" },
    { id: "pool", label: "Pool" },
    { id: "hottub", label: "Hot tub" },
    { id: "gym", label: "Gym" },
    { id: "tv", label: "TV" },
    { id: "parking", label: "Free parking" },
    { id: "workspace", label: "Dedicated workspace" },
  ];

  // Counter component for rooms
  const Counter = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between py-4">
      <span className="text-gray-900">{label}</span>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const handleAmenityToggle = (amenityId) => {
    setAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId],
    );
  };

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      rooms,
      propertyType,
      amenities,
    });
    onClose();
  };

  const handleClear = () => {
    setPriceRange([50, 1000]);
    setRooms({ bedrooms: 0, beds: 0, bathrooms: 0 });
    setPropertyType("");
    setAmenities([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between border-b pb-4">
            <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}></Button>
          </div>
        </DialogHeader>

        {/* Price Range */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-6">Price range</h3>
          <Slider
            defaultValue={priceRange}
            min={0}
            max={2000}
            step={10}
            onValueChange={setPriceRange}
            className="w-full"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Min price:</span>
              <span className="font-semibold">${priceRange[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Max price:</span>
              <span className="font-semibold">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rooms and Beds */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-4">Rooms and beds</h3>
          <Counter
            label="Bedrooms"
            value={rooms.bedrooms}
            onChange={(value) =>
              setRooms((prev) => ({ ...prev, bedrooms: value }))
            }
          />
          <Counter
            label="Beds"
            value={rooms.beds}
            onChange={(value) => setRooms((prev) => ({ ...prev, beds: value }))}
          />
          <Counter
            label="Bathrooms"
            value={rooms.bathrooms}
            onChange={(value) =>
              setRooms((prev) => ({ ...prev, bathrooms: value }))
            }
          />
        </div>

        {/* Property Type */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-4">Property type</h3>
          <div className="grid grid-cols-2 gap-4">
            {propertyTypes.map((type) => (
              <Button
                key={type}
                variant={propertyType === type ? "default" : "outline"}
                className="w-full justify-start h-24 p-4"
                onClick={() => setPropertyType(type)}
              >
                <div className="text-left">
                  <div className="font-medium">{type}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableAmenities.map((amenity) => (
              <Button
                key={amenity.id}
                variant={amenities.includes(amenity.id) ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleAmenityToggle(amenity.id)}
              >
                {amenity.label}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <Button variant="ghost" className="underline" onClick={handleClear}>
            Clear all
          </Button>
          <Button onClick={handleApply}>
            Show {Math.floor(Math.random() * 500) + 100} places
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
