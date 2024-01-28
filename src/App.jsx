// import axios from "axios";
// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Populer from "./pages/Populer";
import Search from "./pages/Seacrh";
import Manga from "./pages/Manga";
import About from "./pages/About";
// import Animes from "./components/Animes";
// import Baner from "./components/Baner";
// import Navbar from "./components/Navbar";
// import Search from "./components/Search";

function App() {
  // const [animes, setAnimes] = useState([]);

  // async function getAnimeList() {
  //   try {
  //     const response = await axios.get("https://api.jikan.moe/v4/anime");
  //     const datas = await response.data.data;
  //     setAnimes(datas);
  //   } catch (error) {
  //     console.error("Request gagal", error);
  //   }
  // }

  // useEffect(() => {
  //   getAnimeList();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/populer/*" element={<Populer />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manga/*" element={<Manga />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    // <div className="bg-blue-500 w-full p-4">
    //   <Navbar />
    //   <Baner />
    //   <Search />
    //   <Animes animes={animes} />
    // </div>
  );
}

export default App;
