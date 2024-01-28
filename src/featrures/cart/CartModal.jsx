import { useDispatch, useSelector } from "react-redux";
import ModalCart from "../../components/ModalCart";
import { addToCart, cartLength, itemsCart, minToCart, removeToCart } from "./cartSlice";

const CartModal = ({ handleHideModal }) => {
  const cartItem = useSelector(itemsCart);
  const cartTotal = useSelector(cartLength);
  const dispath = useDispatch();
  const plus = (item) => {
    dispath(addToCart(item));
  };
  const min = (item) => {
    dispath(minToCart(item));
  };
  const handleDelete = (item) => {
    dispath(removeToCart(item));
  };
  const handleBuy = () => {
    if (cartItem.length === 0) return;
    const msg = cartItem.map((m) => m.title);
    console.log(msg);
    const { ...a } = msg;
    console.log(a);

    const phone = "6281313977883";
    const message = encodeURIComponent(
      `Hallo saya ingin membeli komik ${msg.map((itm) => itm)} dengan total ${cartTotal} items`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(URL, "_blank");
  };

  return (
    <ModalCart>
      <div className="relative flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
          {cartItem.map((anime, i) => (
            <div key={i} className="w-full border-b-4 border-blue-200 pb-2 flex">
              <div className="w-[120px] h-auto overflow-hidden">
                <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-full object-cover" />
              </div>
              <div className="ml-5 md:ml-10 w-[75%]">
                <h3 className="capitalize mt-3 md:text-lg font-bold">{anime.title}</h3>
                <h5 className="text-gray-400 text-[.75rem] md:text-sm">Alt {anime.title_english}</h5>
                <div className="flex gap-4 my-2">
                  <p className="text-[.75rem] md:text-[.9rem]">
                    <i className="fa-solid fa-tv"></i> {anime.type} ({anime.episodes} eps)
                  </p>
                  <p className="text-[.75rem] md:text-[.9rem]">
                    <i className="fa-solid fa-calendar-days"></i> {anime.year}
                  </p>
                </div>
                <p className="text-[.75rem] md:text-md">{anime.synopsis.substring(0, 150)} ...</p>
                <div className="mt-1">
                  <span
                    onClick={() => min(anime)}
                    className="border rounded-full bg-red-500 px-1 text-center font-semibold hover:cursor-pointer"
                  >
                    -
                  </span>
                  <span className="border p-1 mx-2">Total: {anime.total}</span>
                  <span
                    onClick={() => plus(anime)}
                    className="border rounded-full px-1 text-center font-semibold bg-green-500 hover:cursor-pointer"
                  >
                    +
                  </span>
                  <span
                    onClick={() => handleDelete(anime)}
                    className="border bg-red-500 px-2 ml-2 rounded hover:cursor-pointer"
                  >
                    Clear
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap justify-evenly gap-4 items-center">
            <div>
              <p>Total items: {cartTotal}</p>
            </div>
            <button onClick={handleBuy} className="border rounded-md px-2 bg-indigo-400 mt-6 font-semibold">
              BUY (Whatsapp)
            </button>
          </div>
          <button
            className="absolute -top-8 -right-6 w-6 h-6 text-white rounded-full bg-red-500"
            onClick={handleHideModal}
          >
            X
          </button>
        </div>
      </div>
    </ModalCart>
  );
};

export default CartModal;
