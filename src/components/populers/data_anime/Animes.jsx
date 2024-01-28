import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Animes() {
  const [anime, setAnime] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [animesPage3, setAnimePage3] = useState([]);
  const [acive, setAcive] = useState(null);
  const [scored, setScored] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [pages, setPages] = useState(1);
  const [filter, setFilter] = useState(null);
  const [isLoad, setLoad] = useState(false);

  const getAnime = async (type) => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/top/anime?filter=${type}&page=${pages}`);
      const datas = await response.data.data;

      localStorage.setItem(`anime-${type}-${pages}`, JSON.stringify(datas));
      localStorage.setItem(`animeTime-${type}-${pages}`, new Date().toISOString());

      if (pages == 1) {
        setAnime(datas);
      } else if (pages === 2) {
        setAnimes(datas);
      } else if (pages === 3) {
        setAnimePage3(datas);
      }
      setLoad(true);
    } catch (err) {
      console.error("Fetch favorite gagal", err);
    }
  };

  useEffect(() => {
    const fetchAnime = async (type, setData, setDatas, setDataPage3) => {
      const animeCache = localStorage.getItem(`anime-${type}-${pages}`);
      const animeTime = localStorage.getItem(`animeTime-${type}-${pages}`);

      if (animeCache && animeTime) {
        const lastUpdate = new Date(animeTime);
        const currenrUpdate = new Date();

        const expiredUpdate = (currenrUpdate - lastUpdate) / (1000 * 60);
        if (expiredUpdate < 60) {
          switch (pages) {
            case 1:
              setData(JSON.parse(animeCache));
              break;
            case 2:
              setDatas(JSON.parse(animeCache));
              break;
            case 3:
              setDataPage3(JSON.parse(animeCache));
              break;
          }
          setLoad(true);
        } else {
          await getAnime(type);
        }
      } else {
        await getAnime(type);
      }
    };
    fetchAnime("favorite", setAnime, setAnimes, setAnimePage3);

    const handleScroll = () => {
      setScroll(window.scrollY);

      if (scroll > 1535.6) {
        setPages(2);
        fetchAnime("favorite", setAnime, setAnimes, setAnimePage3);
      }
      if (scroll > 3400.0) {
        setPages(3);
        fetchAnime("favorite", setAnime, setAnimes, setAnimePage3);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);
  function changeScored(score) {
    const scoreNumber = parseInt(score, 10);

    if (scoreNumber >= 1000000) {
      const result = `${(scoreNumber / 1000000).toFixed(1)}M`;
      setScored(result);
    } else if (scoreNumber >= 1000) {
      const result = `${(scoreNumber / 1000).toFixed(1)}K`;
      setScored(result);
    }
  }

  function cutSinopsis(text, maxWord) {
    const word = text.split(" ");
    if (word.length <= maxWord) {
      return text;
    }

    const cutText = word.slice(0, maxWord).join(" ");
    return `${cutText}...`;
  }

  function handleAcive(index, score) {
    changeScored(score);
    setAcive(index);
  }
  function handleHiden() {
    setAcive(null);
  }

  function handleFilter(param) {
    setFilter(param);
  }
  function hiddenFilter() {
    setFilter(null);
  }

  function coba() {
    console.log("oke");
  }

  console.log(scroll);
  return (
    <section className="w-full">
      <div className="p-4">
        <div className="flex flex-wrap justify-between items-center p-2 mb-4">
          <h1 className="md:text-5xl">Animes Populer</h1>
          <div className="inline-flex gap-8">
            <p>
              <i className="fa-solid fa-bars-staggered"></i> Populer
            </p>
            <p
              className="cursor-pointer relative"
              onMouseEnter={() => handleFilter(1)}
              onMouseLeave={() => hiddenFilter(null)}
            >
              <i className="fa-solid fa-filter"></i> Filter
              {filter === 1 && (
                <div className="bg-gray-800 absolute bottom-[-6.5rem] left-[-9rem] z-10 p-4 w-[200px]">
                  <form action="" onClick={coba}>
                    <p>
                      <input type="checkbox" name="" id="" /> Alphabet
                    </p>
                    <p>Rank</p>
                    <p>Rating</p>
                  </form>
                </div>
              )}
            </p>
          </div>
        </div>
        <h1 className="text-2xl ml-2">Popular</h1>
        <div className="grid grid-cols-3 md:grid-cols-5 md:gap-8 p-2 text-center">
          {/* {scroll < 1860.6 && ( */}
          <>
            {isLoad ? (
              <>
                {anime.map((anim, i) => (
                  <NavLink key={i} to={`anime/req?pop=${anim.mal_id}&type=1`}>
                    <div
                      className="p-2 relative"
                      onMouseEnter={() => handleAcive(i, anim.scored_by)}
                      onMouseLeave={() => handleHiden(null)}
                    >
                      <img
                        src={anim.images.jpg.image_url}
                        alt=""
                        className="w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
                      />
                      <h3 className="mt-2 text-[.75rem] md:text-lg">{anim.title}</h3>
                      {acive === i && (
                        <div className="bg-gray-500 opacity-[.95] absolute top-0 bottom-0 left-0 right-0 text-start p-2 rounded-lg">
                          <div className="">
                            <div>
                              <h3 className="font-bold md:mb-2 text-[.9rem] md:text-lg">{anim.title}</h3>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                {anim.score} <i className="fa-solid fa-star"></i> ({scored})
                              </p>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                {anim.episodes ? anim.episodes : "On Going"} Episodes
                              </p>
                              <div className="inline-flex gap-2">
                                <p className="text-[.5rem] md:text-[.85rem] italic">{anim.status}</p>
                                <p className="text-[.5rem] md:text-[.85rem]">
                                  <i className="fa-solid fa-calendar-days"></i> {anim.aired.prop.from.year}-
                                  {anim.aired.prop.to.year}
                                </p>
                              </div>
                              <p className="my-2 text-[.5rem] md:text-[.9em]">{cutSinopsis(anim.synopsis, 15)}</p>
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
              </>
            ) : (
              <CircularProgress />
            )}
            {scroll > 1535.6 && (
              <>
                {animes.map((anim, i) => (
                  <NavLink key={i} to={`anime/req?pop=${anim.mal_id}&type=2`}>
                    <div
                      className="p-2 relative"
                      onMouseEnter={() => handleAcive(i, anim.scored_by)}
                      onMouseLeave={() => handleHiden(null)}
                    >
                      <img
                        src={anim.images.jpg.image_url}
                        alt=""
                        className="w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
                      />
                      <h3 className="mt-2 text-[.75rem] md:text-lg">{anim.title}</h3>
                      {acive === i && (
                        <div className="bg-gray-500 opacity-[.95] absolute top-0 bottom-0 left-0 right-0 text-start p-2 rounded-lg">
                          <div className="">
                            <div>
                              <h3 className="font-bold mb-2 text-[.9rem] md:text-lg">{anim.title}</h3>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                {anim.score} <i className="fa-solid fa-star"></i> ({scored})
                              </p>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                {anim.episodes ? anim.episodes : "On Going"} Episodes
                              </p>
                              <div className="inline-flex gap-2">
                                <p className="text-[.5rem] md:text-[.85rem] italic">{anim.status}</p>
                                <p className="text-[.5rem] md:text-[.85rem]">
                                  <i className="fa-solid fa-calendar-days"></i> {anim.aired.prop.from.year}-
                                  {anim.aired.prop.to.year}
                                </p>
                              </div>
                              <p className="my-2 text-[.5rem] md:text-[.9em]">{cutSinopsis(anim.synopsis, 15)}</p>
                            </div>
                            <div className="absolute bottom-2 left-0 right-0 text-center">
                              <i className="fa-solid fa-play md:text-2xl"></i>
                              <i className="fa-solid fa-bookmark mx-8 md:text-2xl z-50"></i>
                              <i className="fa-solid fa-plus md:text-2xl"></i>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </NavLink>
                ))}
              </>
            )}
            {scroll > 3404.0 && (
              <>
                {animesPage3.map((anim, i) => (
                  <NavLink key={i} to={`anime/req?pop=${anim.mal_id}&type=3`}>
                    <div
                      className="p-2 relative"
                      onMouseEnter={() => handleAcive(i, anim.scored_by)}
                      onMouseLeave={() => handleHiden(null)}
                    >
                      <img
                        src={anim.images.jpg.image_url}
                        alt=""
                        className="w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
                      />
                      <h3 className="mt-2 text-[.75rem] md:text-lg">{anim.title}</h3>
                      {acive === i && (
                        <div className="bg-gray-500 opacity-[.95] absolute top-0 bottom-0 left-0 right-0 text-start p-2 rounded-lg">
                          <div className="">
                            <div>
                              <h3 className="font-bold mb-2 text-[.9rem] md:text-lg">{anim.title}</h3>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                {anim.score} <i className="fa-solid fa-star"></i> ({scored})
                              </p>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                {anim.episodes ? anim.episodes : "On Going"} Episodes
                              </p>
                              <div className="inline-flex gap-2">
                                <p className="text-[.5rem] md:text-[.85rem] italic">{anim.status}</p>
                                <p className="text-[.5rem] md:text-[.85rem]">
                                  <i className="fa-solid fa-calendar-days"></i> {anim.aired.prop.from.year}-
                                  {anim.aired.prop.to.year}
                                </p>
                              </div>
                              <p className="my-2 text-[.5rem] md:text-[.9em]">{cutSinopsis(anim.synopsis, 15)}</p>
                            </div>
                            <div className="absolute bottom-2 left-0 right-0 text-center">
                              <i className="fa-solid fa-play md:text-2xl"></i>
                              <i className="fa-solid fa-bookmark mx-8 md:text-2xl z-50"></i>
                              <i className="fa-solid fa-plus md:text-2xl"></i>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </NavLink>
                ))}
              </>
            )}
          </>
          {/* )} */}
        </div>
        {/* <div className="grid grid-cols-3 md:grid-cols-5 md:gap-8 p-2 text-center">
          {scroll > 1535.6 && (
            <>
              {animes.map((anim, i) => (
                <NavLink key={i} to={`anime/req?pop=${anim.mal_id}&type=2`}>
                  <div
                    className="p-2 relative"
                    onMouseEnter={() => handleAcive(i, anim.scored_by)}
                    onMouseLeave={() => handleHiden(null)}
                  >
                    <img
                      src={anim.images.jpg.image_url}
                      alt=""
                      className="w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
                    />
                    <h3 className="mt-2">{anim.title}</h3>
                    {acive === i && (
                      <div className="bg-gray-500 opacity-[.95] absolute top-0 bottom-0 left-0 right-0 text-start p-2 rounded-lg">
                        <div className="">
                          <div>
                            <h3 className="font-bold mb-2 text-[.9rem] md:text-lg">{anim.title}</h3>
                            <p className="text-[.5rem] md:text-[.85rem]">
                              {anim.score} <i className="fa-solid fa-star"></i> ({scored})
                            </p>
                            <p className="text-[.5rem] md:text-[.85rem]">
                              {anim.episodes ? anim.episodes : "On Going"} Episodes
                            </p>
                            <div className="inline-flex gap-2">
                              <p className="text-[.5rem] md:text-[.85rem] italic">{anim.status}</p>
                              <p className="text-[.5rem] md:text-[.85rem]">
                                <i className="fa-solid fa-calendar-days"></i> {anim.aired.prop.from.year}-
                                {anim.aired.prop.to.year}
                              </p>
                            </div>
                            <p className="my-2 text-[.5rem] md:text-[.9em]">{cutSinopsis(anim.synopsis, 15)}</p>
                          </div>
                          <div className="absolute bottom-2 left-0 right-0 text-center">
                            <i className="fa-solid fa-play md:text-2xl"></i>
                            <i className="fa-solid fa-bookmark mx-8 md:text-2xl z-50"></i>
                            <i className="fa-solid fa-plus md:text-2xl"></i>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </NavLink>
              ))}
            </>
          )}
        </div> */}
      </div>
    </section>
  );
}

export default Animes;
