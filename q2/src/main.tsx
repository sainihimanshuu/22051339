import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import FeedPage from "./pages/FeedPage.tsx";
import TopUsersPage from "./pages/TopUsersPage.tsx";
import TrendingPostsPage from "./pages/TrendingPostsPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/Feed" element={<FeedPage />} />
      <Route path="/TopUsers" element={<TopUsersPage />} />
      <Route path="/TrendingPosts" element={<TrendingPostsPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
