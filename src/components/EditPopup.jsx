import React, { useState } from "react";
import { IoIosSave } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

const EditPopup = ({ closePopup, note, updateNotes }) => {
    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);

    const saveNote = () => {
        const data = {
            lastEdited: new Date(),
            title,
            description,
        };
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes = notes.map((n) => (n.id === note.id ? { ...n, ...data } : n));
        localStorage.setItem("notes", JSON.stringify(notes));
        updateNotes(notes);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[80vw] h-[80vh] bg-white rounded-xl shadow-lg flex flex-col gap-2">
                <div className="flex justify-between p-4">
                    <h2>Edit</h2>
                    <button onClick={closePopup} className="cursor-pointer">
                        <RxCross1 />
                    </button>
                </div>
                <div className="grow m-4 p-2 flex flex-col gap-2 overflow-y-scroll">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-5xl focus:outline-none" />
                    <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full text-lg focus:outline-none" />
                </div>
                <div className="flex justify-end p-4">
                    <button
                        onClick={saveNote}
                        disabled={title === note.title && description === note.description}
                        className={`border-2 ${title === note.title && description === note.description ? "border-gray-500 text-gray-500 cursor-not-allowed" : "border-blue-900 text-blue-900 cursor-pointer"}  font-semibold px-4 py-2 rounded-full shadow-sm shadow-black flex gap-2 items-center`}
                    >
                        {" "}
                        <IoIosSave /> Save{" "}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
