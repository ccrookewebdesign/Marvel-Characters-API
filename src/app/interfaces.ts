export interface MarvelResponse {
  code : number;
  status: string;
  attributionHTML: string;
  data: MarvelData;
}

export interface MarvelData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: [];
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  path: string;
  extension: string;
}