function Baner({ img }) {
  return (
    <div className={` bg-cover bg-center w-full flex justify-center`} style={{ backgroundImage: `url(${img})` }}>
      <img src={img} alt="" className="w-[300px] h-[300px]" />
    </div>
  );
}

export default Baner;
