import { createBrowserRouter } from "react-router-dom";
import App from "./app";
import SearchPage from "./search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
]);

export default router;
