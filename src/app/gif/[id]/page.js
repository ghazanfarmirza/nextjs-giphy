"use client";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const id = useMemo(() => pathname.split("/").pop(), [pathname]);
  const { gif, status, error } = useGif(id);

  if (status === "loading")
    return <p className="text-center mt-20">Loading...</p>;
  if (status === "failed")
    return <p className="text-center mt-20">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full text-white py-4 flex justify-between items-center px-6">
        <button
          onClick={() => router.push("/")}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Back to Home
        </button>
      </header>
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-3xl font-bold mb-8">GIF Detail</h1>
        {gif && (
          <>
            <p className="text-xl mb-4">{gif.data.title}</p>
            <Gif gif={gif.data} width={500} />
          </>
        )}
      </div>
    </div>
  );
}
