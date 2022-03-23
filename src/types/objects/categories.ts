import { Image, ResponseObject, ResponseObjectItemCommons } from "./commons";

export interface CategoriesObject {
  categories: ResponseObject<CategoryItem>;
}

export interface CategoryItem extends ResponseObjectItemCommons {
  icons: Image[];
}