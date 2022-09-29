import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useRef } from "react";
import { GiHamburger } from "react-icons/gi";
import { RiEmotionSadLine } from "react-icons/ri";
import { RestaurantCard } from "../components/restaurantCard";
import { useDebounce } from "../hooks/useDebounce";
import { getUserCity } from "../services/geolocation";
import { getRestaurants } from "../services/restaurants";
import { IGetRestaurants } from "../shared/interfaces/restaurant";
import { useRestaurantStore } from "../store/restaurant";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { searchTerm, setSearchTerm } = useRestaurantStore((state) => state);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isFetching, isError, error, refetch } = useQuery<
    IGetRestaurants,
    AxiosError
  >(["restaurants"], () => getRestaurants(debouncedSearchTerm), {
    enabled: !!debouncedSearchTerm,
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  const setSearchInputValue = (value: string) => {
    // @ts-ignore
    inputRef.current.value = value;
  };

  // Effect for getting user city (on initial render only)
  useEffect(() => {
    if (searchTerm) {
      setSearchInputValue(searchTerm);
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const {
            coords: { latitude, longitude },
          } = position;

          const city = await getUserCity({ latitude, longitude });
          if (city) {
            setSearchTerm(city);
            if (inputRef) {
              setSearchInputValue(city);
            }
          }
        });
      }
    }
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
  };

  const renderSearchResults = () => {
    if (isFetching) {
      return <div className="mt-8 text-2xl">Loading...</div>;
    }
    if (isError) {
      return <div className="mt-8 text-2xl">{error.message}</div>;
    }
    if (data?.items.length === 0 && searchTerm) {
      return (
        <h3 className="text-2xl mt-10 text-center w-1/2">
          <RiEmotionSadLine className="text-5xl mx-auto" />
          <br />
          No restaurants registered in the system for this search term
        </h3>
      );
    }
    if (data?.items) {
      return (
        <ul>
          {data.items.map((restaurant) => (
            <RestaurantCard key={restaurant.id} data={restaurant} />
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Borgir</title>
        <meta name="description" content="Burger recommendation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title line */}
        <GiHamburger className="text-7xl" />
        <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-gray-700 text-center mb-4">
          Find your next burger
        </h1>

        {/* Search input */}
        <div className="w-full flex justify-center">
          <input
            className="input input-bordered w-full max-w-lg input-lg mx-auto"
            ref={inputRef}
            type="text"
            placeholder="Type city, country or restaurant name"
            onChange={handleSearchChange}
          />
        </div>

        {/* Divider */}
        <div className="mb-3"></div>

        {/* Restaurant search results */}
        {renderSearchResults()}
      </main>
    </>
  );
};

export default Home;
