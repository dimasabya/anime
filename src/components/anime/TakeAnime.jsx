import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import Character from "./data/Character";
import Recomended from "./data/Recomended";
import Trailer from "./data/Trailer";
import DataAnime from "./data/DataAnime";
import Baner from "./data/Baner";
import BookModal from "../../featrures/book/BookModal";
import CartModal from "../../featrures/cart/CartModal";

function TakeAnime() {
  const [animes, setAnimes] = useState([]);
  const [findAnime, setFindAnime] = useState({});
  const [img, setImg] = useState();
  const [isLoad, setLoad] = useState();
  const [score, setScored] = useState();
  const [recom, setRecom] = useState([]);
  const [character, setCharacter] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);
  const [openModalCart, setOpenCart] = useState(false);

  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const animeType = param.get("pop");
  const animeThn = param.get("type");

  const todat = new Date();
  const year = todat.getFullYear();
  const month = String(todat.getMonth() + 1).padStart(2, "0");
  const day = String(todat.getDate()).padStart(2, "0");

  const formatDate = `${year}-${month}-${day}`;

  async function getAnime(type, thn) {
    if (type === "week") {
      const cacheAnime = localStorage.getItem(`populer-week-${thn}`);
      console.log(JSON.parse(cacheAnime));
      const newAnime = JSON.parse(cacheAnime);
      setAnimes(newAnime);
    } else if (type === "year") {
      const cacheAnime = localStorage.getItem(`populer-year-2024-01-01`);
      const newAnime = JSON.parse(cacheAnime);
      setAnimes(newAnime);
    } else if (type === "lasyear") {
      const cacheAnime = localStorage.getItem("populer-lasyear-2023-01-01");
      const newAnime = JSON.parse(cacheAnime);
      setAnimes(newAnime);
    } else if (type == 1 || type == 2 || type == 3) {
      const cacheAnimes = localStorage.getItem(`anime-favorite-${type}`);
      const newAnime = JSON.parse(cacheAnimes);
      setAnimes(newAnime);
    } else if (type === "search") {
      const cachedAnimes = localStorage.getItem("anime-search");
      const newAnime = JSON.parse(cachedAnimes);
      setAnimes(newAnime);
    }
  }
  if (animes.length > 0) {
    setTimeout(() => {
      const resultAnime = animes.findIndex((anime) => anime.mal_id === Number(animeType));
      setFindAnime(animes[resultAnime]);
      setImg(findAnime.images.jpg.image_url);
      changeScored(findAnime.scored_by);
      setLoad(true);
    }, 1000);
  }
  const getAnimeRecom = async (id) => {
    const getAnime = await axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
    const reslut = await getAnime.data.data;
    setRecom(reslut);
  };

  const getAnimeCharacter = async (id) => {
    const getCharacter = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
    const result = await getCharacter.data.data;
    setCharacter(result);
  };

  useEffect(() => {
    async function fetchData() {
      if (!isLoad) {
        await getAnime(animeThn, formatDate);
        await getAnimeRecom(animeType);
        await getAnimeCharacter(animeType);
      }
      //   setLoad(!isLoad);
    }
    fetchData();
  }, [animeThn, formatDate, isLoad]);

  function changeScored(score) {
    const scoreNumber = parseInt(score, 10);

    if (scoreNumber >= 1000000) {
      const result = `${(scoreNumber / 1000000).toFixed(1)}M`;
      console.log("ini", result);
      setScored(result);
    } else if (scoreNumber >= 1000) {
      const result = `${(scoreNumber / 1000).toFixed(1)}K`;
      setScored(result);
    }
  }

  const handleShowModal = () => {
    setOpenModal(true);
  };

  const handleHideModal = () => {
    setOpenModal(false);
    setOpenCart(false);
  };
  const handleShowModalCart = () => {
    setOpenCart(true);
  };
  return (
    <>
      {isOpenModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      {openModalCart ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleShowModal} handleShowModalCart={handleShowModalCart} />
        {isLoad && (
          <div className="mt-[4rem]">
            <Baner img={img} />
          </div>
        )}
        <div className="my-2">
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 p-2 bg-blue-900 text-[.75rem] md:text-[.9rem]">
            <p className="border px-2">OVERVIEW</p>
            <p className="border px-2">RECOMENDATIONS</p>
            <p className="border px-2">VIDEOS</p>
            <p className="border px-2">CHARACTERS</p>
            <p className="border px-2">STAFF</p>
            <p className="border px-2">REVIEWS</p>
            <p className="border px-2">CUSTOM LIST</p>
          </div>
        </div>
        {isLoad && (
          <>
            <div className="md:flex md:gap-10 p-4 mt-4">
              <DataAnime findAnime={findAnime} score={score} />
            </div>
            <Trailer findAnime={findAnime} />
          </>
        )}
        {recom.length > 0 && <Recomended recom={recom} />}
        {character.length > 0 && <Character character={character} />}
        <Footer />
      </div>
    </>
  );
}

export default TakeAnime;
