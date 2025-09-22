import { useState } from "react";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
  bookedDates?: string[];
}

export default function Calendar({ onSelectDate, bookedDates = [] }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onSelectDate(selectedDate);
  };

  const isBooked = (day: number): boolean => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const key = date.toISOString().split("T")[0];
    return bookedDates.includes(key);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => changeMonth(-1)}>⬅️</button>
        <h2 className="font-bold capitalize">
          {currentDate.toLocaleString("es-ES", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>➡️</button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["D", "L", "M", "X", "J", "V", "S"].map((d) => (
          <div key={d} className="font-bold text-center">{d}</div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const booked = isBooked(day);
          return (
            <button
              key={day}
              className={`p-2 border rounded hover:bg-blue-200 ${
                booked ? "bg-green-100 border-green-400" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
