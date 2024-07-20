"use client";

import { useEffect } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifs } from "../slices/gifsSlice";

const gf = new GiphyFetch("OCetE6FQQx2ImXPtEJGzES5il7mrbzl8");

export default function Home() {
  const dispatch = useDispatch();
  const gifs = useSelector((state) => state.gifs.gifs);
  const router = useRouter();
  const gifStatus = useSelector((state) => state.gifs.status);
  const error = useSelector((state) => state.gifs.error);

  const fetchMoreGifs = (offset) => gf.trending({ offset, limit: 10 });

  useEffect(() => {
    if (gifStatus === "idle") {
      dispatch(fetchGifs());
    }
  }, [gifStatus, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-8">Trending GIFs</h1>
      {gifStatus === "loading" && <p>Loading...</p>}
      {gifStatus === "failed" && <p>{error}</p>}
      {gifStatus === "succeeded" && (
        <Grid
          width={800}
          columns={5}
          gutter={5}
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
