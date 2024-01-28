import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BookModal from "../featrures/book/BookModal";
import CartModal from "../featrures/cart/CartModal";

import img from "../assets/baner.jpg";
import imgRead from "../assets/anime-read.jpg";
import imgWatch from "../assets/anime-watch.jpg";
import imgProfile from "../assets/IMG20230425164009.jpg";

const About = () => {
  const [isOenModal, setModal] = useState(false);
  const [isOpenModalCart, setOpenCart] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleShowModal = () => {
    setModal(true);
  };
  const handleHideModal = () => {
    setModal(false);
    setOpenCart(false);
  };
  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleName = (e) => {
    setName(e);
  };
  const handleEmail = (e) => {
    setEmail(e);
  };
  const handleMessage = (e) => {
    setMessage(e);
  };

  const handleSendWa = (e) => {
    e.preventDefault();
    const phone = "6281313977883";
    const messages = encodeURIComponent(message);

    const URL = `https://api.whatsapp.com/send?phone=${phone}&ext=${messages}`;

    window.open(URL, "_blank");
  };
  return (
    <>
      {isOenModal ? <BookModal handleHideModal={handleHideModal} /> : null}
      {isOpenModalCart ? <CartModal handleHideModal={handleHideModal} /> : null}
      <div>
        <Navbar handleShowModal={handleShowModal} handleShowModalCart={handleOpenCart} />
        <div className="mt-[4rem]">
          <div
            className="w-full h-screen bg-center md:bg-top"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="my-4 text-center">
            <h1 className="text-3xl font-bold ">Planet Anime is web information for anime</h1>
            <p className="text-gray-500">this web giving more animes and mangas where for content always update</p>
          </div>
          <div className="flex flex-wrap justify-center gap-20 my-4 text-center">
            <div className="p-2">
              <img src={`${imgRead}`} alt="anime-reading" className=" h-[200px] object-cover my-2" />
              <p>Reading Manga populer and latest</p>
            </div>
            <div className="p-2">
              <img src={`${imgWatch}`} alt="anime-reading" className=" h-[200px] object-cover my-2" />
              <p>Streaming Manga populer and latest</p>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="text-center">
            <h1 className="text-4xl">Information Maker This Web</h1>
            <p className="text-gray-500">and more information making this web please contact me</p>
          </div>
          <div className="flex flex-wrap justify-evenly items-center p-2">
            <img src={`${imgProfile}`} alt="" className="w-[400px] h-[400px]" />
            <div>
              <p className="text-center text-lg font-semibold">Profile</p>
              <div className="text-left my-4">
                <p>Name: Desty Fadhila Hakim</p>
                <p className="my-2">Work: Fullstack Web Developer and Ui/Ux</p>
                <p>
                  Portofolio:{" "}
                  <a
                    href="https://portofolio-rouge-pi.vercel.app/"
                    className="text-blue-500 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://portofolio-rouge-pi.vercel.app/
                  </a>
                </p>
              </div>
              <div>
                <p>Contact Me:</p>
                <i className="fa-brands fa-whatsapp mr-4 text-2xl hover:text-green-500"></i>
                <i className="fa-brands fa-instagram text-2xl hover:text-green-500"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 bg-gray-300 md:w-[50%] mx-auto p-2">
          <h1 className="text-center my-2 text-2xl text-gray-900 font-semibold">
            For Order Please fill in this coloum
          </h1>
          <p className="text-center border-b-2 border-b-indigo-400 text-gray-400">this message will send to Whatsapp</p>
          <form action="" onSubmit={(e) => handleSendWa(e)} className="">
            <div className="text-center my-4">
              <div className="p-4">
                <div className="relative mt-6 hover:text-indigo-500 transition-all">
                  <label htmlFor="name" className="absolute -top-8">
                    Name
                  </label>
                  <i className="fa-solid fa-user text-2xl absolute bottom-0"></i>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="ouline-none bg-transparent border-b-2 border-b-white focus:outline-none
                    focus:border-b-blue-500 transition-all ease-in-out delay-75 px-6"
                    value={name}
                    onChange={(e) => handleName(e.target.value)}
                  />
                </div>
                <div className="relative my-12 hover:text-indigo-500 transition-all">
                  <label htmlFor="email" className="absolute -top-8">
                    Email
                  </label>
                  <i className="fa-solid fa-envelope text-2xl absolute bottom-0"></i>
                  <input
                    required
                    type="text"
                    name="email"
                    id="email"
                    className="ouline-none bg-transparent border-b-2 border-b-white focus:outline-none
                    focus:border-b-blue-500 transition-all ease-in-out delay-75 px-6"
                    value={email}
                    onChange={(e) => handleEmail(e.target.value)}
                  />
                </div>
                <div className="relative hover:text-indigo-500 transition-all">
                  <label htmlFor="message" className="absolute -top-8">
                    Message
                  </label>
                  <i className="fa-solid fa-message text-2xl absolute top-0"></i>
                  <textarea
                    required
                    type="text"
                    name="message"
                    id="message"
                    className="ouline-none bg-transparent border-b-2 border-b-white focus:outline-none
                    focus:border-b-blue-500 transition-all ease-in-out delay-75 px-6"
                    value={message}
                    onChange={(e) => handleMessage(e.target.value)}
                  />
                </div>
                <button className="border bg-indigo-500 p-2 rounded-lg my-4 hover:bg-indigo-700">
                  Send <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
