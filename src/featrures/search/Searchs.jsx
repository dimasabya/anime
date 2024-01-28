import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resultQuery, searchQuery } from "./searchSlice";

const Searchs = () => {
  const query = useSelector(resultQuery);

  const [inp, setInp] = useState("");
  const [type, setType] = useState(query.type);

  const dispath = useDispatch();
  // console.log(query);
  const handleSearch = () => {
    dispath(
      searchQuery({
        q: inp,
        type: type,
      })
    );
  };
  useEffect(() => {
    handleSearch();
  }, [inp, type, query]);

  return (
    <div className="text-center relative">
      <i className="fa-brands fa-searchengin absolute top-2 right-[36rem] text-[1.875rem]"></i>
      <input
        type="text"
        placeholder="cari anime"
        className="p-2"
        value={inp}
        onChange={(e) => setInp(e.target.value)}
      />
      <select name="" id="" className="p-2" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="anime">anime</option>
        <option value="manga">manga</option>
        <option value="karakter">karakter</option>
      </select>
    </div>
  );
};

export default Searchs;
