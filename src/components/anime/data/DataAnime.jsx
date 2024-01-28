import { useDispatch } from "react-redux";
import { addToBook } from "../../../featrures/book/bookSlice";

function DataAnime({ findAnime, score }) {
  const dispath = useDispatch();

  const handleAddToBook = (anime) => {
    dispath(addToBook(anime));
  };

  return (
    <>
      <div className="">
        <img src={findAnime.images.jpg.image_url} alt="" className="w-[350px] h-[350px] object-contain" />
      </div>
      <div className="md:w-[800px]">
        <h1 className="text-3xl">{findAnime.title}</h1>
        <h4 className="text-1xl text-gray-400">Alt title: {findAnime.title_english}</h4>
        <div className="flex gap-4 my-2 text-gray-300">
          <p className="text-[.9rem]">
            <i className="fa-solid fa-tv"></i> {findAnime.type} ({findAnime.episodes} eps)
          </p>
          <p>
            <i className="fa-solid fa-calendar-days"></i> {findAnime.year}
          </p>
          <p>
            <i className="fa-solid fa-star"></i> {score}
          </p>
        </div>
        <p className="text-[.9rem]">{findAnime.synopsis}</p>
        <p className="text-gray-400 text-[.9rem] my-4">Source: {findAnime.source}</p>
        <div className="">
          <p>Tags:</p>
          <div className="flex gap-2 my-2 ml-2">
            {findAnime.genres.map((gen, i) => (
              <p key={i} className="border p-1 px-2">
                {gen.name}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <i
            className="fa-solid fa-bookmark text-3xl hover:text-green-500 ml-7"
            onClick={() => handleAddToBook(findAnime)}
          ></i>
          <p>Add to Book</p>
        </div>
      </div>
    </>
  );
}

export default DataAnime;
