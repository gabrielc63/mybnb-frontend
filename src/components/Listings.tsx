import React, { useState } from "react";
import Header from "./Header";
import { PropertyCard } from "./PropertyCard";
import { Search, MapPin, Filter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListings } from "@/api/listings";

const Listings = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  if (isPending) return <h2>"Loading..."</h2>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-20 pt-44 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.data.map((property) => (
            <PropertyCard
              key={property.id}
              image={
                "https://a0.muscache.com/im/pictures/miso/Hosting-624602582936764924/original/f7625ee5-6e4c-4a91-868f-6544dee34107.jpeg?im_w=720&im_format=avif"
              }
              title={property.attributes.title}
              location="Santa Cruz, California"
              type="Beach and ocean views"
              price={property.attributes.price_per_night}
              rating={4.8}
              dates="Dec 1-6"
              isGuestFavorite={true}
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
