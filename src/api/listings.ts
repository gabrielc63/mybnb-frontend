import { Listing } from "@/types/listings";

export async function getListings({ queryKey }) {
  const response = await fetch("http://localhost:3000/api/v1/listings");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
