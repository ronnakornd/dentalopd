import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebaseconfig";
import Select from "react-select";
import { data } from "autoprefixer";
import { color } from "@uiw/react-color";

function MemberSelector({onChange, parentMembers, value}) {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [membersOption, setMembersOption] = useState([]);
  const membersCollectionRef = collection(db, "members");
  const fetchMembers = async () => {
    const data = await getDocs(membersCollectionRef);
    if (!data.empty) {
      let membersData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMembersOption(
        membersData.map((member) => ({ value: member.id, label: member.name, color: member.color}))
      );
      setMembers(membersData);
      parentMembers(membersData);
    } else {
      setMembers([]);
      setMembersOption([]);
      console.log("No members found");
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedMember(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };

  useEffect(() => {
      fetchMembers();
      setSelectedMember(value);
  },[value]);


  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  return (
    <Select
      id="member"
      value={selectedMember}
      onChange={handleChange}
      options={membersOption}
      styles={{singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),input: (styles) => ({ ...styles, ...dot() }),}}
      classNamePrefix="react-select"
      className="w-54"
      placeholder="Select a member"
    />
  );
}

export default MemberSelector;
