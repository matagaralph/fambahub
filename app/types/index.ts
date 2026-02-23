export interface SearchResponse {
  destinations: DestinationResults;
  attractions: AttractionResults;
}

export interface DestinationResults {
  totalCount: number;
  results: SearchDestination[];
}

export interface SearchDestination {
  id: number;
  name: string;
  parentDestinationId: number;
  parentDestinationName: string;
  url: string;
}

export interface AttractionResults {
  totalCount: number;
  results: Attraction[];
}

export interface Attraction {
  id: number;
  name: string;
  primaryDestinationId: number;
  description: string;
  destinationName: string;
  productsCount: number;
  url: string;
}

export interface Destination {
  destinationId: number;
  name: string;
  type: string;
  parentDestinationId: number;
  lookupId: string;
  destinationUrl: string;
  defaultCurrencyCode: string;
  timeZone: string;
  countryCallingCode: string;
  languages: string[];
  center: {
    latitude: number;
    longitude: number;
  };
}

interface ImageVariant {
  height: number;
  width: number;
  url: string;
}

export interface ProductImage {
  variants: ImageVariant[];
  isCover?: boolean;
  caption?: string;
}

interface ProductPricing {
  summary?: { fromPrice?: number; fromPriceBeforeDiscount?: number };
  currency?: string;
}

interface ProductReviews {
  totalReviews?: number;
  combinedAverageRating?: number;
}

interface ProductDuration {
  fixedDurationInMinutes?: number;
}

export interface Product {
  productCode: string;
  title: string;
  description?: string;
  images?: ProductImage[];
  reviews?: ProductReviews;
  duration?: ProductDuration;
  pricing?: ProductPricing;
  productUrl?: string;
  flags?: string[];
}
