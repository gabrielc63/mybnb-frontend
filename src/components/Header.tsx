import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search, Globe, Menu, User } from "lucide-react";
import { useStore } from "../store/store";
import FilterButton from "./FilterButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Main Header */}
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-rose-500 text-2xl font-bold">airbnb</div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 border rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="border-r pr-4">Anywhere</div>
          <div className="border-r pr-4">Any week</div>
          <div className="pr-2">Add guests</div>
          <div className="bg-rose-500 p-2 rounded-full text-white">
            <Search className="h-4 w-4" />
          </div>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="rounded-full">
            Become a Host
          </Button>
          <Button variant="ghost" className="p-2 rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-8 py-3 flex items-center gap-4 overflow-x-auto border-t">
        {[
          "Beachfront",
          "Amazing pools",
          "Trending",
          "Rooms",
          "Mansions",
          "Amazing views",
          "Tiny homes",
          "Islands",
          "Historical homes",
        ].map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm"
          >
            {filter}
          </Button>
        ))}
        <Button className="flex items-center gap-2 rounded-full border px-4 py-2">
          <FilterButton className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </header>
  );
};

export default Header;
