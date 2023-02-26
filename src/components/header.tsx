import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Modal from "./modal";
import Search from "./search";

const AppHeader = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="bg-primary w-full flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5 sticky top-0">
        <NavLink to="/" className="text-white text-base sm:text-lg font-bold">
          Elections Watch 👁️
        </NavLink>
        <button
          className="px-4 sm:px-5 text-sm text-black-700 rounded-md bg-white py-2.5 font-semibold"
          onClick={() => setShowSearch(true)}
        >
          Search Results
        </button>
      </header>
      <Modal show={showSearch} toggle={setShowSearch}>
        <Search />
      </Modal>
    </>
  );
};

export default AppHeader;
