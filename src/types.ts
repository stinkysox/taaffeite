// Theme
export type Theme = "light" | "dark";

// Gallery Categories
export type GalleryCategory =
  | "Weddings"
  | "Haldi/Mehandi"
  | "Proposal"
  | "Reception"
  | "Other";

// Gallery Item
export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  imageUrl: string;
  title: string;
  description: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  event: GalleryCategory;
  quote: string;
  imageUrl: string;
}
