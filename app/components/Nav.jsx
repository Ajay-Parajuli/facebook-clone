import { NavLink } from "@remix-run/react";
import facebook from "../assets/facebook.svg";
import search from "../assets/search.svg";
import plus from "../assets/plus.svg";
import messenger from "../assets/messenger.svg";
import noti from "../assets/noti.svg";
import { useState } from "react";
import { useLoaderData } from "@remix-run/react";

export default function Nav() {
    const { user } = useLoaderData();  
    const [image, setImage] = useState(user.image);
    const [searchToggle, setSearchToggle] = useState(false); 
    const [createToggle, setCreateToggle] = useState(false);

    const handleSearch = () => {
        setSearchToggle(!searchToggle);
        if (searchToggle === false) {
           const search = document.getElementById("search")
           search.focus();
        }
    };

    const handleCreate = () => {
        setCreateToggle(!createToggle);
    };

    return (
        <nav className="flex justify-between p-2 h-[60px] items-center w-full shadow-lg relative z-20 md:p-3 md:h-[70px] lg:h-[85px]">
            <div className="flex w-[60%] items-center">
                <NavLink to="/homepage">
                    <img className="w-10 mr-2 lg:w-14 " src={facebook} alt="facebook logo" />
                </NavLink> 
                <div id="toggle" className={`flex h-10 rounded-3xl items-center pl-2 bg-gray-200 transition-all lg:ml-3  ${searchToggle ? 'w-[80%] xl:w-[50%] 2xl:w-[40%]' : 'w-[35px] md:w-[38px] lg:w-[50px]'}`}>
                    <img className="w-[18px] md:w-[22px] lg:w-[28px]" src={search} alt="searchicon" onClick={handleSearch} />
                    <input
                        type="text"
                        placeholder="Search"
                        id="search"
                        className={`p-1 outline-none bg-transparent transition-all ${searchToggle ? 'w-full' : 'w-0'}`}
                        
                    />
                </div>
            </div>
            <div className="flex w-[40%] justify-end items-center" onClick={handleCreate}>
                <div className="mr-2 md:mr-5 lg:mr-7 ">
                    <img className="w-7 md:w-8 lg:w-9  " src={plus} alt="plus" />
                </div>
                <div id="create" className={`absolute shadow-lg w-[90%]  flex-col pl-3 transition-all flex pr-3 ${createToggle ? 'bottom-[-145px] z-[-10]' : 'bottom-[100px] z-[-10]'}`}>
                    <h2 className="font-bold mtmd mb-5 lg:mr-7">Create</h2>
                    <NavLink className="mb-4 border-b-2 " to="/homepage">
                        Create Post
                    </NavLink>
                    <NavLink className="mb-2 border-b-2" to="/homepage">
                        Create Story
                    </NavLink>
                </div>
                <NavLink className="mr-2 md:mr-5 lg:mr-7" to="/messages">
                    <img className="w-7 md:w-8 lg:w-9 " src={messenger} alt="facebook logo" />
                </NavLink>
                <NavLink className="mr-2 md:mr-5 lg:mr-7" to="/homepage">
                    <img className="w-7 md:w-8 lg:w-9 " src={noti} alt="facebook logo" />
                </NavLink>
                <div className="">
                    <img
          id="image-preview"
          className="w-7 h-7 object-cover rounded-full md:h-8 lg:h-9 md:w-8 lg:w-9"
          src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
          alt="Choose"
          onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
        />
                </div>
            </div>
        </nav>
    );
}
