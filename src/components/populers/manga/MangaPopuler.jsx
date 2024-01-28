import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="w-full h-screen relative text-center bg-red-500">
      <div className="absolute top-0 left-0 bottom-0 right-0">
        <CircularProgress />
      </div>
    </div>
  );
};

const MangaPopuler = () => {
  const [mangas, setMangas] = useState([]);
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState(null);
  const [isLoad, setLoad] = useState(false);

  const getMangas = async () => {
    try {
      const favManga = await axios.get(
        `https://api.jikan.moe/v4/manga?order_by=favorites&order_by=popularity&page=${page}`
      );
      const result = await favManga.data.data;

      localStorage.setItem(`manga-${page}`, JSON.stringify(result));
      localStorage.setItem(`managa-time`, new Date().toISOString());

      if (page == 1) {
        setMangas(result);
        setLoad(true);
      }
    } catch (err) {
      console.error("Fetch manga error", err);
    }
  };

  useEffect(() => {
    const fetchManga = async () => {
      const getManga = localStorage.getItem(`manga-${page}`);
      const mangaTime = localStorage.getItem(`manga-time`);

      if (getManga && mangaTime) {
        const lastUpdate = new Date(mangaTime);
        const currentUpdate = new Date();

        const expiredTime = (currentUpdate - lastUpdate) / (1000 * 60);

        if (expiredTime < 60) {
          switch (page) {
            case 1:
              setMangas(JSON.parse(getManga));
              break;
          }
          setLoad(true);
        } else {
          await getMangas();
        }
      } else {
        await getMangas();
      }
    };

    fetchManga();

    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const handleInfo = (index) => {
    setActive(index);
  };

  const handleHidenInfo = () => {
    setActive(null);
  };
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center p-2 mb-4">
        <h1 className="md:text-5xl">Manga Populer</h1>
        <div className="inline-flex gap-8">
          <p>
            <i className="fa-solid fa-bars-staggered"></i> Populer
          </p>
          <p className="cursor-pointer relative">
            <i className="fa-solid fa-filter"></i> Filter
            {/* {filter === 1 && (
              <div className="bg-gray-800 absolute bottom-[-6.5rem] left-[-9rem] z-10 p-4 w-[200px]">
                <form action="">
                  <p>
                    <input type="checkbox" name="" id="" /> Alphabet
                  </p>
                  <p>Rank</p>
                  <p>Rating</p>
                </form>
              </div>
            )} */}
          </p>
        </div>
      </div>
      <h1 className="text-2xl ml-2">Popular</h1>
      {isLoad ? (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
          {mangas.map((manga, i) => (
            <NavLink key={i} to={`populer/req?id=${manga.mal_id}`}>
              <div className="p-2 relative" onMouseEnter={() => handleInfo(i)} onMouseLeave={() => handleHidenInfo()}>
                <img
                  src={manga.images.jpg.image_url}
                  alt=""
                  className="w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
                />
                <h3 className="mt-2 text-[.75rem] md:text-lg">{manga.title.substring(0, 25)}</h3>
                {active === i && (
                  <div className="bg-gray-500 opacity-[.95] absolute top-0 bottom-0 left-0 right-0 text-start p-2 rounded-lg">
                    <div className="">
                      <div>
                        <h3 className="font-bold md:mb-2 text-[.9rem] md:text-lg">{manga.title.substring(0, 25)}</h3>
                        <p className="text-[.5rem] md:text-[.85rem]">
                          <i className="fa-solid fa-star"></i> {manga.score}{" "}
                          <i className="fa-solid fa-ranking-star"></i> {manga.rank}
                        </p>
                        <p className="text-[.5rem] md:text-[.85rem]">
                          <i className="fa-regular fa-file-lines"></i> {manga.chapters ? manga.chapters : 0} Chapters
                        </p>
                        <div className="inline-flex gap-2">
                          <p className="text-[.5rem] md:text-[.85rem] italic">{manga.status}</p>
                          <p className="text-[.5rem] md:text-[.85rem]">
                            <i className="fa-solid fa-calendar-days"></i> {manga.published.prop.from.year}
                          </p>
                        </div>
                        <p className="my-2 text-[.5rem] md:text-[.9em]">{manga?.synopsis?.substring(0, 100)}</p>
                      </div>
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <i className="fa-solid fa-play md:text-2xl"></i>
                        <i className="fa-solid fa-bookmark mx-8 md:text-2xl z-[99]"></i>
                        <i className="fa-solid fa-plus md:text-2xl"></i>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MangaPopuler;
