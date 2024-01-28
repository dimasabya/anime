function Trailer({ findAnime }) {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl ml-2">Trailer {findAnime.title}</h2>
      <div className="w-full">
        <iframe
          src={findAnime.trailer.embed_url}
          // width={800}
          // height={400}
          title={findAnime.title}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mx-auto my-2 md:w-[800px] md:h-[400px]"
        ></iframe>
      </div>
    </div>
  );
}

export default Trailer;
