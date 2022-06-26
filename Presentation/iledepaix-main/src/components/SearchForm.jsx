import { useState } from "react";

const Search = () => {
  const [infos, setSignup] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    const key = e.target.name;
    setSignup((prev) => {
      const newState = {
        ...prev,
        [key]: val,
      };
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data_infos = infos.value;
    console.log(infos);
    const res = await fetch(`http://localhost:8000/search?q=${infos.infos}`, {
      method: "POST",
      body: JSON.stringify(data_infos),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data); // data send by server elastic search
  };

  //   const Jokes = () => {
  //     const [joke, setJoke] = useState({});
  //     const getData = async () => {
  //       const res = await fetch('http://localhost:8000',{
  //       method:'POST',
  //       body:JSON.stringify(infos.infos),
  //       headers:{
  //        Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //       });
  //       const data = await res.json();
  //       setJoke(data);
  //     };

  // }

  return (
    <div className="w-80 bg-[#efdddc] rounded-md m-4 h-full">
      <form action="" className="flex flex-col w-20" onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            name="infos"
            id="infos"
            placeholder="Recherche"
            className="ml-2 rounded-md mt-2 w-20"
            onChange={handleChange}
          />
        </div>

        <select id="dropdown" className="mt-4 ml-2 rounded-md text-black">
          <option value="N/A">Tag:</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select id="dropdown2" className="mt-4 ml-2 rounded-md text-black">
          <option value="N/A">Public</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select id="dropdown3" className="mt-4 ml-2 rounded-md text-black">
          <option value="N/A">Type d'outil</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <select id="dropdown4" className="mt-4 ml-2 rounded-md text-black">
          <option value="N/A">Format</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </form>
      <button
        onClick={handleSubmit}
        type="submit"
        className="px-4 p-1 mt-4 ml-2  mb-2 text-white bg-gray-500 rounded-sm"
      >
        Rechercher
      </button>
    </div>
  );
};

export default Search;
