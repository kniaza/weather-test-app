export interface SearchPlaceDataResponse {
  type: string;
  query: string[];
  features: FeaturesMapBox[];
  attribution: string[];
}

export interface FeaturesMapBox {
  id: string;
  place_name: string;
  text: string;
  type: string;
  place_type: string[];
  geometry: {
    coordinates: number[];
    type: string;
  };
}
