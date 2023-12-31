import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  SwiperCore.use([Navigation]);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const listingId = params.listingId;
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-sm text-red-700">{error}</p>
      )}

      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed top-[13%] right-[3%] z-10 rounded-full border border-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:scale-90"
            title="Copy Link"
          >
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[19%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-bold text-xl text-black">
                Description -{" "}
              </span>
              {listing.description}
            </p>

            <ul className="flex gap-4 sm:gap-8 flex-wrap text-green-900 font-semibold text-sm">
              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaBed className="text-xl" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>

              <li className="flex gap-2 whitespace-nowrap">
                <FaBath className="text-base" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bath`
                  : `${listing.bathrooms} baths`}
              </li>

              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaParking className="text-xl" />
                {listing.parking ? "Parking spot" : "No parking"}
              </li>

              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaChair className="text-xl" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                hidden={contact}
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase p-3 mt-3 hover:scale-95 hover:opacity-90"
              >
                Contact landlord
              </button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
}
