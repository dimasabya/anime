import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems } from "../featrures/book/bookSlice";
import { addToggle, removeTToggle, selectToggle } from "../featrures/toggle/toggleSlice";
import { cartLength } from "../featrures/cart/cartSlice";

function Navbar({ handleShowModal, handleShowModalCart }) {
  const totalCart = useSelector(cartLength);
  const totalItem = useSelector(selectTotalItems);
  const count = totalCart + totalItem;
  const isToggle = useSelector(selectToggle);
  const dispath = useDispatch();

  const handleOpenToggle = () => {
    dispath(addToggle(true));
  };
  const handleHiddenToggle = () => {
    dispath(removeTToggle(false));
  };

  return (
    <>
      <nav className="p-4 flex justify-around items-center mb-2 fixed top-0 left-0 right-0 bg-[#3C0753] z-10">
        <NavLink to={`/`} className="text-2xl sm:text-3xl font-bold">
          Planet Anime
        </NavLink>
        <div
          className={`absolute top-0  ${
            isToggle ? "right-0 " : "right-[-100%]"
          } sm:static transition-all ease-in duration-[.5s]`}
        >
          <ul className={`inline-block w-[300px] sm:w-min bg-gray-200 text-black sm:text-white sm:bg-transparent`}>
            <li className={`flex flex-col justify-evenly items-center sm:flex-row gap-4 h-screen sm:h-min`}>
              <span className="sm:hidden absolute top-2 left-2" onClick={handleHiddenToggle}>
                <i className="fa-regular fa-circle-xmark text-2xl"></i>
              </span>
              <NavLink className="mx-6" to={"/search"} onClick={handleHiddenToggle}>
                <i className="fa-brands fa-searchengin"></i>
              </NavLink>
              <NavLink to={"/"} onClick={handleHiddenToggle}>
                Anime
              </NavLink>
              <NavLink to={"/populer"} className="mx-4" onClick={handleHiddenToggle}>
                Populer
              </NavLink>
              <NavLink to={"/manga"} className="mr-4" onClick={handleHiddenToggle}>
                Manga
              </NavLink>
              <NavLink to={"/about"} onClick={handleHiddenToggle}>
                About
              </NavLink>
              <button className="relative" onClick={handleShowModal}>
                <i className="fa-solid fa-book-bookmark mx-6" onClick={handleHiddenToggle}></i>
                {totalItem > 0 && (
                  <span className="absolute -top-4 right-0 w-6 h-6 rounded-full bg-green-400">{totalItem}</span>
                )}
              </button>
              <button className="relative" onClick={handleShowModalCart}>
                <i className="fa-solid fa-cart-shopping " onClick={handleHiddenToggle}></i>
                {totalCart > 0 && (
                  <span className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-green-400">{totalCart}</span>
                )}
              </button>
            </li>
          </ul>
        </div>
        <button className="sm:hidden relative" onClick={handleOpenToggle}>
          <span>
            <i className="fa-solid fa-burger"></i>
            {count > 0 ? <span className="bg-green-500 rounded-full w-6 h-6 absolute -top-4">{count}</span> : null}
          </span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
