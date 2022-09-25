import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { GiHamburger } from 'react-icons/gi';
import { RiEmotionSadLine } from 'react-icons/ri';
import { RestaurantCard } from '../components/restaurantCard';
import { useDebounce } from '../hooks/useDebounce';
import { getUserCity } from '../services/geolocation';
import { getRestaurants } from '../services/restaurants';
import { IGetRestaurants, IRestaurant } from '../shared/interfaces/restaurant';

const Home: NextPage = () => {
  const [results, setResults] = useState<{ items: IRestaurant[] }>();
  const { isLoading, isError, isFetching, error, refetch } = useQuery<
    IGetRestaurants,
    AxiosError
  >(
    ['restaurants'],
    async () => {
      const data = await getRestaurants(searchTerm);
      setResults(data);
      return data;
    },
    { enabled: false }
  );

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch();
    } else {
      setResults({ items: [] });
    }
  }, [debouncedSearchTerm]);

  // Effect for getting user city
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {
          coords: { latitude, longitude },
        } = position;

        const city = await getUserCity({ latitude, longitude });
        if (city) {
          setSearchTerm(city);
          if (inputRef) {
            // @ts-ignore
            inputRef.current.value = city;
          }
        }
      });
    }
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  return (
    <>
      <Head>
        <title>Borgir</title>
        <meta name='description' content='Burger recommendation App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        <GiHamburger className='text-7xl' />
        <h1 className='text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 text-center mb-4'>
          Find your next burger
        </h1>

        {/* Search input */}
        <div className='w-full flex justify-center'>
          <input
            className='input input-bordered w-full max-w-lg input-lg mx-auto'
            ref={inputRef}
            type='text'
            placeholder='Type city, country or restaurant name'
            onChange={handleSearchChange}
          />
        </div>

        {/* Divider */}
        <div className='mb-3'></div>

        {results ? (
          <>
            {results.items?.length === 0 && searchTerm ? (
              <h3 className='text-2xl mt-10 text-center w-1/2'>
                <RiEmotionSadLine className='text-5xl mx-auto' />
                <br />
                No restaurants registered in the system for this search term
              </h3>
            ) : (
              <ul>
                {results.items.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} data={restaurant} />
                ))}
              </ul>
            )}
          </>
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : isLoading && !isFetching ? (
          <span>Not ready ...</span>
        ) : (
          <span>Loading...</span>
        )}
      </main>
    </>
  );
};

export default Home;
