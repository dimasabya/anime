function Recomended({ recom }) {
  return (
    <div className="my-6">
      <h1 className="text-2xl ml-2">Recomended Animes</h1>
      <div className="flex flex-wrap justify-center gap-2 p-4 text-center">
        {recom.slice(0, 10).map((anime, i) => (
          <div key={i} className="p-2 w-[110px]">
            <img src={anime.entry.images.jpg.image_url} alt="" className="w-[110px] h-[100px]" />
            <p className="text-[.5rem] md:text-lg">{anime.entry.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recomended;
