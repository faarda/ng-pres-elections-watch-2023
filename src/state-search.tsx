import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./components/header";
import states from "./assets/json/states.json";
import UploadModal from "./components/upload";
import supabase from "./assets/supabase";

interface Data {
  ward_code: string;
  ward: string;
  state: string;
  images: string[];
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const StateSearchPage = () => {
  let routeQuery = useQuery();
  const state = routeQuery.get("state");
  const [results, setResults] = useState<Data[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const stateName = useMemo(() => {
    return states.find((s) => s.state_id === Number(state))?.name;
  }, [state]);

  useEffect(() => {
    getResults();
  });

  const getResults = async () => {
    const { data, error } = await supabase.from("wards").select().eq("state", Number(state));

    if (error) return;

    setResults(data as Data[]);
  };

  return (
    <div>
      <AppHeader />
      <main className="py-14 sm:py-16 md:py-20 px-5 max-w-[1000px] mx-auto">
        <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold text-left leading-tight">
          Results for ward {stateName ? stateName : ""} state
        </h1>
        {results.length < 1 && (
          <div className="bg-gray-100 rounded-md text-red-700 text-sm px-5 py-3 mt-4">
            No results for this state uploaded yet:{" "}
            <b className="text-primary font-bold cursor-pointer" onClick={() => setShowUpload(true)}>
              Upload a result
            </b>
          </div>
        )}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-7 sm:mt-10">
            {results.map((r, _) =>
              r.images.map((img, index) => (
                <figure className="w-full bg-gray-100 rounded-lg p-3" key={`${_}${index}`}>
                  <span className="text-sm inline-flex bg-gray-700 text-white rounded-md py-1 px-2 mb-3">
                    Ward {r.ward}
                  </span>
                  <img src={img} className="w-full rounded-md" alt={`election result`} />
                </figure>
              ))
            )}
          </div>
        )}
      </main>
      <UploadModal show={showUpload} toggle={setShowUpload} />
    </div>
  );
};

export default StateSearchPage;
