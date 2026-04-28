export type PropertyStatus = 'FOR SALE' | 'FOR RENT' | 'SHORT LET' | 'OFF-PLAN' | 'LAND FOR SALE';
export type PropertyType = 'duplex' | 'apartment' | 'penthouse' | 'land' | 'bungalow' | 'terrace' | 'commercial';
export type BlogCategory = 'Investment' | 'Legal Guide' | 'Diaspora' | 'Market News' | 'Lifestyle' | 'Tips';

export interface Property {
  id: number;
  title: string;
  price: number;
  price_period: string;
  location: string;
  location_key: string;
  status: PropertyStatus;
  property_type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  description: string;
  features: string[];
  amenities: { i: string; l: string }[];
  images: string[];
  tiktok_id: string;
  whatsapp_text: string;
  gradient: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  gradient: string;
  category: BlogCategory;
  read_time: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function formatPrice(price: number, period: string): string {
  return '₦' + price.toLocaleString('en-NG') + (period ? ' ' + period : '');
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Property, 'id' | 'created_at' | 'updated_at'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
