import React, { useEffect, useState, useRef } from "react";
import YearSelector from "../components/YearSelector";
import MonthSelector from "../components/MonthSelector";
import ActTable from "../components/ActTable";
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


const Act = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMember, setSelectedMember] = useState();
  const [dates, setDates] = useState(null);
  const [shift, setShift] = useState();
  const [members, setMembers] = useState([]);
  const [prevShift, setPrevShift] = useState();
  const [actId, setActId] = useState(null);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const handleSave = async () => {
    if (dates.length === 0) {
      alert("Please create a table first");
      return;
    }
    if (actId == null) {
      addAct();
    } else {
      updateAct();
    }
  };

  const fetchShift = async () => {
    const data = await getDocs(collection(db, "shifts"));
    if (!data.empty) {
      const shifts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const shiftData = shifts.find(
        (shift) => shift.month === selectedMonth && shift.year === selectedYear
      );
      if (shiftData) {
        const transformedDates = shiftData.data.map((item) => {
          let {day, ...exceptDayData} = item;
          return {
            day: item.day.toDate(),
            ...exceptDayData
          };
        });
        setShift(transformedDates);
        let prevMonth = selectedMonth - 1 === 0 ? 12 : selectedMonth - 1;
        let prevYear =
          selectedMonth - 1 === 0 ? selectedYear - 1 : selectedYear;
        const prevShiftData = shifts.find(
          (shift) => shift.month === prevMonth && shift.year === prevYear
        );
        const transformedPrevDates = prevShiftData.data.map((item) => {
          let {day, ...exceptDayData} = item;
          return {
            day: item.day.toDate(),
            ...exceptDayData
          };
        });
        setPrevShift(transformedPrevDates);
      } else {
        setShift(null);
        setPrevShift(null);
      }
    } else {
      setShift(null);
      setPrevShift(null);
    }
  };

  const fetchAct = async () => {
    const data = await getDocs(collection(db, "acts"));
    if (!data.empty) {
      const acts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const act = acts.find(
        (act) => act.month === selectedMonth && act.year === selectedYear
      );
      if (act) {
        setActId(act.id);
        const transformedDates = act.data.map((item) => {
          let {day, ...exceptDayData} = item;
          return {
            day: item.day.toDate(),
            ...exceptDayData
          };
        });
        setDates(transformedDates);
      } else {
        setActId(null);
        setDates(null);
      }
    } else {
      setActId(null);
      setDates(null);
    }
  };

  const addAct = async () => {
    try {
      await addDoc(collection(db, "acts"), {
        month: selectedMonth,
        year: selectedYear,
        data: dates,
      });
      alert("บันทึกสำเร็จ");
    } catch (error) {
      console.error("Error adding shift: ", error);
    }
  };

  const updateAct = async () => {
    try {
      await updateDoc(doc(db, "acts", actId), { data: dates });
      alert("บันทึกสำเร็จ");
    } catch (error) {
      console.error("Error updating shift: ", error);
    }
  };

  const syncTable = async () => {
    fetchShift();
    let currentDates = dates;
    let prevDates = prevShift;
    currentDates.forEach((date, index) => {
      date.holiday = shift[index].holiday;
      if (!shift[index].holiday) {
        if (index == 0) {
          let lastShift = prevShift.pop();
          date.resus2 = lastShift.evening;
          date.teaching = lastShift.night;
        } else {
          date.resus2 = shift[index - 1].evening;
          date.teaching = shift[index - 1].night;
        }
        date.observe = shift[index].evening;
      }
    });
    setDates([...currentDates]);
  };

  useEffect(() => {
    setActId(null);
    fetchShift();
    fetchAct();
  }, [selectedMonth, selectedYear]);

  return (
    <>
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
            parentMembers={setMembers}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn btn-warning" onClick={syncTable}>
            sync table
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            save
          </button>
          <button className="btn btn-info" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
      <ActTable
        month={selectedMonth}
        year={selectedYear}
        selectedMember={selectedMember}
        onChange={setDates}
        value={dates}
        members={members}
        ref={printRef}
      />
    </>
  );
};



export default Act;
