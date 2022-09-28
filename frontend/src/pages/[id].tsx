import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoArrowBackSharp } from "react-icons/io5";
import { getRestaurant } from "../services/restaurants";
import { IGetRestaurant, IRestaurant } from "../shared/interfaces/restaurant";

const RestaurantPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const { data, isLoading, isFetching, error } = useQuery<
    IGetRestaurant,
    AxiosError
  >(["restaurant", id], () => getRestaurant(id as string), { enabled: !!id });

  const rData = data?.data as IRestaurant;

  const renderContent = () => {
    if (!id || isLoading || isFetching) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h3>{error.response?.statusText}</h3>;
    }
    if (data) {
      return (
        <>
          <h2 className="text-5xl font-bold">{rData?.name}</h2>
          <div className="m-2"></div>

          <Image
            className="object-cover h-64 w-96"
            loader={() => rData.imageUrl}
            src={rData.imageUrl}
            alt="Restaurant photo"
            width={350}
            height={200}
            unoptimized
          />

          <div className="text-left">
            <p className="text-xl text-gray-600">
              {rData.city}, {rData.country}
            </p>
            <p className="text-gray-600">
              {rData.street}, {rData.zipCode}
            </p>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{rData?.name || "Loading..."}</title>
        <meta name="description" content="Restaurant details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Back to main page */}
      <PageNavigation />

      <main className="container mx-auto flex flex-col items-center justify-start min-h-screen p-4 pt-7">
        {renderContent()}
      </main>
    </>
  );
};

const PageNavigation = () => (
  <nav className="container mx-auto py-6">
    <Link href="/">
      <button className="btn btn-square btn-outline w-16">
        <IoArrowBackSharp className="text-xl" />
      </button>
    </Link>
  </nav>
);

export default RestaurantPage;
