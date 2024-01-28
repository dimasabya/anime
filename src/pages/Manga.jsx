import { Route, Routes } from "react-router-dom";

import Mangas from "../components/populers/manga/Mangas";
import ParamManga from "../components/manga/ParamManga";

const Manga = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Mangas />} />
        <Route path="/populer/req" element={<ParamManga />} />
      </Routes>
    </div>
  );
};

export default Manga;
