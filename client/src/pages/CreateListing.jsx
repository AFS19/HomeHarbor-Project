export default function CreateListing() {
  return (
    <main>
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4">
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
        </div>
      </form>
    </main>
  );
}
