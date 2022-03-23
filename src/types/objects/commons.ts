export interface ResponseObject<ResponseObjectItem> {
  href: string;
  items: ResponseObjectItem[];
  limit: number;
  next?: string | null;
  offset: number;
  previous?: string | null;
  total: number;
}

export interface ResponseObjectItemCommons {
  href: string;
  id: string;
  name: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Externalurls {
  spotify: string;
}