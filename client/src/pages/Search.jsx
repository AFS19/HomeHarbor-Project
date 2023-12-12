export default function Search() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="font-semibold">Sort: </label>
            <select
              id="sort_order"
              className="w-40 h-12 rounded-lg p-3 bg-white"
            >
              <option value="1">Price high to low</option>
              <option value="2">Price low to high</option>
              <option value="3">Latest</option>
              <option value="4">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:scale-95 hover:opacity-90">
            Search
          </button>
        </form>
      </div>

      <div className="">
        <h1 className="text-3xl text-slate-700 font-semibold p-3 mt-3">
          Listing results:{" "}
        </h1>
      </div>
    </div>
  );
}
