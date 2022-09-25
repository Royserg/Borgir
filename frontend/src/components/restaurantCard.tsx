import { IRestaurant } from '../shared/interfaces/restaurant';
import Image from 'next/future/image';
import Link from 'next/link';

type RestaurantCardProps = {
  data: IRestaurant;
};

export const RestaurantCard = ({
  data: { id, name, city, country, imageUrl, street, zipCode },
}: RestaurantCardProps) => {
  return (
    <div className='card lg:card-side bg-base-100 shadow-xl mb-1 border'>
      <figure>
        <Image
          className='object-cover h-64 w-96'
          loader={() => imageUrl}
          src={imageUrl}
          alt='Restaurant photo'
          width={250}
          height={200}
          unoptimized
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>

        <div className='text-sm text-gray-500 mb-auto'>
          <p>
            {city}, {country}
          </p>
          <p className='text-gray-400'>{street}</p>
        </div>

        <div className='card-actions justify-end'>
          <Link href={id}>
            <button className='btn btn-primary'>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
