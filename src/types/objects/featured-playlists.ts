import { Externalurls, Image, ResponseObject, ResponseObjectItemCommons } from "./commons";

export interface FeaturedPlaylists {
  message: string;
  playlists: ResponseObject<FeaturedPlaylistItem>;
}

export interface FeaturedPlaylistItem extends ResponseObjectItemCommons {
  collaborative: boolean;
  description: string;
  external_urls: Externalurls;
  images: Image[];
  owner: Owner;
  primary_color?: null;
  public?: null;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

interface Tracks {
  href: string;
  total: number;
}

interface Owner {
  display_name: string;
  external_urls: Externalurls;
  href: string;
  id: string;
  type: string;
  uri: string;
}