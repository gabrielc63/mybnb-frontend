import { Card } from "./ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  dates: string;
  isGuestFavorite?: boolean;
}

export function PropertyCard({
  id,
  title,
  location,
  type,
  price,
  rating,
  image,
  dates,
  isGuestFavorite = false,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="group cursor-pointer">
      <div
        className="relative aspect-square overflow-hidden rounded-xl"
        onClick={() => navigate(`/listings/${id}`)}
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2"
        >
          <Heart
            className={`h-6 w-6 ${isFavorite ? "fill-red-500 stroke-red-500" : "stroke-white"}`}
          />
        </button>
        {isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-xs font-medium">
            Guest favorite
          </div>
        )}
      </div>

      <div className="mt-2">
        <div className="flex justify-between">
          <h3 className="font-medium">{location}</h3>
          <div className="flex items-center gap-1">
            <span>★</span>
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{type}</p>
        <p className="text-gray-500 text-sm">{dates}</p>
        <p className="mt-1">
          <span className="font-semibold">${price}</span>
          <span className="text-gray-500"> night</span>
        </p>
      </div>
    </div>
  );
}
