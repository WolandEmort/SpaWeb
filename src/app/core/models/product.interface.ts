export interface IProduct {
  //Унікальний ідентифікатор продукту
  id: number;

  //Назва продукту
  name: string;

  //Бренд-виробник
  brand: string;

  //Короткий опис або призначення продукту
  description: string;

  //Ціна продукту
  price: number;

  //Зображення продукту */
  imageUrl: string;

  //Тип продукту
  category: string;

  //Об'єм або вага продукту
  volume: string;

  //Наявність на складі
  inStock: boolean;

  //Хіт продажу(3 лаба)
  isBestseller?: boolean;
}
