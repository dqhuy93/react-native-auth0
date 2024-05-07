export interface CategoryItem {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: MealsRating;
}

export interface MealsRating {
  rate: number;
  count: number;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
