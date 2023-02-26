interface Props {
  show: boolean;
  toggle: (state: boolean) => void;
  children?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ show, toggle, children }) => {
  return (
    <>
      <div
        className={`bg-black bg-opacity-70 fixed top-0 left-0 bottom-0 right-0 z-9999 modal transition-opacity duration-300 flex flex-col items-center py-24 sm:py-30 z-[999] ${
          show ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white w-11/12 mx-auto max-w-md rounded-xl pt-8 px-6 sm:pt-10 sm:px-8 transform duration-500 delay-200 origin-bottom transition-all max-h-[80vh] overflow-y-auto ${
            show ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10"
          }`}
        >
          <div className="sticky top-0 w-full h-5 transform -translate-y-3 translate-x-2.5">
            <button
              className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center transition-colors duration-150 text-grey-text hover:text-black no-outline"
              onClick={() => toggle(false)}
            >
              <svg width="100%" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
