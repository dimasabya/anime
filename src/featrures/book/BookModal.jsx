import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { removeItemBook, selectBookItems } from "./bookSlice";

const BookModal = ({ handleHideModal }) => {
  const selectItemBook = useSelector(selectBookItems);
  const dispath = useDispatch();

  const handleDelete = (item) => {
    dispath(removeItemBook(item));
  };
  return (
    <Modal>
      <div className="relative flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
          {selectItemBook.map((anime, i) => (
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
                <div className="mt-2 md:mt-4">
                  <i className="fa-solid fa-play md:text-2xl"></i>
                  <span
                    onClick={() => handleDelete(anime)}
                    className="border bg-red-500 p-1 md:p-2  rounded-lg ml-4 hover:cursor-pointer text-sm md:text-lg"
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            className="absolute -top-8 -right-6 w-6 h-6 text-white rounded-full bg-red-500"
            onClick={handleHideModal}
          >
            X
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
