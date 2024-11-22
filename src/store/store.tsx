import { create } from "zustand";

interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  image: string;
}

interface AirbnbStore {
  searchTerm: string;
  properties: Property[];
  setSearchTerm: (term: string) => void;
  filterProperties: () => void;
}

export const useStore = create<AirbnbStore>((set, get) => ({
  searchTerm: "",
  properties: [
    {
      id: 1,
      title: "Cozy Apartment in Downtown",
      type: "Apartment",
      price: 100,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Beachfront Villa",
      type: "House",
      price: 250,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Mountain Cabin Retreat",
      type: "Cabin",
      price: 150,
      rating: 4.2,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Modern Loft in the City",
      type: "Loft",
      price: 120,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterProperties: () => {
    const { searchTerm, properties } = get();
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    set({ properties: filtered });
  },
}));
