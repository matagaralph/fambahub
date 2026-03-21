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

export interface ImageVariant {
  height: number;
  width: number;
  url: string;
}

export interface ProductImage {
  variants: ImageVariant[];
  isCover?: boolean;
  caption?: string;
  imageSource?: string;
}

export interface ProductPricing {
  summary?: { fromPrice?: number; fromPriceBeforeDiscount?: number };
  currency?: string;
}

export interface ReviewCount {
  rating: number;
  count: number;
}

export interface ReviewSource {
  provider: string;
  reviewCounts: ReviewCount[];
  totalCount: number;
  averageRating: number;
}

export interface ProductReviews {
  totalReviews?: number;
  combinedAverageRating?: number;
  sources?: ReviewSource[];
  reviewCountTotals?: ReviewCount[];
}

export interface ProductDuration {
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
  destinations?: { ref: string; primary: boolean }[];
  flags?: string[];
}

export interface AgeBand {
  ageBand: string;
  startAge: number;
  endAge: number;
  minTravelersPerBooking: number;
  maxTravelersPerBooking: number;
}

export interface ProductInclusion {
  category: string;
  categoryDescription: string;
  type: string;
  typeDescription: string;
  description?: string;
  otherDescription?: string;
}

export interface CancellationRefundEligibility {
  dayRangeMin: number;
  dayRangeMax?: number;
  percentageRefundable: number;
}

export interface CancellationPolicy {
  type: string;
  description: string;
  cancelIfBadWeather?: boolean;
  cancelIfInsufficientTravelers?: boolean;
  refundEligibility?: CancellationRefundEligibility[];
}

export interface ItineraryItem {
  pointOfInterestLocation?: {
    location: { ref: string };
    attractionId?: number;
  };
  passByWithoutStopping?: boolean;
  admissionIncluded?: string;
  description: string;
}

export interface ProductOption {
  productOptionCode: string;
  description: string;
  title: string;
  languageGuides?: { type: string; language: string }[];
}

export interface ProductDetail extends Product {
  status?: string;
  language?: string;
  createdAt?: string;
  lastUpdatedAt?: string;
  ticketInfo?: {
    ticketTypes: string[];
    ticketTypeDescription: string;
    ticketsPerBooking: string;
    ticketsPerBookingDescription: string;
  };
  pricingInfo?: {
    type: string;
    ageBands: AgeBand[];
  };
  logistics?: {
    start: { location: { ref: string }; description: string }[];
    end: { location: { ref: string }; description: string }[];
    travelerPickup?: {
      pickupOptionType: string;
      allowCustomTravelerPickup: boolean;
    };
  };
  inclusions?: ProductInclusion[];
  exclusions?: ProductInclusion[];
  additionalInfo?: { type: string; description: string }[];
  cancellationPolicy?: CancellationPolicy;
  bookingRequirements?: {
    minTravelersPerBooking: number;
    maxTravelersPerBooking: number;
    requiresAdultForBooking: boolean;
  };
  languageGuides?: { type: string; language: string }[];
  itinerary?: {
    itineraryType: string;
    skipTheLine: boolean;
    privateTour: boolean;
    maxTravelersInSharedTour?: number;
    duration: ProductDuration;
    itineraryItems: ItineraryItem[];
  };
  productOptions?: ProductOption[];
  supplier?: { name: string; reference: string };
  bookingConfirmationSettings?: {
    bookingCutoffType: string;
    bookingCutoffInMinutes: number;
    confirmationType: string;
  };
  timeZone?: string;
}

export interface ProductSearchResponse {
  totalCount: number;
  products: Product[];
}
