type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Attraction = {
  id: number;
  name: string;
  destinationName: string;
  productsCount: number;
  reviews: { combinedAverageRating: number; totalReviews: number };
  url: string;
};

type Destination = {
  id: number;
  name: string;
  parentDestinationName: string;
  url: string;
};

type SearchResults = {
  attractions?: { results: Attraction[]; totalCount: number };
  destinations?: { results: Destination[]; totalCount: number };
};
