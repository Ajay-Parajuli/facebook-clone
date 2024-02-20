import { NavLink } from "@remix-run/react";
import facebook from "../assets/facebook.svg";
import search from "../assets/search.svg";
import plus from "../assets/plus.svg";
import messenger from "../assets/messenger.svg";
import noti from "../assets/noti.svg";
import { useState, useEffect } from "react";

export default function Nav() {
const [searchToggle, setSearchToggle] = useState("false"); 
const [createToggle, setCreateToggle] = useState("false");

useEffect(() => {
    const closeCreateSection = (event) => {
        const createSection = document.getElementById("create");
        if (createSection && !createSection.contains(event.target)) { 
            setCreateToggle(false);
        }
    };

    document.body.addEventListener("click", closeCreateSection);

    return () => {
        document.body.removeEventListener("click", closeCreateSection);
    };
}, []);





const handleSearch = () => {
    setSearchToggle(!searchToggle);
    const input = document.querySelector("input");
    const toggle = document.querySelector("#toggle");

    if (searchToggle) { 
        // Hide the search input and animate the toggle width
        input.classList.add("hidden");
        toggle.style.width = "20%";
        toggle.style.transition = "width 0.5s";
    } else {
        // Show the search input and animate the toggle width
        input.classList.remove("hidden");
        toggle.style.width = "80%";
        
        toggle.style.transition = "width 0.5s";
        input.focus();
    }
};

const handleCreate = () => {
    setCreateToggle(!createToggle);
}


  return (
    <nav className="flex justify-between p-3 items-center w-full shadow-lg relative z-20">
      <div className="flex w-[50%]">
      <NavLink to="/homepage">
    <img className="w-10 " src={facebook} alt="facebook logo" />
      </NavLink>
      <div id="toggle" className="flex h-10 rounded-3xl items-center pl-2 ml-1 bg-gray-200 w-[20%]">
      <img className="w-5" src={search} alt="searchicon" onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search"
          className="p-1 outline-none w-full bg-transparent hidden"
        />
        </div>
      </div>
      <div className="flex w-[50%] justify-end" onClick={handleCreate}>
        <div className="mr-2">
        <img className="w-8" src={plus} alt="plus" />
        </div>
        <div id="create" className={`absolute shadow-lg w-[90%]  flex-col pl-3 transition-all flex pr-3 ${createToggle ? 'bottom-[-145px] z-[-10] ' : 'bottom-[100px] z-[-10]'}`}>
        <h2 className="font-bold mt-2 mb-5">Create</h2>
        <NavLink className="mb-4 border-b-2 " to="/homepage">
            Create Post
        </NavLink>
        <NavLink className="mb-2 border-b-2" to="/homepage">
            Create Story
        </NavLink>
    </div>
   
      <NavLink className="mr-2" to="/messages">
    <img className="w-8" src={messenger} alt="facebook logo" />
      </NavLink>
      <NavLink className="mr-2" to="/homepage">
    <img className="w-8" src={noti} alt="facebook logo" />
      </NavLink>
      <NavLink to="/homepage">
    <img className="w-8" src={facebook} alt="facebook logo" />
      </NavLink>
      </div>
    </nav>
  );
}
