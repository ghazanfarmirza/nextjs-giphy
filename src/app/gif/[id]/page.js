"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";

const gf = new GiphyFetch("OCetE6FQQx2ImXPtEJGzES5il7mrbzl8");

// Custom hook for fetching a GIF
const useGif = (id) => {
  const [gif, setGif] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchGif = async () => {
      setStatus("loading");
      try {
        const data = await gf.gif(id);
        setGif(data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchGif();
  }, [id]);

  return { gif, status, error };
};

export default function GifDetail() {
  const pathname = usePathname();
  const id = useMemo(() => pathname.split("/").pop(), [pathname]);
  const { gif, status, error } = useGif(id);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
 
  return (
    <div className="min-h-screen flex flex-col items-center mt-5">
      <h1 className="text-2xl font-bold">GIF Detail</h1>
      {gif && gif.data.title}
      {gif && <Gif gif={gif.data} width={500} />}
    </div>
  );
}
