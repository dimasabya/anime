import Animes from "./data_anime/Animes";
import Baner from "../Baner";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Search from "../Search";
import { useState } from "react";
import BookModal from "../../featrures/book/BookModal";
import CartModal from "../../featrures/cart/CartModal";

function AnimePopuler() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [openCartModal, setOpenCart] = useState(false);

  const handleOpenModal = () => {
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
      {openCartModal ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleOpenModal} handleShowModalCart={handleShowModalCart} />
        {/* <Baner /> */}
        <div className="mt-[8rem]">
          <Search />
          <Animes />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AnimePopuler;
