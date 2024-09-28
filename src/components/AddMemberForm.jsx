import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebaseconfig.js"; // Ensure this import path matches your project structure
import { Compact } from "@uiw/react-color";

const AddMemberForm = ({ fetchMember }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#fff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddMember = async () => {
    if (name.trim() === "") {
      alert("Please enter a name.");
      return;
    }
    try {
      await addDoc(collection(db, "members"), { name, color: selectedColor });
      setSelectedColor("#fff");
      setName(""); // Reset the input field after adding
      await fetchMember(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding member: ", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="input"
        placeholder="Enter member's name"
      />
      {!showColorPicker && (
        <button
          className="btn"
          onClick={() => setShowColorPicker(true)}
          style={{ backgroundColor: selectedColor }}
        >
          <div className="invisible hover:visible">เลือกสี</div>
        </button>
      )}
      {showColorPicker && (
        <Compact
          color={selectedColor}
          onChange={(color) => {
            setSelectedColor(color.hex);
            setShowColorPicker(false);
          }}
        />
      )}
      <button className="btn  btn-primary" onClick={handleAddMember}>
        เพิ่ม
      </button>
    </div>
  );
};

export default AddMemberForm;
