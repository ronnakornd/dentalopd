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
import Select from "react-select";
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

  const shiftOptions = [
    { value: "none", label: "ไม่ฟิก" },
    { value: "mondayMorning", label: "จันทร์เช้า" },
    { value: "mondayAfternoon", label: "จันทร์บ่าย" },
    { value: "mondayMorningEven", label: "จันทร์ เช้า คู่" },
    { value: "mondayMorningOdd", label: "จันทร์ เช้า คี่" },
    { value: "mondayAfternoonEven", label: "จันทร์ บ่าย คู่" },
    { value: "mondayAfternoonOdd", label: "จันทร์ บ่าย คี่" },
    { value: "GSCmondayMorning", label: "Gจันทร์เช้า" },
    { value: "GSCmondayAfternoon", label: "Gจันทร์บ่าย" },
    { value: "GSCmondayMorningEven", label: "Gจันทร์ เช้า คู่" },
    { value: "GSCmondayMorningOdd", label: "Gจันทร์ เช้า คี่" },
    { value: "tuesdayMorning", label: "อังคารเช้า" },
    { value: "tuesdayAfternoon", label: "อังคารบ่าย" },
    { value: "tuesdayMorningEven", label: "อังคาร เช้า คู่" },
    { value: "tuesdayMorningOdd", label: "อังคาร เช้า คี่" },
    { value: "tuesdayAfternoonEven", label: "อังคาร บ่าย คู่" },
    { value: "tuesdayAfternoonOdd", label: "อังคาร บ่าย คี่" },
    { value: "GSCtuesdayMorning", label: "Gอังคารเช้า" },
    { value: "GSCtuesdayAfternoon", label: "Gอังคารบ่าย" },
    { value: "GSCtuesdayMorningEven", label: "Gอังคาร เช้า คู่" },
    { value: "GSCtuesdayMorningOdd", label: "Gอังคาร เช้า คี่" },
    { value: "GSCtuesdayAfternoonEven", label: "Gอังคาร บ่าย คู่" },
    { value: "GSCtuesdayAfternoonOdd", label: "Gอังคาร บ่าย คี่" },
    { value: "wednesdayMorning", label: "พุธเช้า" },
    { value: "wednesdayAfternoon", label: "พุธบ่าย" },
    { value: "wednesdayMorningEven", label: "พุธ เช้า คู่" },
    { value: "wednesdayMorningOdd", label: "พุธ เช้า คี่" },
    { value: "wednesdayAfternoonEven", label: "พุธ บ่าย คู่" },
    { value: "wednesdayAfternoonOdd", label: "พุธ บ่าย คี่" },
    { value: "GSCwednesdayMorning", label: "Gพุธเช้า" },
    { value: "GSCwednesdayAfternoon", label: "Gพุธบ่าย" },
    { value: "GSCwednesdayMorningEven", label: "Gพุธ เช้า คู่" },
    { value: "GSCwednesdayMorningOdd", label: "Gพุธ เช้า คี่" },
    { value: "GSCwednesdayAfternoonEven", label: "Gพุธ บ่าย คู่" },
    { value: "GSCwednesdayAfternoonOdd", label: "Gพุธ บ่าย คี่" },
    { value: "thursdayMorning", label: "พฤหัสเช้า" },
    { value: "thursdayAfternoon", label: "พฤหัสบ่าย" },
    { value: "thursdayMorningEven", label: "พฤหัส เช้า คู่" },
    { value: "thursdayMorningOdd", label: "พฤหัส เช้า คี่" },
    { value: "thursdayAfternoonEven", label: "พฤหัส บ่าย คู่" },
    { value: "thursdayAfternoonOdd", label: "พฤหัส บ่าย คี่" },
    { value: "GSCthursdayMorning", label: "Gพฤหัสเช้า" },
    { value: "GSCthursdayAfternoon", label: "Gพฤหัสบ่าย" },
    { value: "GSCthursdayMorningEven", label: "Gพฤหัส เช้า คู่" },
    { value: "GSCthursdayMorningOdd", label: "Gพฤหัส เช้า คี่" },
    { value: "GSCthursdayAfternoonEven", label: "Gพฤหัส บ่าย คู่" },
    { value: "GSCthursdayAfternoonOdd", label: "Gพฤหัส บ่าย คี่" },
    { value: "fridayMorning", label: "ศุกร์เช้า" },
    { value: "fridayAfternoon", label: "ศุกร์บ่าย" },
    { value: "fridayMorningEven", label: "ศุกร์ เช้า คู่" },
    { value: "fridayMorningOdd", label: "ศุกร์ เช้า คี่" },
    { value: "fridayAfternoonEven", label: "ศุกร์ บ่าย คู่" },
    { value: "fridayAfternoonOdd", label: "ศุกร์ บ่าย คี่" },
    { value: "GSCfridayMorning", label: "Gศุกร์เช้า" },
    { value: "GSCfridayAfternoon", label: "Gศุกร์บ่าย" },
    { value: "GSCfridayMorningEven", label: "Gศุกร์ เช้า คู่" },
    { value: "GSCfridayMorningOdd", label: "Gศุกร์ เช้า คี่" },
    { value: "GSCfridayAfternoonEven", label: "Gศุกร์ บ่าย คู่" },
    { value: "GSCfridayAfternoonOdd", label: "Gศุกร์ บ่าย คี่" },
  ];

  return (
    <div className="flex flex-col gap-2 w-auto">
      {edit &&
        members.map((member, index) => {
          return (
            <div className="flex justify-center items-center gap-3">
              <div key={member.id}>
                <input
                  type="text"
                  className="input input-bordered rounded-sm"
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
              <div className="flex justify-start items-center gap-2 w-full">
                <div>
                  <label className="w-20" htmlFor="">
                    Fix SP
                  </label>
                  <Select
                    className="w-36 h-full"
                    defaultValue={
                      member.fixSP
                        ? shiftOptions.find(
                            (item) => item.value == member.fixSP
                          )
                        : null
                    }
                    options={shiftOptions}
                    onChange={(selectedShift) =>
                      updateMember(member.id, { fixSP: selectedShift.value })
                    }
                  />
                </div>
                <div>
                  <label className="w-20" htmlFor="">
                    Fix Rotate
                  </label>
                  <Select
                    className="w-36 h-full"
                    defaultValue={
                      member.fixRotate
                        ? shiftOptions.find(
                            (item) => item.value == member.fixRotate
                          )
                        : null
                    }
                    options={shiftOptions}
                    onChange={(selectedShift) =>
                      updateMember(member.id, {
                        fixRotate: selectedShift.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="w-20" htmlFor="">
                    Fix Service
                  </label>
                  <Select
                    className="w-36 h-full"
                    defaultValue={
                      member.fixService
                        ? shiftOptions.find(
                            (item) => item.value == member.fixService
                          )
                        : null
                    }
                    options={shiftOptions}
                    onChange={(selectedShift) =>
                      updateMember(member.id, {
                        fixService: selectedShift.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="w-20" htmlFor="">
                    Fix Others
                  </label>
                  <Select
                    className="w-36 h-full"
                    defaultValue={
                      member.fixOthers
                        ? shiftOptions.find(
                            (item) => item.value == member.fixOthers
                          )
                        : null
                    }
                    options={shiftOptions}
                    onChange={(selectedShift) =>
                      updateMember(member.id, {
                        fixOthers: selectedShift.value,
                      })
                    }
                  />
                </div>
              </div>
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
