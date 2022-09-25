import axios from 'axios';

interface OSMLocationResponse {
  address: {
    city: string; //  'Antalya';
    country: string; //  'Turkey';
    country_code: string; // 'tr';
    postcode: string; // '07160';
    province: string; // 'Antalya';
    region: string; // 'Mediterranean Region';
    road: string; // 'Tekelioglu Caddesi';
    suburb: string; // 'Fener Mahallesi';
    town: string; // 'Muratpaşa';
  };
}

export const getUserCity = async (data: {
  latitude: number;
  longitude: number;
}): Promise<string | undefined> => {
  const { latitude, longitude } = data;

  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  const { data: resData } = await axios.get<OSMLocationResponse>(url);

  return resData?.address?.city;
};
