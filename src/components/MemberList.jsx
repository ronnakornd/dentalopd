// Import necessary functions and libraries
import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebaseconfig"; // Assuming db is exported from firebaseconfig.js
import AddMemberForm from "./AddMemberForm";
import { Compact } from "@uiw/react-color";
// Define the component
const MembersList = ({ edit }) => {
  const [members, setMembers] = useState([]);
  const membersCollectionRef = collection(db, "members");
  // Fetch members
  const fetchMembers = async () => {
    const data = await getDocs(membersCollectionRef);
    if (!data.empty) {
      setMembers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          showColorPicker: false,
        }))
      );
    } else {
      setMembers([]);
      console.log("No members found");
    }
  };

  // Update a member
  const updateMember = async (id, updatedMember) => {
    const memberDoc = doc(db, "members", id);
    await updateDoc(memberDoc, updatedMember);
    fetchMembers(); // Refresh the list after updating
  };

  // Delete a member
  const deleteMember = async (id) => {
    const memberDoc = doc(db, "members", id);
    await deleteDoc(memberDoc);
    fetchMembers(); // Refresh the list after deleting
  };

  // Fetch members on component mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (event, id) => {
    const updatedMember = { name: event.target.value };
    updateMember(id, updatedMember);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {edit &&
        members.map((member, index) => {
          return (
            <div className="flex gap-2">
              <div key={member.id}>
                <input
                  type="text"
                  className="input input-bordered"
                  value={member.name}
                  onChange={(event) => handleChange(event, member.id)}
                ></input>
              </div>
              {!member.showColorPicker && (
                <button
                  className="btn"
                  onClick={() => {
                    let currentMembers = members;
                    currentMembers[index].showColorPicker = true;
                    setMembers([...currentMembers]);
                  }}
                  style={{ backgroundColor: member.color }}
                >
                  <div className="invisible hover:visible">เลือกสี</div>
                </button>
              )}
              {member.showColorPicker && (
                <Compact
                  color={member.color}
                  onChange={(color) => {
                    updateMember(member.id, { color: color.hex });
                  }}
                />
              )}
              <div
                className="btn btn-error"
                onClick={() => deleteMember(member.id)}
              >
                ลบ
              </div>
            </div>
          );
        })}
      {edit && <AddMemberForm fetchMember={fetchMembers} />}
      {!edit &&
        members.map((member) => {
          return (
            <div key={member.id} className="flex gap-2">
              <div className="text-xl">{member.name}</div>
              <div
                className="rounded-full w-5 h-5"
                style={{ backgroundColor: member.color }}
              ></div>
            </div>
          );
        })}
    </div>
  );
};

export default MembersList;
