import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getRestaurant } from '../services/restaurants';
import { IGetRestaurant, IRestaurant } from '../shared/interfaces/restaurant';
import { IoArrowBackSharp } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/future/image';

const RestaurantPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (!id) {
      return;
    }

    refetch({ queryKey: ['restaurant', id] });
  }, [id]);

  const { data, isLoading, isFetching, refetch } = useQuery<
    IGetRestaurant,
    AxiosError
  >(['restaurant', id], () => getRestaurant(id as string), { enabled: false });

  const rData = data?.data as IRestaurant;

  return (
    <>
      <Head>
        <title>{isLoading ? 'Loading..' : rData?.name}</title>
        <meta name='description' content='Restaurant details' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto flex flex-col items-center justify-start min-h-screen p-4 pt-7'>
        {/* Page navigation */}
        <nav className='w-full'>
          <Link href='/'>
            <button className='btn btn-square btn-outline w-16'>
              <IoArrowBackSharp className='text-xl' />
            </button>
          </Link>
        </nav>

        {/* Restaurant details */}
        {isLoading || isFetching ? (
          <div>Loading</div>
        ) : (
          <>
            <h2 className='text-5xl font-bold'>{rData?.name}</h2>
            {/* Divider */}
            <div className='m-2'></div>

            <Image
              className='object-cover h-64 w-96'
              loader={() => rData.imageUrl}
              src={rData.imageUrl}
              alt='Restaurant photo'
              width={350}
              height={200}
              unoptimized
            />

            <div className='text-left'>
              <p className='text-xl text-gray-600'>
                {rData.city}, {rData.country}
              </p>
              <p className='text-gray-600'>
                {rData.street}, {rData.zipCode}
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default RestaurantPage;
