import React, { useState, useEffect } from "react";
import "../printStyles.css";
// Function to generate dates for a given month and year


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

const DateTable = React.forwardRef(
  (
    {
      month,
      year,
      editHoliday,
      editLeave,
      selectedMember,
      members,
      onChange,
      value,
      generateDates
    },
    ref
  ) => {
    const [dates, setDates] = useState(generateDates(month, year));
    const toggleHoliday = (day) => {
      const index = dates.findIndex(
        (date) => date.day.getTime() === day.getTime()
      );
      if (editHoliday) {
        dates[index].holiday = !dates[index].holiday;
        setDates([...dates]);
      }
    };

    const selectShift = (day, act, shift) => {
      const index = dates.findIndex(
        (date) => date.day.getTime() === day.getTime()
      );
      if (!selectedMember) return;
      let currentDates = dates;
      if(act === "off"){
        if(!currentDates[index][shift].leave.includes(selectedMember.value)){
          currentDates[index][shift].leave.push(selectedMember.value);
        }else{
          currentDates[index][shift].leave = currentDates[index][shift].leave.filter((leave) => leave !== selectedMember.value);
        }
      }
      if (currentDates[index][shift].leave) {
        if (currentDates[index][shift].leave.includes(selectedMember.value)) {
          alert(`${selectedMember.label} ขอไม่เวรวันนี้`);
          return;
        }
      }
      if (currentDates[index][shift][act].includes(selectedMember.value)) {
        currentDates[index][shift][act] = currentDates[index][shift][
          act
        ].filter((member) => member !== selectedMember.value);
        setDates([...currentDates]);
        return;
      }
      columns.forEach((column) => { 
        currentDates[index][shift][column.value] = currentDates[index][shift][column.value].filter((member) => member !== selectedMember.value);
      });
      currentDates[index][shift][act].push(selectedMember.value);
      onChange([...currentDates]);
      setDates([...currentDates]);
    };

    const toggleLeave = (day, shift) => {
      if (!selectedMember) return;
      let currentDates = dates;
      const index = currentDates.findIndex(
        (date) => date.day.getTime() === day.getTime()
      );
      if (!currentDates[index][shift].leave) {
        currentDates[index][shift].leave = [];
      }
      if (currentDates[index][shift].leave.includes(selectedMember.value)) {
        currentDates[index][shift].leave = currentDates[index][
          shift
        ].leave.filter((leave) => leave !== selectedMember.value);
      } else {
        currentDates[index][shift].leave.push(selectedMember.value);
      }
      setDates([...currentDates]);
      onChange([...currentDates]);
    };

    useEffect(() => {
      if (value != null) {
        setDates(value);
      } else {
        setDates(generateDates(month, year));
        onChange(generateDates(month, year));
      }
    }, [month, year, value, members, selectedMember]);

    const columns = [
      { name: "Compre", value: "compre" },
      { name: "PTU", value: "ptu" },
      { name: "SP", value: "sp" },
      { name: "Rotate", value: "rotate" },
      { name: "Service", value: "service" },
      { name: "วิชาการ", value: "academic" },
      { name: "Stand By", value: "standBy" },
      { name: "ลา", value: "off" },
    ];

    return (
      <div className="container p-5 print-container" ref={ref}>
        <h2 className="text-2xl font-bold mb-4">
          ตารางเวร {month}/{year}
        </h2>
        <table className="table-auto w-full border-collapse print-container">
          <thead>
            <tr>
              <th className="border px-4 py-2 border-black text-left w-2/12">
                วันที่
              </th>
              {editHoliday && (
                <th className="border border-black border-l-0">วันหยุด</th>
              )}
              {editLeave && (
                <th className="border border-black border-l-0 no-print ">
                  ไม่เวร
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={column.value}
                  className={`border px-4 py-2 w-48 border-black border-l-0 
                  }`}
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates
              .filter((date) =>
                !editHoliday
                  ? date.holiday == false
                  : date.day.getDay() !== 0 && date.day.getDay() !== 6
              )
              .map((date, index) => (
                <>
                  <tr>
                    <td
                      colSpan={editHoliday || editLeave ? 10 : 9}
                      className={`border px-3 py-0 border-black   ${
                        dayColor[date.day.getDay()]
                      }`}
                    >
                      {weekdaysInThai[date.day.getDay()]}{" "}
                      {date.day.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </td>
                  </tr>
                  <tr className="print-container">
                    <td
                      className={`border px-3 py-2 border-black  ${
                        dayColor[date.day.getDay()]
                      }`}
                    >
                      เช้า
                    </td>
                    {editHoliday && (
                      <td
                        className={`border-l-0 border-b-0 border-r border-black  hover:bg-slate-600 ${
                          date.holiday ? "bg-red-400" : ""
                        }`}
                        onClick={() => toggleHoliday(date.day)}
                      ></td>
                    )}
                    {editLeave && (
                      <td
                        className={`border p-0 border-black border-l-0 hover:bg-slate-600 no-print ${
                          date["morning"].leave
                            ? date["morning"].leave.includes(
                                selectedMember ? selectedMember.value : ""
                              )
                              ? "bg-red-400"
                              : ""
                            : ""
                        }`}
                        onClick={() => toggleLeave(date.day, "morning")}
                      >
                        {!selectedMember && (
                          <div className="flex w-full justify-start">
                            {date["morning"].leave
                              ? date["morning"].leave.map((leave) => {
                                  return (
                                    <div
                                      className={`px-1 py-1`}
                                      style={{
                                        backgroundColor: members.find(
                                          (item) => item.id == leave
                                        )?.color,
                                      }}
                                    ></div>
                                  );
                                })
                              : null}
                          </div>
                        )}
                      </td>
                    )}
                    {columns.map((column, index) => (
                      <td
                        className="border border-black hover:bg-slate-400 cursor-pointer align-top"
                        style={{ backgroundColor: date["morning"].leave.includes(selectedMember? selectedMember.value:"") ? "gray" : "" }}
                        onClick={() =>
                          selectShift(date.day, column.value, "morning")
                        }
                      >
                        <div className="flex  flex-col justify-start h-full items-start">
                          {date["morning"][column.value].map((member) => {
                            return (
                              <div className="h-full w-full">
                                {members.find((item) => item.id == member) ? (
                                  <div
                                    className="w-full p-1 text-white bg-blue-500 rounded-sm"
                                    style={{
                                      backgroundColor: members.find(
                                        (item) => item.id == member
                                      ).color,
                                    }}
                                  >
                                    {
                                      members.find((item) => item.id == member)
                                        .name
                                    }
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className="print-container">
                    <td
                      className={`border px-3 py-2 border-black  ${
                        dayColor[date.day.getDay()]
                      }`}
                    >
                      บ่าย
                    </td>
                    {editHoliday && (
                      <td
                        className={`border-t-0 border-r border-black border-l-0 hover:bg-slate-600 ${
                          date.holiday ? "bg-red-400" : ""
                        }`}
                        onClick={() => toggleHoliday(date.day)}
                      ></td>
                    )}
                    {editLeave && (
                      <td
                        className={`border p-0 border-black border-l-0 hover:bg-slate-600 no-print ${
                          date["afternoon"].leave
                            ? date["afternoon"].leave.includes(
                                selectedMember ? selectedMember.value : ""
                              )
                              ? "bg-red-400"
                              : ""
                            : ""
                        }`}
                        onClick={() => toggleLeave(date.day, "afternoon")}
                      >
                        {!selectedMember && (
                          <div className="flex w-full justify-start">
                            {date["afternoon"].leave
                              ? date["afternoon"].leave.map((leave) => {
                                  return (
                                    <div
                                      className={`px-1 py-1`}
                                      style={{
                                        backgroundColor: members.find(
                                          (item) => item.id == leave
                                        )?.color,
                                      }}
                                    ></div>
                                  );
                                })
                              : null}
                          </div>
                        )}
                      </td>
                    )}
                    {columns.map((column, index) => (
                      <td
                        className="border border-black hover:bg-slate-400 cursor-pointer align-top"
                        style={{ backgroundColor: date["afternoon"].leave.includes(selectedMember? selectedMember.value:"") ? "gray" : "" }}
                        onClick={() =>
                          selectShift(date.day, column.value, "afternoon")
                        }
                      >
                        <div className="flex  flex-col justify-start h-full items-start">
                          {date["afternoon"][column.value].map((member) => {
                            return (
                              <div className="h-full w-full">
                                {members.find((item) => item.id == member) ? (
                                  <div
                                    className="w-full p-1 text-white bg-blue-500 rounded-sm"
                                    style={{
                                      backgroundColor: members.find(
                                        (item) => item.id == member
                                      ).color,
                                    }}
                                  >
                                    {
                                      members.find((item) => item.id == member)
                                        .name
                                    }
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>
                  {date.day.getDay() === 5 && (
                    <tr className="">
                      <td
                        className="p-1 bg-slate-400"
                        colSpan={editHoliday || editLeave ? 10 : 9}
                      ></td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default DateTable;
