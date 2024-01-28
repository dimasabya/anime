/* eslint-disable no-inner-declarations */

import AnimeParam from "./data_anime/AnimeParam";
import Baner from "../Baner";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Search from "../Search";
import { useState } from "react";
import BookModal from "../../featrures/book/BookModal";
import CartModal from "../../featrures/cart/CartModal";

function PopulerAnime() {
  const [isOpenModal, setOPenModal] = useState(false);
  const [openCartModal, setOPenCart] = useState(false);

  const handleShowModal = () => {
    setOPenModal(true);
    setOPenCart(false);
  };
  const handleHideModal = () => {
    setOPenModal(false);
    setOPenCart(false);
  };
  const handleShowModalCart = () => {
    setOPenCart(true);
    setOPenModal(false);
  };
  return (
    <>
      {isOpenModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      {openCartModal ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleShowModal} handleShowModalCart={handleShowModalCart} />
        <Baner />
        <Search />
        <AnimeParam />
        <Footer />
      </div>
    </>
  );
}

export default PopulerAnime;
