"use client";

import { useEffect, useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useRouter } from "next/navigation";

const gf = new GiphyFetch("OCetE6FQQx2ImXPtEJGzES5il7mrbzl8");

export default function Home() {
  const [gifs, setGifs] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGifs = async () => {
      setStatus("loading");
      try {
        const { data } = await gf.trending({ limit: 10 });
        setGifs(data);
        debugger;
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchGifs();
  }, []);

  const fetchMoreGifs = (offset) => gf.trending({ offset, limit: 10 });

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold my-8">Trending GIFs</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <Grid
          width={800}
          columns={3}
          gutter={6}
          fetchGifs={fetchMoreGifs}
          initialGifs={gifs}
          onGifClick={(gif, e) => {
            e.preventDefault();
            router.push(`/gif/${gif.id}`);
          }}
        />
      )}
    </div>
  );
}
