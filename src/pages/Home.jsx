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
  const [history, setHistory] = useState([]);
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

  const onChange = (data) => {
    setDates([...data]);
    setHistory((prev = []) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        if (JSON.stringify(last) === JSON.stringify(data)) {
          return prev;
        }
        return [...prev, data];
      }
    });
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setDates(newHistory[newHistory.length - 1]);
    }
  };
  

  useEffect(() => {
    setShiftId(null);
    fetchShift();
  }, [selectedMonth, selectedYear]);

  const generateDates = (month, year) => {
    const dates = [];
    const date = new Date(year, month - 1, 1); // JavaScript months are 0-based

    while (date.getMonth() === month - 1) {
      dates.push({
        day: new Date(date),
        holiday: date.getDay() === 0 || date.getDay() === 6 ? true : false,
        morning: {
          compre: [],
          ptu: [],
          sp: [],
          rotate: [],
          service: [],
          academic: [],
          standBy: [],
          leave: [],
          off: [],
        },
        afternoon: {
          compre: [],
          ptu: [],
          sp: [],
          rotate: [],
          service: [],
          academic: [],
          standBy: [],
          leave: [],
          off: [],
        },
      });
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

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
          <button
            className={`btn ${editLeave ? "btn-error" : "btn-accent"}`}
            onClick={() => setEditLeave(!editLeave)}
          >
            ขอไม่เวร
          </button>
        </div>
      </div>
      <div className="w-full px-20 flex justify-end items-center gap-2">
        <button className="btn" onClick={undo}>
          <svg
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.2071 2.29289C12.5976 2.68342 12.5976 3.31658 12.2071 3.70711L10.9142 5H12.5C17.1523 5 21 8.84772 21 13.5C21 18.1523 17.1523 22 12.5 22C7.84772 22 4 18.1523 4 13.5C4 12.9477 4.44772 12.5 5 12.5C5.55228 12.5 6 12.9477 6 13.5C6 17.0477 8.95228 20 12.5 20C16.0477 20 19 17.0477 19 13.5C19 9.95228 16.0477 7 12.5 7H10.9142L12.2071 8.29289C12.5976 8.68342 12.5976 9.31658 12.2071 9.70711C11.8166 10.0976 11.1834 10.0976 10.7929 9.70711L7.79289 6.70711C7.40237 6.31658 7.40237 5.68342 7.79289 5.29289L10.7929 2.29289C11.1834 1.90237 11.8166 1.90237 12.2071 2.29289Z"
            />
          </svg>
        </button>
        <button
          className="btn "
          onClick={() => setDates(generateDates(selectedMonth, selectedYear))}
        >
          Clear
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          save
        </button>
        <button className="btn btn-info" onClick={handlePrint}>
          Print
        </button>
      </div>
      <DateTable
        month={selectedMonth}
        year={selectedYear}
        editHoliday={editHoliday}
        selectedMember={selectedMember}
        members={members}
        onChange={onChange}
        editLeave={editLeave}
        value={dates}
        ref={printRef}
        generateDates={generateDates}
      />
    </div>
  );
};

export default Home;
