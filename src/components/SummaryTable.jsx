import React, { useState, useEffect } from "react";

// Function to generate dates for a given month and year
const generateActs = (month, year) => {
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

const generateShift = (month, year) => {
    const dates = [];
    const date = new Date(year, month - 1, 1); // JavaScript months are 0-based
  
    while (date.getMonth() === month - 1) {
      dates.push({
        day: new Date(date),
        holiday: date.getDay() === 0 || date.getDay() === 6 ? true : false,
        leave: [],
        morning: null,
        evening: null,
        extra: null,
        night: null,
      });
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  };





const SummaryTable = ({
  month,
  year,
  acts,
  shifts,
  members,
}) => {
  const [actsData, setActs] = useState([]);
  const [shiftsData, setShift] = useState([]);

  useEffect(() => {
    if (acts != null) {
      setActs([...acts]);
    }else{
        setActs(generateActs(month, year));
    }
    if (shifts != null) {
      setShift([...shifts]);
    }else{
        setShift(generateShift(month, year));
    }
  }, [month, year, acts, shifts, members]);

  return (
    <div className="container p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        สรุปจำนวนเวร {month}/{year}
      </h2>
      <table className="table-auto text-sm w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 border-black text-left w-2/12">
              ชื่อ
            </th>
            <th className="border border-black border-l-0">8.00-16.00</th>
            <th className="border border-black border-l-0">16.00-24.00</th>
            <th className="border border-black border-l-0">24.00-8.00</th>
            <th className="border border-black border-l-0">18.00-22.00</th>
            <th className="border border-black border-l-0">total</th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Resus1
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Resus2
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">ER1</th>
            <th className="border px-4 py-2 border-black border-l-0 ">ER2</th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Observe
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              EMS/RRT
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Teaching
            </th>
            <th className="border px-4 py-2 border-black border-l-0 ">
              Refer/AOC
            </th>
            <th className="border px-4 py-2 border-black border-l-0">total</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td
                className="border px-4 py-2 border-black border-l-1"
                style={{ backgroundColor: member.color }}
              >
                {member.name}
              </td>
              <td className="border px-4 py-2 border-black border-l-0">
                {shiftsData.filter((shift) => shift.morning? (shift.morning.value === member.id):"").length}
              </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {shiftsData.filter((shift) => shift.evening? (shift.evening.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {shiftsData.filter((shift) => shift.night? (shift.night.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {shiftsData.filter((shift) => shift.extra? (shift.extra.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {shiftsData.filter((shift) => shift.morning? (shift.morning.value === member.id):"").length + shiftsData.filter((shift) => shift.evening? (shift.evening.value === member.id):"").length + shiftsData.filter((shift) => shift.night? (shift.night.value === member.id):"").length + shiftsData.filter((shift) => shift.extra? (shift.extra.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.resus1? (act.resus1.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.resus2? (act.resus2.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.er1? (act.er1.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.er2? (act.er2.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.observe? (act.observe.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.ems? (act.ems.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.teaching? (act.teaching.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.refer? (act.refer.value === member.id):"").length}
                </td>
                <td className="border px-4 py-2 border-black border-l-0">
                    {actsData.filter((act) => act.resus1? (act.resus1.value === member.id):"").length + actsData.filter((act) => act.resus2? (act.resus2.value === member.id):"").length + actsData.filter((act) => act.er1? (act.er1.value === member.id):"").length + actsData.filter((act) => act.er2? (act.er2.value === member.id):"").length + actsData.filter((act) => act.observe? (act.observe.value === member.id):"").length + actsData.filter((act) => act.ems? (act.ems.value === member.id):"").length + actsData.filter((act) => act.teaching? (act.teaching.value === member.id):"").length + actsData.filter((act) => act.refer? (act.refer.value === member.id):"").length}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
