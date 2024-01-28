import { Routes, Route } from "react-router-dom";

import AnimePopuler from "../components/populers/AnimePopuler";
import PopulerAnime from "../components/populers/PopulerAnime";
import TakeAnime from "../components/anime/TakeAnime";
import TakeManga from "../components/manga/TakeManga";

function Populer() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<AnimePopuler />} />
        <Route path="/anime" element={<PopulerAnime />} />
        <Route path="/anime/req" element={<TakeAnime />} />
        <Route path="/manga/req" element={<TakeManga />} />
      </Routes>
    </div>
  );
}

export default Populer;
