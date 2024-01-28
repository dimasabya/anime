function Footer() {
  return (
    <div className="p-4 bg-[#3C0753]">
      <h1 className="w-full text-2xl md:text-4xl my-4">Anime By Dimas Abya</h1>
      <div className="flex flex-wrap flex-col md:flex-row justify-between">
        <div className="flex flex-wrap flex-col md:flex-row gap-4 p-2">
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Terms Of Use</a>
          <a href="">Privacy Policy</a>
        </div>
        <div className="flex flex-wrap gap-4 p-2">
          <a href="" className="text-4xl">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="" className="text-4xl">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="" className="text-4xl">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="" className="text-4xl">
            <i className="fa-brands fa-telegram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
