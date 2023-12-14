import { FaBath, FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ListingItem = ({ listing }) => {
  return (
    <div className="w-[30%] sm:[w-330px] bg-white shadow-xl hover:shadow-2xl transition-shadow duration-200 overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 shadow-xl"
        />
        <div className="flex flex-col gap-4 p-3">
          <p className="truncate text-lg text-slate-700 font-semibold">
            {listing.name}
          </p>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-700" />
            <p className="w-full text-lg text-slate-700 truncate">
              {listing.address}
            </p>
          </div>

          <p className="w-full text-lg text-slate-700 line-clamp-2">
            {listing.description}
          </p>

          <p className="text-xl text-slate-500 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            {listing.type === "rent" && "/ month"}
          </p>

          <ul className="flex gap-4 text-xl text-slate-700 font-semibold ">
            <li className="flex items-center justify-center gap-2">
              <FaBed className="text-xl" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </li>

            <li className="flex items-center justify-center gap-2">
              <FaBath className="text-xl " />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};
