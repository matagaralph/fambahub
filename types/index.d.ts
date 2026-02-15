interface Destination {
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

interface ProductImage {
  variants: ImageVariant[];
  isCover?: boolean;
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

interface Product {
  productCode: string;
  title: string;
  description?: string;
  images?: ProductImage[];
  reviews?: ProductReviews;
  duration?: ProductDuration;
  pricing?: ProductPricing;
  productUrl?: string;
}
