export interface SearchResponse {
  destinations: DestinationResults;
  attractions: AttractionResults;
}

export interface DestinationResults {
  totalCount: number;
  results: Destination[];
}

export interface Destination {
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
