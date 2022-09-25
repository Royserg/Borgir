import type { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { GiHamburger } from 'react-icons/gi';
import { getUserCity } from '../services/geolocation';
import { debounce } from 'lodash';

const Home: NextPage = () => {
  // const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const fetchRestaurants = (search: string) => {
    console.log('SEARCH STRING??', search);
  };

  // Get user city
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {
          coords: { latitude, longitude },
        } = position;

        const city = await getUserCity({ latitude, longitude });
        if (city) {
          fetchRestaurants(city);
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
    fetchRestaurants(searchValue);
  };

  const debouncedSearchChange = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel();
    };
  });

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
            onChange={debouncedSearchChange}
          />
        </div>

        {/* <div className='grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3'>
          <RestaurantCard
            name='NextJS'
            description='The React framework for production'
            documentation='https://nextjs.org/'
          />
          <RestaurantCard
            name='TypeScript'
            description='Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale'
            documentation='https://www.typescriptlang.org/'
          />
          <RestaurantCard
            name='TailwindCSS'
            description='Rapidly build modern websites without ever leaving your HTML'
            documentation='https://tailwindcss.com/'
          />
          <RestaurantCard
            name='tRPC'
            description='End-to-end typesafe APIs made easy'
            documentation='https://trpc.io/'
          />
          <RestaurantCard
            name='Next-Auth'
            description='Authentication for Next.js'
            documentation='https://next-auth.js.org/'
          />
          <RestaurantCard
            name='Prisma'
            description='Build data-driven JavaScript & TypeScript apps in less time'
            documentation='https://www.prisma.io/docs/'
          />
        </div> */}
      </main>
    </>
  );
};

export default Home;

type RestaurantCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const RestaurantCard = ({
  name,
  description,
  documentation,
}: RestaurantCardProps) => {
  return (
    <section className='flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105'>
      <h2 className='text-lg text-gray-700'>{name}</h2>
      <p className='text-sm text-gray-600'>{description}</p>
      <a
        className='mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2'
        href={documentation}
        target='_blank'
        rel='noreferrer'
      >
        Documentation
      </a>
    </section>
  );
};
