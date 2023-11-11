export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength="50"
            minLength="10"
            required
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg max-h-72"
            required
          ></textarea>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            maxLength="50"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" id="sell" className="w-5" />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parkingSpot"
                id="parkingSpot"
                className="w-5"
              />
              <label htmlFor="parkingSpot">Parking spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                min="1"
                max="20"
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                min="1"
                max="20"
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <input type="file" name="" id="" />
        </div>
      </form>
    </main>
  );
}
