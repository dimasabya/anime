import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

function Search() {
  const [colorBar, setColorBar] = useState(null);
  const location = useLocation();
  console.log(colorBar);

  function handleColorBar(type) {
    setColorBar(type);
  }

  useEffect(() => {
    handleColorBar(location.pathname);
  }, [location]);
  return (
    <div className="flex justify-evenly text-center my-2 p-2 w-full">
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={`border p-2 rounded-lg hover:bg-gray-500 ${colorBar === "/" && "bg-gray-400"}`}
          activeClassName="active-link"
        >
          Anime
        </NavLink>
        <NavLink
          to="/populer"
          className={`border p-2 rounded-lg ${colorBar === "/populer" && "bg-gray-400"} hover:bg-gray-500`}
        >
          Populer
        </NavLink>
        <NavLink
          to="/manga"
          className={`border p-2 rounded-lg hover:bg-gray-500 ${colorBar === "/manga" && "bg-gray-400"}`}
        >
          Manga
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

// function Search() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Option />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default Search;
