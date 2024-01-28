import axios from "axios";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useLocation, Link, NavLink } from "react-router-dom";

function AnimeParam() {
  const [animeWeek, setAnimeWeek] = useState([]);
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(null);

  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const animeType = param.get("an");

  function handlePage() {
    setPage((prevPage) => prevPage + 1);
  }
  function minPage() {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  async function getAnimeListWeek(type, tahun, setDatas) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?order_by=popularity&start_date=${tahun}&page=${page}`
      );
      const datas = await response.data.data;

      localStorage.setItem(`populer-${type}-${tahun}`, JSON.stringify(datas));
      localStorage.setItem(`updatePopuler-${type}-${tahun}`, new Date().toISOString());

      setDatas(datas);
    } catch (error) {
      console.error("Request gagal", error);
    }
  }
  useEffect(() => {
    const todat = new Date();
    const year = todat.getFullYear();
    const month = String(todat.getMonth() + 1).padStart(2, "0");
    const day = String(todat.getDate()).padStart(2, "0");

    const formatDate = `${year}-${month}-${day}`;

    const fetchPopuler = async (type, tahun, setDatas) => {
      const populerAnim = localStorage.getItem(`populer-${type}-${tahun}`);
      const lasUpdatePopuler = localStorage.getItem(`updatePopuler-${type}-${tahun}`);

      if (populerAnim && lasUpdatePopuler) {
        const lasUpdate = new Date(lasUpdatePopuler);
        const currentTime = new Date();

        const expiredUpdate = currentTime - lasUpdate;

        if (expiredUpdate < 2) {
          setDatas(JSON.parse(populerAnim));
        } else {
          await getAnimeListWeek(type, tahun, setDatas);
        }
      } else {
        await getAnimeListWeek(type, tahun, setDatas);
      }
    };
    switch (animeType) {
      case "week":
        fetchPopuler(animeType, formatDate, setAnimeWeek);
        break;
      case "year":
        // getAnimeListYear();
        // getAnimeListWeek("2024-01-01");
        fetchPopuler(animeType, "2024-01-01", setAnimeWeek);
        break;
      case "lasyear":
        // getAnimeListLastYear();
        // getAnimeListWeek("2023-01-01");
        fetchPopuler(animeType, "2023-01-01", setAnimeWeek);
        break;
    }
  }, [animeType, page]);

  if (animeWeek.length < 0) {
    return <p>Loading</p>;
  }

  function handleActive(i) {
    setIsActive(i);
  }
  function handleNoActive(i) {
    setIsActive(null);
  }
  return (
    <section className="w-full text-center p-2">
      <h1 className="text-2xl font-bold">Anime Populer {animeType}</h1>
      <div className="grid grid-cols-3 md:grid-cols-5 md:gap-4 my-4 ">
        {animeWeek.map((anime, i) => (
          <NavLink to={`/populer/anime/req?pop=${anime.mal_id}&type=${animeType}`} key={i}>
            <div className="p-2 relative" onMouseEnter={() => handleActive(i)} onMouseLeave={() => handleNoActive(i)}>
              <img
                src={anime.images.jpg.image_url}
                alt=""
                className="w-[125px] md:w-[250px] h-[135px] md:h-[250px] object-cover"
              />
              <h3 className="mt-2">{anime.title}</h3>

              {isActive === i && (
                <div
                  className={`absolute hidden md:block top-[5rem] ${
                    i % 5 < 2 ? "right-[-31.5rem]" : "left-[-31.5rem]"
                  } bg-gray-800 w-[500px] z-10 p-2 text-start rounded-lg duration-[5s] ease-in-out transition-[clip-path]
              `}
                >
                  <p className="font-semibold">{anime.title}</p>
                  <p className=" text-[.8rem] italic">Alt: {anime.title_english}</p>
                  <div className="flex gap-4 my-2">
                    <p>
                      <i className="fa-solid fa-tv"></i> ({anime.episodes ? anime.episodes : "-"} Eps)
                    </p>
                    {anime.studios.map((studio, i) => (
                      <p key={i}>{studio.name}</p>
                    ))}
                    <p>
                      <i className="fa-solid fa-calendar-days"></i> {anime.aired.prop.from.year}-
                      {anime.aired.prop.to.year}
                    </p>
                    <p>
                      <i className="fa-solid fa-star"></i> {anime.score}
                    </p>
                  </div>
                  <p className="text-[.9rem]">{anime.background}</p>
                  <p className="my-2 text-[.8rem] italic">Source: {anime.source}</p>
                  <div className="flex flex-wrap gap-4">
                    <p>Tags:</p>
                    {anime.genres.map((genre, i) => (
                      <p key={i}>{genre.name}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </NavLink>
        ))}
      </div>
      <div className="mx-auto p-2 flex justify-center items-center gap-4">
        <button
          onClick={minPage}
          className={`${
            page > 1 ? "" : "opacity-50 cursor-not-allowed"
          } mr-2 bg-gray-500 hover:bg-gray-600 p-2 rounded-lg`}
          disabled={page <= 1}
        >
          back {page > 1 ? page - 1 : ""}
        </button>
        <span className="border rounded-md p-2 bg-green-300 hover:bg-green-600 font-semibold">Halaman: {page}</span>
        <button onClick={handlePage} className="ml-2 bg-gray-500 hover:bg-gray-600 p-2 rounded-lg">
          next {page + 1}
        </button>
      </div>
    </section>
  );
}

export default AnimeParam;
