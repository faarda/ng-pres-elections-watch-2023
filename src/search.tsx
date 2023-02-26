import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import AppHeader from "./components/header";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import db from "./assets/firebase";
import states from "./assets/json/states.json";
import UploadModal from "./components/upload";
// import lgas from "./assets/json/lgas.json";

interface Data {
  ward_code: string;
  images: string[];
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchPage = () => {
  let routeQuery = useQuery();
  const lga = routeQuery.get("lga");
  const state = routeQuery.get("state");
  const ward = routeQuery.get("ward");
  const [results, setResults] = useState<Data[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const stateName = useMemo(() => {
    return states.find((s) => s.state_id === Number(state))?.name;
  }, [state]);

  // const lgaName = useMemo(() => {
  //   return lgas.find((l) => l.lga_id === Number(lga))?.name;
  // }, [lga]);

  useEffect(() => {
    getResults();
  });

  const getResults = async () => {
    const q = query(collection(db, "wards"), where("ward_code", "==", `${state}-${lga}-${ward}`));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setResults((r) => [...r, doc.data() as Data]);
    });
  };

  return (
    <div>
      <AppHeader />
      <main className="py-14 sm:py-16 md:py-20 px-5 max-w-[1000px] mx-auto">
        <h1 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold text-left leading-tight">
          Results for ward {ward ? ward : ""}, {stateName ? stateName : ""} state
        </h1>
        {results.length < 1 && (
          <div className="bg-gray-100 rounded-md text-red-700 text-sm px-5 py-3 mt-4">
            No results for this ward uploaded yet:{" "}
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
                  <img src={img} className="w-full rounded-md" alt={`Ward ${ward} election result`} />
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

export default SearchPage;
