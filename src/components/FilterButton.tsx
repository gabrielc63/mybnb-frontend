import React, { useState } from "react";
import FilterModal from "./FilterModal";
import { Button } from "@/components/ui/button";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = (filters) => {
    console.log("Applied filters:", filters);
    // Handle filter application logic here
  };

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Filters
      </Button>

      <FilterModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default FilterButton;
