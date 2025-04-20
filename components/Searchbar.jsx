"use client";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { useAppContext } from "@/context/AppContext";

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { router } = useAppContext();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      if (query.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
      }
  
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data.results);
      setLoading(false);
    };
  
    const timeout = setTimeout(fetchResults, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);
  

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white z-50 border-b shadow p-4 w-full sm:w-[640px]">
      <div className="flex justify-between items-center mb-2">
        <input
          autoFocus
          type="text"
          className="w-full border px-4 py-2 rounded"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={onClose} className="ml-4 text-sm text-gray-600"><XIcon /></button>
      </div>
      {query === "" && <small className="text-gray-400">Enter a search term to begin searching.</small>}
      {loading && <Loading />}
        {!loading && results.length > 0 ? (
            <div className="mt-2 max-h-[350px] overflow-y-scroll sm:p-3 p-1 w-full">
            {results.map((item) => (
                <div key={item._id} onClick={() => { router.push('/product/' + item._id); scrollTo(0, 0) }} className="p-2 cursor-pointer border-b border-gray-100 flex items-center justify-between hover:bg-slate-100">
                <p>{item.name}</p>
                <Image src={item.image[0]} width={50} height={50} alt="image" className="border p-1" />
                </div>
            ))}
            </div>
            ) : query && !loading ? (
            <p className="text-sm text-gray-500">No results found</p>
            ) : null}
    </div>
  );
};

export default SearchBar;
