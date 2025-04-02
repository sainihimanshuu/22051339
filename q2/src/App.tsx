import { NavLink, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="p-4">
      <nav className="mb-4 flex space-x-4">
        <NavLink
          to="/TopUsers"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-purple-600 border-b-2 border-purple-600"
              : "text-gray-700 hover:text-purple-500"
          }
        >
          Top Users
        </NavLink>
        <NavLink
          to="/TrendingPosts"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-purple-600 border-b-2 border-purple-600"
              : "text-gray-700 hover:text-purple-500"
          }
        >
          Trending Posts
        </NavLink>
        <NavLink
          to="/Feed"
          className={({ isActive }) =>
            isActive
              ? "font-bold text-purple-600 border-b-2 border-purple-600"
              : "text-gray-700 hover:text-purple-500"
          }
        >
          Live Feed
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default App;
