import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import EditPopup from "./EditPopup";
import { IoSearchSharp } from "react-icons/io5";
import ToggleButton from "./ToggleButton";

const AllNotes = ({ lightMode, setLightMode }) => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editNoteObject, setEditNoteObject] = useState("");
    const [searchText, setSearchText] = useState("");

    const deleteNote = (id) => {
        const newList = notes.filter((note) => note.id !== id);
        setNotes(newList);
        localStorage.setItem("notes", JSON.stringify(newList));
    };

    const editNote = (note) => {
        setEditNoteObject(note);
        setShowEditPopup(true);
    };

    useEffect(() => {
        const filtered = notes.filter((note) => {
            return note.title.toLowerCase().includes(searchText.toLowerCase()) || note.description.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredNotes(filtered);
    }, [searchText]);

    useEffect(() => {
        const notesData = JSON.parse(localStorage.getItem("notes"));
        setNotes(notesData);
        setFilteredNotes(notesData);
    }, []);

    return (
        <div className={`${lightMode ? "bg-pink-100" : "bg-zinc-900"} min-h-screen flex flex-col`}>
            <div className="flex justify-between items-center p-5">
                <Link to={"/"}>
                    <div className={`font-bold text-2xl ${lightMode ? "text-black" : "text-rose-100"}`}> MindPad </div>
                </Link>
                <div className="flex gap-4">
                    <ToggleButton lightMode={lightMode} setLightMode={setLightMode} />
                    <div className={`flex items-center gap-2 border rounded-full px-2 ${lightMode ? "text-black" : "text-rose-100"}`}>
                        <IoSearchSharp size={18} />
                        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search.." className="w-full focus:outline-none" />
                    </div>
                    <Link to={"/"}>
                        <div className={`${lightMode ? "bg-blue-900 text-white shadow-black" : "bg-pink-100 text-black shadow-pink-300"} font-semibold px-4 py-2 rounded-full shadow-md shadow-black cursor-pointer flex items-center gap-2`}>
                            {" "}
                            <RiStickyNoteAddFill /> Add New{" "}
                        </div>
                    </Link>
                </div>
            </div>
            <div className="mx-20">
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry>
                        {filteredNotes.map((note) => {
                            return (
                                <div key={note.id} className="border border-gray-400 rounded-lg p-4 w-full shadow-lg flex flex-col gap-2">
                                    <h2 className={`text-2xl font-semibold ${lightMode ? "text-zinc-800" : "text-rose-200"}`}>{note.title}</h2>
                                    <p className={`text-lg ${lightMode ? "text-black" : "text-white"}`}>{note.description}</p>
                                    <div className="flex gap-2">
                                        <MdOutlineEdit size={22} onClick={() => editNote(note)} className={`cursor-pointer ${lightMode ? "text-blue-900" : "text-rose-100" } hover:scale-120 transition ease-in-out`} />
                                        <MdOutlineDeleteOutline size={22} onClick={() => deleteNote(note.id)} className={`cursor-pointer ${lightMode ? "text-blue-900" : "text-rose-100" } hover:scale-120 transition ease-in-out`} />
                                    </div>
                                </div>
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </div>

            {showEditPopup && (
                <EditPopup
                    closePopup={() => setShowEditPopup(false)}
                    updateNotes={(notes) => {
                        setShowEditPopup(false);
                        setNotes(notes);
                    }}
                    note={editNoteObject}
                />
            )}
        </div>
    );
};

export default AllNotes;
