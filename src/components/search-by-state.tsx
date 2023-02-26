import React from "react";
import states from "../assets/json/states.json";
import Modal from "./modal";
import { useNavigate } from "react-router-dom";

interface Props {
  show: boolean;
  toggle: (state: boolean) => void;
}

const SearchByStateModal: React.FC<Props> = ({ show, toggle }) => {
  const navigate = useNavigate();
  const searchByState = (state: number) => {
    navigate(`/state-search?state=${state}`);
  };

  return (
    <Modal {...{ show, toggle }}>
      <div className="mb-6 mt-5">
        {statesOptions.map((s) => (
          <button
            className="bg-gray-100 text-gray-700 font-medium text-sm px-4 py-3.5 flex items-center justify-between capitalize w-full mb-2.5 group"
            onClick={() => searchByState(s.value)}
          >
            {s.text}
            <svg width="20" viewBox="0 0 24 24" fill="none" className="text-gray-500 hidden group-hover:block">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.74 15.53L14.26 12L10.74 8.46997"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </Modal>
  );
};

const statesOptions = states.map((s) => {
  return {
    text: s.name,
    value: s.state_id,
  };
});

export default SearchByStateModal;
