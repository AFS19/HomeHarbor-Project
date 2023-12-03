import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const listingId = params.paramsId;
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
  }, []);

  return <div>{listing && listing.name}</div>;
}
