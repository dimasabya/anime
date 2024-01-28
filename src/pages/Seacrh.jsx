import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import BookModal from "../featrures/book/BookModal";
import Searchs from "../featrures/search/Searchs";
import { useSelector } from "react-redux";
import { resultQuery } from "../featrures/search/searchSlice";

import { CircularProgress } from "@mui/material";

const Loading = ({ loadPersent }) => {
  const isLoading = loadPersent < 100;
  const maxLoadingTime = 50000; // Waktu maksimum dalam milidetik (5 detik dalam contoh ini)
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, maxLoadingTime);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="my-[4rem] w-full p-2">
      <div className=" text-center">
        {showLoading && isLoading && <p>Loading ...</p>}
        <CircularProgress variant="determinate" value={loadPersent} />
      </div>
    </div>
  );
};

function Search() {
  const [anime, setAnimes] = useState([]);
  const [isOpenModal, setOPenModal] = useState(false);
  const [loadPersent, setPersent] = useState(0);

  const query = useSelector(resultQuery);
  console.log(query.type);
  const getAnimesSearch = async (type, req) => {
    try {
      // const animes = await axios.get(`https://api.jikan.moe/v4/${type}?q=${req}`);
      const animes = await axios.get(`https://api.jikan.moe/v4/${type}?q=${req}`, {
        onDownloadProgress: (progressEvent) => {
          const loaded = progressEvent.loaded;
          const total = progressEvent.total;

          // Jika total tidak ada, kita tetapkan persentase menjadi 100%
          const progress = total ? Math.round((loaded / total) * 100) : 100;

          console.log("ProgressEvent:", progressEvent);
          console.log("Progress:", progress);

          setPersent(progress);
        },
      });
      const result = await animes.data.data;

      localStorage.setItem("anime-search", JSON.stringify(result));
      setAnimes(result);
    } catch (err) {
      console.error("gagal search", err);
    }
  };

  console.log(loadPersent);
  useEffect(() => {
    const getSearch = async () => {
      //   e.preventDefault();
      switch (query.type) {
        case "":
          await getAnimesSearch("anime", query.q);
          break;
        case "anime":
          await getAnimesSearch(query.type, query.q);
          break;
        case "manga":
          await getAnimesSearch(query.type, query.q);
          break;
      }
    };

    getSearch();
  }, [query]);

  const handleOpenModal = () => {
    setOPenModal(true);
  };
  const handleHideModal = () => {
    setOPenModal(false);
  };
  return (
    <>
      {isOpenModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleOpenModal} />
        <div className={`${anime.length > 0 ? "mb-6" : "mb-[16rem]"} mt-[8rem]`}>
          <Searchs />
        </div>
        {anime?.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 p-2 md:p-4">
              {anime?.map((anim, i) => (
                <NavLink to={`/populer/${query.type}/req?pop=${anim.mal_id}&type=search`} key={i}>
                  <div>
                    <img
                      src={anim.images.jpg.image_url}
                      alt=""
                      className="w-[125px] md:w-[200px] h-[135px] md:h-[200px]"
                    />
                    <p className="font-bold text-[.9rem] md:text-lg">{anim.title}</p>
                    <p className="text-[.55rem] md:text-[.85rem] text-gray-400">
                      <i className="fa-solid fa-star"></i> {anim.score}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <Loading loadPersent={loadPersent} />
        )}
        <Footer />
      </div>
    </>
  );
}

export default Search;
