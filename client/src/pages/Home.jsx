import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ListingItem } from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    fetchOfferListings();
  }, []);

  console.log(saleListings);

  const fetchOfferListings = async () => {
    try {
      const res = await fetch(`/api/listing/get?offer=true&limit=4`);
      const data = await res.json();
      setOfferListings(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch(`/api/listing/get?type=sale&limit=4`);
      const data = await res.json();
      setSaleListings(data);
      fetchRentListings();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchRentListings = async () => {
    try {
      const res = await fetch(`/api/listing/get?type=rent&limit=4`);
      const data = await res.json();
      setRentListings(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      {/*Hero*/}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 text-3xl lg:text-6xl font-bold">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="">
          <p className="text-gray-400 text-xs sm:text-sm">
            Home Harbor is the best place to find your next perfect place to
            live
            <br />
            We have a wide range of properties for you to choice from.
          </p>
        </div>
        <div>
          <Link
            to="/search"
            className="text-blue-500 text-xl sm:text-sm font-bold hover:underline"
          >
            Let's get started...
          </Link>
        </div>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `green center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[450px] md:h-[600px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {/* offer */}
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-3xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                to={`/search?offer=true`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing, index) => (
                <ListingItem listing={listing} key={index} />
              ))}
            </div>
          </div>
        )}

        {/* sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-3xl font-semibold text-slate-600">
                Recent places for Sales
              </h2>
              <Link
                to={`/search?type=sale`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sales
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing, index) => (
                <ListingItem listing={listing} key={index} />
              ))}
            </div>
          </div>
        )}

        {/* rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-3xl font-semibold text-slate-600">
                Recent places for Rents
              </h2>
              <Link
                to={`/search?type=rent`}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for rents
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing, index) => (
                <ListingItem listing={listing} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
