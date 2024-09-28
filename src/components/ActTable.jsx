import React, { useState, useEffect } from "react";
import "../printStyles.css";
// Function to generate dates for a given month and year
const generateDates = (month, year) => {
  const dates = [];
  const date = new Date(year, month - 1, 1); // JavaScript months are 0-based

  while (date.getMonth() === month - 1) {
    dates.push({
      day: new Date(date),
      holiday: date.getDay() === 0 || date.getDay() === 6 ? true : false,
      resus1: null,
      resus2: null,
      er1: null,
      er2: null,
      observe: null,
      ems: null,
      teaching: null,
      refer: null,
    });
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// Array to map weekdays to Thai names
const weekdaysInThai = [
  "อาทิตย์", // Sunday
  "จันทร์", // Monday
  "อังคาร", // Tuesday
  "พุธ", // Wednesday
  "พฤหัสบดี", // Thursday
  "ศุกร์", // Friday
  "เสาร์", // Saturday
];

const dayColor = [
  "bg-red-300", // Sunday
  "bg-yellow-300", // Monday
  "bg-pink-300", // Tuesday
  "bg-green-300", // Wednesday
  "bg-orange-300", // Thursday
  "bg-blue-300", // Friday
  "bg-purple-300", // Saturday
];

const ActTable = React.forwardRef(
  (
    { month, year, editHoliday, selectedMember, onChange, value, members },
    ref
  ) => {
    const [dates, setDates] = useState(generateDates(month, year));
    const toggleHoliday = (index) => {
      if (editHoliday) {
        dates[index].holiday = !dates[index].holiday;
        setDates([...dates]);
      }
    };
    const selectShift = (index, shift) => {
      let currentDates = dates;
      if (currentDates[index][shift] == selectedMember) {
        currentDates[index][shift] = null;
        setDates([...currentDates]);
        return;
      }
      currentDates[index][shift] = selectedMember;
      onChange([...currentDates]);
      setDates([...currentDates]);
    };

    useEffect(() => {
      if (value != null) {
        setDates(value);
      } else {
        setDates(generateDates(month, year));
        onChange(generateDates(month, year));
      }
    }, [month, year, value, members]);

    return (
      <div className="container p-5 print-container" ref={ref}>
        <h2 className="text-2xl font-bold mb-4">
          ตารางเวรในเวลา {month}/{year}
        </h2>
        <table className="table-auto w-full border-collapse print-container">
          <thead>
            <tr>
              <th className="border px-4 py-2 border-black text-left w-2/12">
                วันที่
              </th>
              <th className="border border-black border-l-0 text-center text-xs no-print">วันหยุด</th>
              <th className="border px-4 py-2 border-black border-l-0 text center text-xs ">
                Resus1
              </th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">
                Resus2
              </th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">ER1</th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">ER2</th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">
                Observe
              </th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">
                EMS/RRT
              </th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">
                Teaching
              </th>
              <th className="border px-4 py-2 border-black border-l-0 text-center text-xs ">
                Refer/AOC
              </th>
            </tr>
          </thead>
          <tbody>
            {dates.map((date, index) => (
              <tr key={index} className={`${date.holiday ? "no-print":""}`}>
                <td
                  className={`border px-3 py-2 border-black  ${
                    dayColor[date.day.getDay()]
                  }`}
                >
                  {weekdaysInThai[date.day.getDay()]}{" "}
                  {date.day.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </td>
                <td
                  className={`border border-black border-l-0 no-print text-center text-xs hover:bg-slate-600 ${
                    date.holiday ? "bg-red-400" : ""
                  }`}
                  onClick={() => toggleHoliday(index)}
                ></td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs    ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "resus1")}
                  style={{
                    backgroundColor: date.resus1
                      ? members.find((member) => member.id == date.resus1.value)
                          ?.color
                      : "",
                  }}
                >
                  {date.resus1
                    ? members.find((member) => member.id == date.resus1.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  style={{
                    backgroundColor: date.resus2
                      ? members.find((member) => member.id == date.resus2.value)
                          ?.color
                      : "",
                  }}
                  onClick={() => selectShift(index, "resus2")}
                >
                  {date.resus2
                    ? members.find((member) => member.id == date.resus2.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "er1")}
                  style={{
                    backgroundColor: date.er1
                      ? members.find((member) => member.id == date.er1.value)
                          ?.color
                      : "",
                  }}
                >
                  {date.er1
                    ? members.find((member) => member.id == date.er1.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "er2")}
                  style={{
                    backgroundColor: date.er2
                      ? members.find((member) => member.id == date.er2.value)
                          ?.color
                      : "",
                  }}
                >
                  {date.er2
                    ? members.find((member) => member.id == date.er2.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "observe")}
                  style={{
                    backgroundColor: date.observe
                      ? members.find(
                          (member) => member.id == date.observe.value
                        )?.color
                      : "",
                  }}
                >
                  {date.observe
                    ? members.find((member) => member.id == date.observe.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "ems")}
                  style={{
                    backgroundColor: date.ems
                      ? members.find((member) => member.id == date.ems.value)
                          ?.color
                      : "",
                  }}
                >
                  {date.ems
                    ? members.find((member) => member.id == date.ems.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "teaching")}
                  style={{
                    backgroundColor: date.teaching
                      ? members.find(
                          (member) => member.id == date.teaching.value
                        )?.color
                      : "",
                  }}
                >
                  {date.teaching
                    ? members.find((member) => member.id == date.teaching.value)
                        ?.name
                    : ""}
                </td>
                <td
                  className={`border  border-black border-l-0 text-center text-xs  ${
                    date.holiday ? "bg-slate-400 " : ""
                  }`}
                  onClick={() => selectShift(index, "refer")}
                  style={{
                    backgroundColor: date.refer
                      ? members.find((member) => member.id == date.refer.value)
                          ?.color
                      : "",
                  }}
                >
                  {date.refer
                    ? members.find((member) => member.id == date.refer.value)
                        ?.name
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
<style type="text/css" media="print">
  {
    "\
@page { size: landscape; }\
"
  }
</style>;
export default ActTable;
