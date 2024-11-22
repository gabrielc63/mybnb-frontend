import React, { useState } from "react";
import Header from "./Header";
import { PropertyCard } from "./PropertyCard";
import { Search, MapPin, Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Listings = () => {
  const [properties] = useState([
    {
      id: 1,
      title: "Oceanfront Villa",
      image: "/api/placeholder/400/400",
      price: 350,
      rating: 4.9,
      isGuestFavorite: true,
    },
    {
      id: 2,
      title: "Mountain Cabin",
      image: "/api/placeholder/400/400",
      price: 200,
      rating: 4.8,
      isGuestFavorite: false,
    },
    {
      id: 3,
      title: "Desert Oasis",
      image: "/api/placeholder/400/400",
      price: 275,
      rating: 4.95,
      isGuestFavorite: true,
    },
    {
      id: 4,
      title: "City Loft",
      image: "/api/placeholder/400/400",
      price: 150,
      rating: 4.7,
      isGuestFavorite: false,
    },
    {
      id: 5,
      title: "Lakeside Cottage",
      image: "/api/placeholder/400/400",
      price: 225,
      rating: 4.85,
      isGuestFavorite: true,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-20 pt-44 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.image}
              title={property.title}
              location="Santa Cruz, California"
              type="Beach and ocean views"
              price={property.price}
              rating={property.rating}
              dates="Dec 1-6"
              isGuestFavorite={property.isGuestFavorite}
            />
          ))}
        </div>
      </main>

      {/* Show Map Button */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
        <Button className="bg-gray-900 text-white rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="font-medium">Show map</span>
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Listings;
