import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { addToBook } from "../../featrures/book/bookSlice";
import BookModal from "../../featrures/book/BookModal";
import CartModal from "../../featrures/cart/CartModal";
import { addToCart } from "../../featrures/cart/cartSlice";

const TakeManga = () => {
  const [mangas, setMangas] = useState([]);
  const [manga, setManga] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openCartModal, setOpenCart] = useState(false);

  const dispath = useDispatch();

  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const id = param.get("pop");

  const handleAddToBook = (manga) => {
    dispath(addToCart(manga));
  };

  const getManga = () => {
    const cacheManga = localStorage.getItem("anime-search");
    const newManga = JSON.parse(cacheManga);
    setMangas(newManga);
  };
  setTimeout(() => {
    if (mangas?.length > 0) {
      const resultIndex = mangas.findIndex((item) => item.mal_id === Number(id));
      setManga(mangas[resultIndex]);
      setLoad(true);
      console.log(mangas);
    }
  }, 1000);
  useEffect(() => {
    getManga();
  }, []);

  const handleOpenModal = () => {
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
      {openModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      {openCartModal ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleOpenModal} handleShowModalCart={handleShowModalCart} />
        {isLoad ? (
          <div className="mt-[5rem]">
            <h2 className="text-4xl font-semibold ml-4">Manga</h2>
            <div className="w-full h-2 p-2 mt-2">
              <div className="bg-blue-500 border-b-2"></div>
            </div>
            <div className="md:flex md:gap-10 p-4">
              <div className="">
                <img src={manga.images.jpg.image_url} alt="" className="w-[350px] h-[350px] object-contain" />
              </div>
              <div className="md:w-[800px]">
                <h1 className="text-3xl">{manga.title}</h1>
                <h4 className="text-1xl text-gray-400">Alt title: {manga.title_english}</h4>
                {manga.authors.map((auth, i) => (
                  <h5 key={i}>{auth.name}</h5>
                ))}
                <div className="flex flex-wrap gap-2 md:gap-4 my-2 text-gray-300 text-[.75rem] md:text-sm">
                  <p className="">
                    <i className="fa-solid fa-book"></i> {manga.type}
                  </p>
                  <p>
                    <i className="fa-regular fa-file-lines"></i> ({manga.chapters} Halaman)
                  </p>
                  <p>
                    <i className="fa-solid fa-book"></i> (Volume {manga.volumes})
                  </p>
                  <p>
                    <i className="fa-solid fa-calendar-days"></i> {manga.published.string}
                  </p>
                  <p>
                    <i className="fa-solid fa-star"></i> {manga.score}
                  </p>
                  <p>
                    <i className="fa-solid fa-ranking-star"></i> Rank: {manga.rank}
                  </p>
                </div>
                <p className="text-[.9rem]">{manga.synopsis}</p>
                <p className="text-gray-400 text-[.9rem] my-4">Source: {manga.source}</p>
                <div className="">
                  <p>Tags:</p>
                  <div className="flex gap-2 my-2 ml-2">
                    {manga.genres.map((gen, i) => (
                      <p key={i} className="border p-1 px-2">
                        {gen.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-12">
                  <i
                    className="fa-solid fa-cart-shopping text-3xl hover:text-green-500 ml-7"
                    onClick={() => handleAddToBook(manga)}
                  ></i>
                  <p>Add to Cart</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TakeManga;
