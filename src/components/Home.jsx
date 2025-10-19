import React, { useEffect, useState } from "react";
import { IoIosSave } from "react-icons/io";
import { Link } from "react-router-dom";

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    
    const saveNote = () => {
        const data = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            lastEdited: new Date(),
            title,
            description
        }
        let notes = JSON.parse(localStorage.getItem("notes")) || []
        notes.push(data)
        localStorage.setItem("notes", JSON.stringify(notes))
        setTitle("")
        setDescription("")
    };

    return (
        <div className="bg-pink-200 min-h-screen flex flex-col">
            <div className="flex justify-between items-center p-5">
                <div className="font-bold text-2xl "> MindPad </div>
                <div className="flex gap-4">
                    <button onClick={saveNote} disabled={title === "" || description === ""} className={`border-2 ${title === "" || description === "" ? "border-gray-500 text-gray-500 cursor-not-allowed": "border-blue-900 text-blue-900 cursor-pointer" }  font-semibold px-4 py-2 rounded-full shadow-sm shadow-black flex gap-2 items-center`}>
                        {" "}
                        <IoIosSave /> Save{" "}
                    </button>
                    <Link to={"/all-notes"}>
                        <button className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-full shadow-md shadow-black cursor-pointer"> View Notes </button>
                    </Link>
                </div>
            </div>
            <div className="w-[70%] flex flex-col gap-3 mx-auto p-2">
                <input type="text" placeholder="Add Title.." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-5xl focus:outline-none" />
                <textarea placeholder="Type here..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-[75vh] text-lg focus:outline-none" />
            </div>
        </div>
    );
};
 
export default Home;
