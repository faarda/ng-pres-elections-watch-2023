import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SearchPage from "./search";
import StateSearchPage from "./state-search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/state-search",
    element: <StateSearchPage />,
  },
]);

export default router;
