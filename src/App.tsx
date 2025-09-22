import { useState } from "react";
import Calendar from "./components/calendar";
import AvailableSlotsModal from "./components/AvailableSlotsModal";

type BookedSlots = {
  [date: string]: string[];
};

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const availableSlots: { [date: string]: string[] } = {
    "2025-09-22": ["09:00", "10:30", "14:00"],
    "2025-09-25": ["11:00", "15:30", "17:00"],
    "2025-09-27": ["10:00", "13:00", "16:00"],
  };

  const [bookedSlots, setBookedSlots] = useState<BookedSlots>({});

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const getSlotsForDate = (date: Date | null): string[] => {
    if (!date) return [];
    const key = date.toISOString().split("T")[0];
    return availableSlots[key] || [];
  };

  const getBookedSlotsForDate = (date: Date | null): string[] => {
    if (!date) return [];
    const key = date.toISOString().split("T")[0];
    return bookedSlots[key] || [];
  };

  const bookSlot = (date: Date, slot: string) => {
    const key = date.toISOString().split("T")[0];
    setBookedSlots((prev) => {
      const current = prev[key] || [];
      if (current.includes(slot)) return prev;
      return { ...prev, [key]: [...current, slot] };
    });
  };

  const cancelSlot = (date: Date, slot: string) => {
    const key = date.toISOString().split("T")[0];
    setBookedSlots((prev) => {
      const current = prev[key] || [];
      return { ...prev, [key]: current.filter((s) => s !== slot) };
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda de Turnos</h1>
      <Calendar
        onSelectDate={handleSelectDate}
        bookedDates={Object.keys(bookedSlots)}
      />
      <AvailableSlotsModal
        date={selectedDate}
        availableSlots={getSlotsForDate(selectedDate)}
        bookedSlots={getBookedSlotsForDate(selectedDate)}
        onBook={bookSlot}
        onCancel={cancelSlot}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
}

export default App;
