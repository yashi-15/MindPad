import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import EditPopup from "./EditPopup";

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editNoteObject, setEditNoteObject] = useState("");

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
        setNotes(JSON.parse(localStorage.getItem("notes")));
    }, []);

    return (
        <div className="bg-pink-200 min-h-screen flex flex-col">
            <div className="flex justify-between items-center p-5">
                <Link to={"/"}>
                    <div className="font-bold text-2xl "> MindMap </div>
                </Link>
                <Link to={"/"}>
                    <div className="bg-blue-900 text-white font-semibold px-4 py-2 rounded-full shadow-md shadow-black cursor-pointer flex items-center gap-2">
                        {" "}
                        <RiStickyNoteAddFill /> Add New{" "}
                    </div>
                </Link>
            </div>
            <div className="mx-20">
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                    <Masonry>
                        {notes.map((note) => {
                            return (
                                <div key={note.id} className="border border-gray-400 rounded-lg p-4 w-full shadow-lg flex flex-col gap-2">
                                    <h2 className="text-2xl font-semibold text-pink-800">{note.title}</h2>
                                    <p className="text-lg">{note.description}</p>
                                    <div className="flex gap-2">
                                        <MdOutlineEdit size={22} onClick={() => editNote(note)} className="cursor-pointer text-blue-900 hover:scale-120 transition ease-in-out" />
                                        <MdOutlineDeleteOutline size={22} onClick={() => deleteNote(note.id)} className="cursor-pointer text-blue-900 hover:scale-120 transition ease-in-out" />
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
