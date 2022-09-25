import axios from 'axios';
import { IGetRestaurants } from '../shared/interfaces/restaurant';

const BASE_URL = 'https://localhost:7002/restaurants';

export const getRestaurants = async (
  search?: string
): Promise<IGetRestaurants> => {
  const { data: resData } = await axios.get(BASE_URL, { params: { search } });

  return resData;
};
