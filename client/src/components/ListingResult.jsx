import { Link } from "react-router-dom";
import { ListingItem } from "./ListingItem";

export default function ListingResult({
  listingType,
  listingTypeLength,
  title,
  searchQuery,
  showMore,
}) {
  return (
    listingType &&
    listingTypeLength > 0 && (
      <div className="">
        <div className="my-3">
          <h2 className="text-3xl font-semibold text-slate-600">{title}</h2>
          <Link
            to={`/search?${searchQuery}`}
            className="text-sm text-blue-800 hover:underline"
          >
            {showMore}
          </Link>
        </div>
        <div className="flex flex-wrap gap-4">
          {listingType.map((listing, index) => (
            <ListingItem listing={listing} key={index} />
          ))}
        </div>
      </div>
    )
  );
}
