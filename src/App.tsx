import React, { useEffect, useState } from "react";
import db from "./assets/firebase";
import AppHeader from "./components/header";
import UploadModal from "./components/upload";
import logo from "./logo.svg";
import { collection, getCount } from "firebase/firestore/lite";

const App = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [dataCount, setDataCount] = useState(0);

  useEffect(() => {
    countWards();
  }, []);

  const countWards = async () => {
    const coll = collection(db, "wards");
    const snapshot = await getCount(coll);
    console.log("count: ", snapshot.data().count);

    return setDataCount(snapshot.data().count);
  };

  if (!(window as any).cloudinary) {
    return <div className="py-80 text-gray-500">Loading...</div>;
  }

  return (
    <div className="">
      <AppHeader />
      <main className="py-14 sm:py-20 px-5 max-w-[1000px] mx-auto">
        <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl  font-bold text-center leading-tight">
          Upload & Search for <br /> polling unit election results
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-10 sm:mt-12 space-y-5 sm:space-y-0 sm:space-x-5">
          <div className="bg-gray-100 px-8 py-4 rounded-md text-gray-700">
            Uploaded Results: <b>{dataCount}</b>
          </div>
          <button className="bg-primary px-8 py-4 text-white rounded-md" onClick={() => setShowUpload(true)}>
            Upload a result 📄
          </button>
        </div>
      </main>
      <div className="w-full py-5 border-t border-gray-200 fixed bottom-0 bg-white px-6 sm:px-10">
        {" "}
        <span className="text-red-700 text-base font-medium block text-center">
          This website does not replace the original INEC results
        </span>
      </div>
      <UploadModal show={showUpload} toggle={setShowUpload} />
    </div>
  );
};

export default App;
