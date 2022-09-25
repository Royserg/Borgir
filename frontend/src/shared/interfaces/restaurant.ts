export interface IRestaurant {
  id: string;
  name: string;
  imageUrl: string;
  city: string;
  country: string;
  street: string;
  zipCode: string;
}

export interface IGetRestaurants {
  items: IRestaurant[];
}
