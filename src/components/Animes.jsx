import { Link, NavLink } from "react-router-dom";

function Animes({ animes, animesWeek, animesLast }) {
  let week = "week";
  let year = "year";
  let lasYear = "lasyear";

  return (
    <div className="my-4">
      <section className="w-full text-center p-2">
        <h1 className="text-2xl font-bold">Anime Populer Minggu ini</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 md:gap-4 md:my-4">
          {animesWeek.map((anime, i) => (
            <NavLink key={i} to={`/populer/anime/req?pop=${anime.mal_id}&type=week`}>
              <div className="p-2">
                <img
                  src={anime.images.jpg.image_url}
                  alt=""
                  className="w-[125px] h-[135px] md:w-[250px] md:h-[250px] mx-auto"
                />
                <h3 className="mt-2 text-[.8rem] md:text-[1rem]">{anime.title}</h3>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="border md:w-[400px] mx-auto p-2 bg-gray-400 hover:bg-gray-700">
          <Link to={`/populer/anime?an=${week}`}>
            Lihat Semua Anime Minggu ini
            <i className="fa-solid fa-angles-right ml-2"></i>
          </Link>
        </div>
      </section>
      <section className="w-full text-center p-2 my-4">
        <h1 className="text-2xl font-bold">Anime Populer Tahun Ini</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
          {animes.map((anime, index) => (
            <div key={index} className="p-2">
              <img
                src={anime.images.jpg.image_url}
                alt=""
                className="mx-auto w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
              />
              <h3 className="mt-2 text-[.9rem] md:text-[1rem]">{anime.title}</h3>
            </div>
          ))}
        </div>
        <div className="border md:w-[400px] mx-auto p-2 bg-gray-400 hover:bg-gray-700">
          <Link to={`/populer/anime?an=${year}`}>
            Lihat Semua Anime Tahun ini
            <i className="fa-solid fa-angles-right ml-2"></i>
          </Link>
        </div>
      </section>
      <section className="w-full text-center p-2">
        <h1 className="text-2xl font-bold">Anime Populer Tahun 2023</h1>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-4">
          {animesLast.map((anime, index) => (
            <div key={index} className="p-2">
              <img
                src={anime.images.jpg.image_url}
                alt=""
                className="mx-auto w-[125px] md:w-[250px] h-[135px] md:h-[250px]"
              />
              <h3 className="mt-2 text-[.9rem] md:text-[1rem]">{anime.title}</h3>
            </div>
          ))}
        </div>
        <div className="border md:w-[400px] mx-auto p-2 bg-gray-400 hover:bg-gray-700">
          <Link to={`/populer/anime?an=${lasYear}`}>
            Lihat Semua Anime Tahun 2023
            <i className="fa-solid fa-angles-right ml-2"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Animes;
