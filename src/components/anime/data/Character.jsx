function Character({ character }) {
  return (
    <div className="w-full">
      <h1 className="text-2xl ml-2">Characters</h1>
      <div className="md:flex md:flex-row grid grid-cols-3 justify-center md:gap-4 p-2 md:p-4 text-center">
        {character.slice(0, 10).map((char, i) => (
          <div key={i} className="my-2 md:border p-2 rounded">
            <img src={char.character.images.jpg.image_url} alt="" className="w-[100px] h-[100px] mx-auto" />
            <p>{char.character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Character;
