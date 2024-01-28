import { useState, useEffect } from "react";
import axios from "axios";

function Baner() {
  const [banerAnime, setBanerAnime] = useState([]);
  const [banerSlide, setBanerSlide] = useState({});
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  function handleSlider(comand) {
    let local;
    if (comand === "back") {
      local = active + 1;
      banerAnime.length - 1 < local ? setActive(local / banerAnime.length - 1) : setActive(local);
    }
    if (comand === "next") {
      local = active - 1;
      local < 0 ? setActive(banerAnime.length - 1) : setActive(local);
    }
    setPrev(active);
  }

  async function getAnimebaner(type) {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?order_by=favorites&order_by=${type}&start_date=2023-01-01&min_score=8.0&limit=5`
      );
      const datas = await response.data.data;

      localStorage.setItem(`baner-${type}`, JSON.stringify(datas));
      localStorage.setItem(`banerTime-${type}`, new Date().toISOString());

      console.log(datas);
      setBanerSlide(datas);
      setBanerAnime(datas);
    } catch (err) {
      console.error("Request baner gagal", err);
    }
  }

  useEffect(() => {
    // getAnimebaner("popularity");
    const fetchBaner = async (type, dataSlide, dataAnime) => {
      const banerCache = localStorage.getItem(`baner-${type}`);
      const banerTime = localStorage.getItem(`banerTime-${type}`);

      if (banerCache && banerTime) {
        const lastUpdate = new Date(banerTime);
        const currentUpdate = new Date();

        const expiredUpdate = (currentUpdate - lastUpdate) / (1000 * 60);
        if (expiredUpdate < 60) {
          dataSlide(JSON.parse(banerCache));
          dataAnime(JSON.parse(banerCache));
        } else {
          await getAnimebaner(type);
        }
      } else {
        await getAnimebaner(type);
      }
    };

    fetchBaner("popularity", setBanerSlide, setBanerAnime);
  }, []);

  //   console.log("ini", banerSlide[prev]);
  return (
    <div className="rounded-lg relative shadow-lg overflow-hidden w-full p-4 mt-[48.5px]">
      <div className="w-full h-[400px] relative">
        {banerAnime.map((anim, index) => (
          <>
            <img
              src={anim.images.jpg.image_url}
              key={index}
              alt={anim.mal_id}
              className={`w-full h-full absolute object-fill inset-0 duration-[2s] ease-in-out transition-[clip-path] ${
                index === active ? "clip-active" : "clip-hiden"
              }`}
            />
            <div
              className={`w-full text-center text-black bg-gray-200 opacity-[.7] absolute bottom-0 right-0 duration-[4s] ease-in-out transition-[clip-path] ${
                index === active ? "clip-active" : "clip-hiden"
              }`}
            >
              <div className="border rounded-lg p-2 bg-transparent">
                <h1 className="font-bold md:text-2xl">{anim.title}</h1>
                {anim.score ? (
                  <p className="text-[.65rem] md:text-lg">
                    <i className="fa-solid fa-star text-[.65rem] md:text-lg"></i> {anim.score}
                  </p>
                ) : (
                  ""
                )}

                <p className="italic text-[.75rem] md:text-lg">{anim.background}</p>
                <p className="text-[.65rem] md:text-lg">{anim.broadcast.string}</p>
              </div>
            </div>
          </>
        ))}
        {banerSlide.length === undefined ? (
          <p>Loading ...</p>
        ) : (
          <img src={banerSlide[prev].images.jpg.image_url} alt="" className="w-full h-full object-fill" />
        )}
      </div>
      <div>
        <button
          id="bck"
          onClick={() => handleSlider("back")}
          className="absolute top-[50%] left-2 z-[9] border p-2 bg-red-500"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          id="forward"
          onClick={() => handleSlider("next")}
          className="absolute top-[50%] right-2 z-[9] border p-2 bg-green-500"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Baner;
