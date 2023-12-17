import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingResult from "../components/ListingResult";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    fetchOfferListings();
  }, []);

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
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
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
        <ListingResult
          listingType={offerListings}
          listingTypeLength={offerListings.length}
          searchQuery="offer=true"
          title="Recent Offers"
          showMore="Show more offers"
        />

        {/* sale */}
        <ListingResult
          listingType={saleListings}
          listingTypeLength={saleListings.length}
          searchQuery="type=sale"
          title="Recent places for Sales"
          showMore="Show more places for Sales"
        />

        {/* rent */}
        <ListingResult
          listingType={rentListings}
          listingTypeLength={rentListings.length}
          searchQuery="type=rent"
          title="Recent places for Rents"
          showMore="Show more places for Rents"
        />
      </div>
    </div>
  );
}
