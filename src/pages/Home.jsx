import React, { useEffect, useState, useRef } from "react";
import YearSelector from "../components/YearSelector";
import MonthSelector from "../components/MonthSelector";
import DateTable from "../components/DateTable";
import MemberSelector from "../components/MemberSelector";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebaseconfig.js";
import { useReactToPrint } from "react-to-print";

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [editHoliday, setEditHoliday] = useState(false);
  const [editLeave, setEditLeave] = useState(false);
  const [selectedMember, setSelectedMember] = useState();
  const [members, setMembers] = useState([]);
  const [dates, setDates] = useState(null);
  const [shiftId, setShiftId] = useState(null);
  const printRef = useRef();

  const handleSave = async () => {
    if (dates.length === 0) {
      alert("Please create a table first");
      return;
    }
    if (shiftId == null) {
      addShift();
    } else {
      updateShift();
    }
  };

  const fetchShift = async () => {
    const data = await getDocs(collection(db, "shifts"));
    if (!data.empty) {
      const shifts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const shift = shifts.find(
        (shift) => shift.month === selectedMonth && shift.year === selectedYear
      );
      if (shift) {
        setShiftId(shift.id);
        const transformedDates = shift.data.map((item) => {
          let { day, ...exceptDayData } = item;
          return {
            day: item.day.toDate(),
            ...exceptDayData,
          };
        });
        setDates(transformedDates);
      } else {
        setShiftId(null);
        setDates(null);
      }
    } else {
      setShiftId(null);
      setDates(null);
    }
  };

  const addShift = async () => {
    try {
      await addDoc(collection(db, "shifts"), {
        month: selectedMonth,
        year: selectedYear,
        data: dates,
      });
      alert("บันทึกสำเร็จ");
    } catch (error) {
      console.error("Error adding shift: ", error);
    }
  };

  const updateShift = async () => {
    try {
      await updateDoc(doc(db, "shifts", shiftId), { data: dates });
      alert("บันทึกสำเร็จ");
    } catch (error) {
      console.error("Error updating shift: ", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    setShiftId(null);
    fetchShift();
  }, [selectedMonth, selectedYear]);

  return (
    <div>
      <div className="w-full flex justify-start items-center">
        <div className="flex justify-center items-center gap-2 p-5">
          <h1>เลือกเดือน</h1>
          <MonthSelector onChange={setSelectedMonth} />
          <YearSelector onChange={setSelectedYear} />
        </div>
        <div className="flex justify-center items-center gap-2 p-5">
          <h1>เลือกรายชื่อ</h1>
          <MemberSelector
            onChange={setSelectedMember}
            value={selectedMember}
            parentMembers={setMembers}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-neutral"
            onClick={() => setSelectedMember(null)}
          >
            Unselect
          </button>
          <button
            className={`btn ${editHoliday ? "btn-error" : "btn-secondary"}`}
            onClick={() => setEditHoliday(!editHoliday)}
          >
            แก้ไขวันหยุด
          </button>
          <button className={`btn ${editLeave ? "btn-error" : "btn-accent"}`} onClick={() => setEditLeave(!editLeave)} >  
            ขอไม่เวร
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            save
          </button>
          <button className="btn btn-info" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
      <DateTable
        month={selectedMonth}
        year={selectedYear}
        editHoliday={editHoliday}
        selectedMember={selectedMember}
        members={members}
        onChange={setDates}
        editLeave={editLeave}
        value={dates}
        ref={printRef}
      />
    </div>
  );
};

export default Home;
