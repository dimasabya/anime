import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import BookModal from "../../featrures/book/BookModal";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToBook } from "../../featrures/book/bookSlice";
import { addToCart } from "../../featrures/cart/cartSlice";
import CartModal from "../../featrures/cart/CartModal";

const Loading = () => {
  return (
    <div className="mt-[8rem] w-full p-2">
      <div className=" text-center">
        <CircularProgress />
      </div>
    </div>
  );
};

const ParamManga = () => {
  const [page, setPage] = useState(1);
  const [manga, setManga] = useState([]);
  const [idxManga, setIdx] = useState();
  const [isOpen, setOpen] = useState(false);
  const [isOpenCart, setOpenCart] = useState(false);
  const [isLoad, setLoad] = useState(null);
  const [imgBaner, setImg] = useState("");

  const dispath = useDispatch();
  const handleAddToBook = (mg) => {
    dispath(addToCart(mg));
  };

  const loaction = useLocation();
  const param = new URLSearchParams(loaction.search);
  const getId = param.get("id");
  console.log(getId);

  const getManga = async () => {
    const mangas = localStorage.getItem(`manga-${page}`);
    const data = JSON.parse(mangas);
    console.log(data);
    setManga(data);
    setLoad(false);
    if (manga?.length > 0) {
      const idxManga = manga.findIndex((m) => m.mal_id == getId);
      console.log(idxManga);
      const result = manga[idxManga];
      setImg(result.images.jpg.image_url);
      setIdx(result);
      setLoad(true);
    }
  };

  useEffect(() => {
    getManga();
  }, [isLoad]);

  const handleHideModal = () => {
    setOpen(false);
    setOpenCart(false);
  };
  const handleShowModal = () => {
    setOpen(true);
    setOpenCart(false);
  };

  const handleShowModalCart = () => {
    setOpenCart(true);
    setOpen(false);
  };
  console.log(idxManga);
  return (
    <>
      {isOpen ? <BookModal handleHideModal={handleHideModal} /> : null}
      {isOpenCart ? <CartModal handleHideModal={handleHideModal} /> : null}
      <>
        <Navbar handleShowModal={handleShowModal} handleShowModalCart={handleShowModalCart} />
        {isLoad ? (
          <div className="mt-[4rem]">
            <div className={` bg-cover bg-opacity-10`} style={{ backgroundImage: `url(${imgBaner})` }}>
              <img src={idxManga.images.jpg.image_url} alt="" className="mx-auto object-contain w-[300px] h-[300px]" />
            </div>
          </div>
        ) : (
          <Loading />
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
        {isLoad ? (
          <div className="md:flex md:gap-10 p-4 mt-4">
            <div className="">
              <img src={idxManga.images.jpg.image_url} alt="" className="w-[350px] h-[350px] object-contain" />
            </div>
            <div className="md:w-[800px]">
              <h1 className="text-3xl">{idxManga.title}</h1>
              <h4 className="text-1xl text-gray-400">Alt title: {idxManga.title_english}</h4>
              <div className="flex gap-4 my-2 text-gray-300">
                <p className="text-[.9rem]">
                  <i className="fa-solid fa-tv"></i> {idxManga.type} ({idxManga.chapters} Chapters)
                </p>
                <p>
                  <i className="fa-solid fa-calendar-days"></i> {idxManga.published.string}
                </p>
                <p>
                  <i className="fa-solid fa-star"></i> {idxManga.scored}
                </p>
              </div>
              <p className="text-[.9rem]">{idxManga.synopsis}</p>
              <p className="text-gray-400 text-[.9rem] my-4">Source: {idxManga.source}</p>
              <div className="">
                <p>Tags:</p>
                <div className="flex flex-wrap gap-2 my-2 ml-2">
                  {idxManga.genres.map((gen, i) => (
                    <p key={i} className="border p-1 px-2">
                      {gen.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-12">
                <i
                  className="fa-solid fa-cart-shopping text-3xl hover:text-green-500 ml-7"
                  onClick={() => handleAddToBook(idxManga)}
                ></i>
                <p>Add to Cart</p>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
      <Footer />
    </>
  );
};

export default ParamManga;
