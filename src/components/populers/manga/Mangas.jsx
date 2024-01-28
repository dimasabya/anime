import Footer from "../../Footer";
import MangaPopuler from "./MangaPopuler";
import Navbar from "../../Navbar";
import Search from "../../Search";

import { useState } from "react";
import BookModal from "../../../featrures/book/BookModal";
import CartModal from "../../../featrures/cart/CartModal";

const Mangas = () => {
  const [openModal, setOpenModal] = useState(false);
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
      {openModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      {openCartModal ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div className="w-full">
        <Navbar handleShowModal={handleOpenModal} handleShowModalCart={handleShowModalCart} />
        <div className="w-full mt-[8rem]">
          <Search />
          <MangaPopuler />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Mangas;
