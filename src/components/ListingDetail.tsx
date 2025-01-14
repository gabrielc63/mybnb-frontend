import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart,
  Share,
  Star,
  Award,
  Wifi,
  Car,
  Tv,
  Utensils,
  Coffee,
  MapPin,
  Calendar,
  ChevronDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useStore } from "../store/store";

const ListingDetail = () => {
  const { id } = useParams();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 5)),
  });
  const [guestCount, setGuestCount] = useState(1);

  // Example listing data
  const listing = {
    title: "Luxurious Beachfront Villa with Ocean Views",
    location: "Santa Cruz, California",
    host: {
      name: "Sarah",
      image: "/api/placeholder/64/64",
      isSuperhost: true,
      joinedDate: "2019",
    },
    rating: 4.97,
    reviews: 284,
    price: 350,
    description:
      "Experience the ultimate beachfront getaway in this stunning villa. Wake up to panoramic ocean views and fall asleep to the sound of waves. This newly renovated property offers modern luxury while maintaining its classic coastal charm.",
    amenities: [
      { icon: <Wifi />, name: "Fast wifi" },
      { icon: <Car />, name: "Free parking" },
      { icon: <Tv />, name: '65" HDTV' },
      { icon: <Utensils />, name: "Full kitchen" },
      { icon: <Coffee />, name: "Coffee maker" },
    ],
    photos: Array(6).fill("/api/placeholder/800/600"), // Placeholder images
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{listing.title}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Share
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Photo Gallery */}
        <div className="grid grid-cols-4 gap-4 rounded-xl overflow-hidden">
          <div className="col-span-2 row-span-2">
            <img
              src={listing.photos[0]}
              alt="Main view"
              className="h-full w-full object-cover"
            />
          </div>
          {listing.photos.slice(1, 5).map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo}
                alt={`View ${index + 2}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <Button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white text-black"
          >
            Show all photos
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="col-span-2">
            {/* Host Info */}
            <div className="flex items-center justify-between border-b pb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  Hosted by {listing.host.name}
                </h2>
                {listing.host.isSuperhost && (
                  <div className="flex items-center gap-2 mt-2">
                    <Award className="h-5 w-5 text-rose-500" />
                    <span>Superhost</span>
                  </div>
                )}
              </div>
              <img
                src={listing.host.image}
                alt={listing.host.name}
                className="h-16 w-16 rounded-full"
              />
            </div>

            {/* Key Features */}
            <div className="py-6 border-b">
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-600 leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="py-6 border-b">
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities
                  .slice(0, showAllAmenities ? undefined : 6)
                  .map((amenity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="text-gray-600">{amenity.icon}</div>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
              </div>
              {listing.amenities.length > 6 && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? "Show less" : "Show all amenities"}
                </Button>
              )}
            </div>

            {/* Calendar */}
            <div className="py-6 border-b">
              <h3 className="text-xl font-semibold mb-4">
                Select check-in date
              </h3>
              <CalendarComponent
                mode="range"
                selected={selectedDates}
                onSelect={setSelectedDates}
                className="rounded-md border"
              />
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="relative">
            <div className="sticky top-28 rounded-xl border p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-2xl font-semibold">
                    ${listing.price}
                  </span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{listing.rating}</span>
                  <span className="text-gray-600">
                    ({listing.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="border rounded-t-lg p-3">
                  <div className="text-xs font-semibold">CHECK-IN</div>
                  <div>{selectedDates.from?.toLocaleDateString()}</div>
                </div>
                <div className="border rounded-t-lg p-3">
                  <div className="text-xs font-semibold">CHECKOUT</div>
                  <div>{selectedDates.to?.toLocaleDateString()}</div>
                </div>
                <div className="col-span-2 border rounded-b-lg p-3">
                  <div className="text-xs font-semibold">GUESTS</div>
                  <div className="flex justify-between items-center">
                    <span>
                      {guestCount} guest{guestCount !== 1 ? "s" : ""}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg">
                Reserve
              </Button>

              <div className="mt-4">
                <div className="flex justify-between py-2">
                  <span>${listing.price} x 5 nights</span>
                  <span>${listing.price * 5}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Cleaning fee</span>
                  <span>$75</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Service fee</span>
                  <span>$125</span>
                </div>
                <div className="flex justify-between py-2 border-t mt-4 font-semibold">
                  <span>Total</span>
                  <span>${listing.price * 5 + 75 + 125}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-8 border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">Where you'll be</h3>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <MapPin className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-600">Map placeholder</span>
          </div>
        </div>
      </main>

      {/* Photo Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <Button
              onClick={() => setShowAllPhotos(false)}
              className="mb-4"
              variant="ghost"
            >
              × Close photos
            </Button>
            <div className="grid gap-4">
              {listing.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`View ${index + 1}`}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;
