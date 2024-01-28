import axios from "axios";
import { useEffect, useState } from "react";

import Animes from "../components/Animes";
import Baner from "../components/Baner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import BookModal from "../featrures/book/BookModal";
import CartModal from "../featrures/cart/CartModal";

function Home() {
  const [animes, setAnimes] = useState([]);
  const [animesWeek, setAnimesWeek] = useState([]);
  const [animesLastYear, setAnimesLastYear] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  const [isOpenModal, setOpenModal] = useState(false);
  const [openCartModal, setOpenCart] = useState(false);

  async function getAnimeDatas(order, date, setData) {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?order_by=${order}&limit=5&start_date=${date}`);
      const datas = response.data.data;

      // menyimpan data dan waktu update di localstoraage
      localStorage.setItem(`cachedAnime${order}-${date}`, JSON.stringify(datas));
      localStorage.setItem(`lastUpdate${order}-${date}`, new Date().toISOString());

      setData(datas);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("gagal fetch", err);
    }
  }

  useEffect(() => {
    const todat = new Date();
    const year = todat.getFullYear();
    const month = String(todat.getMonth() + 1).padStart(2, "0");
    const day = String(todat.getDate()).padStart(2, "0");

    const formatDate = `${year}-${month}-${day}`;
    const fetchData = async (order, date, setData) => {
      //  cek data dan waktu tela diperbarui di cache
      const cachedAnime = localStorage.getItem(`cachedAnime${order}-${date}`);
      const lastUpdateAnime = localStorage.getItem(`lastUpdate${order}-${date}`);

      if (cachedAnime && lastUpdateAnime) {
        const lastUpdate = new Date(lastUpdateAnime);
        const currentTime = new Date();

        // apakah data kurang dari 1 jam atau lebih
        const timeExpired = (currentTime - lastUpdate) / (1000 * 60);

        if (timeExpired < 60) {
          setData(JSON.parse(cachedAnime));
        } else {
          await getAnimeDatas(order, date, setData);
        }
      } else {
        await getAnimeDatas(order, date, setData);
      }
    };
    const get = async () => {
      await Promise.all([
        fetchData("popularity", formatDate, setAnimes),
        fetchData("popularity", "2024-01-01", setAnimesWeek),
        fetchData("popularity", "2023-01-01", setAnimesLastYear),
      ]);
    };
    get();
  }, []);

  const handleShowModal = () => {
    setOpenModal(true);
    setOpenCart(false);
  };

  const handleHideModal = () => {
    setOpenModal(false);
    setOpenCart(false);
  };

  const handleShowModalCart = () => {
    setOpenCart(true);
    setOpenModal(false);
  };
  return (
    <>
      {isOpenModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      {openCartModal ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleShowModal} handleShowModalCart={handleShowModalCart} />
        <Baner />
        <Search />
        <Animes animes={animes} animesWeek={animesWeek} animesLast={animesLastYear} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
