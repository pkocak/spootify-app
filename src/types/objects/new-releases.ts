import { Externalurls, Image, ResponseObject, ResponseObjectItemCommons } from "./commons";

export interface NewReleases {
  albums: ResponseObject<NewReleaseItem>;
}

export interface NewReleaseItem extends ResponseObjectItemCommons {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: Externalurls;
  images: Image[];
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface Artist {
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}