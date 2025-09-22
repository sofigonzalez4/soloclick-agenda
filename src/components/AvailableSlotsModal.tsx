import { Dialog } from "@headlessui/react";

interface AvailableSlotsModalProps {
  date: Date | null;
  availableSlots: string[];
  bookedSlots: string[];
  onBook: (date: Date, slot: string) => void;
  onCancel: (date: Date, slot: string) => void;
  onClose: () => void;
}

export default function AvailableSlotsModal({
  date,
  availableSlots,
  bookedSlots = [],
  onBook,
  onCancel,
  onClose,
}: AvailableSlotsModalProps) {
  if (!date) return null;

  const isBooked = (slot: string): boolean => bookedSlots.includes(slot);

  return (
    <Dialog open={!!date} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <Dialog.Title className="text-lg font-bold mb-4">
            Turnos - {date.toLocaleDateString("es-ES")}
          </Dialog.Title>

          {availableSlots.length > 0 ? (
            <div className="grid gap-2">
              {availableSlots.map((slot, idx) => {
                const booked = isBooked(slot);
                return (
                  <button
                    key={idx}
                    className={`p-2 border rounded flex justify-between ${
                      booked ? "bg-red-100" : "hover:bg-green-200"
                    }`}
                    onClick={() =>
                      booked ? onCancel(date, slot) : onBook(date, slot)
                    }
                  >
                    {slot}
                    <span className="text-sm text-gray-500">
                      {booked ? "Reservado" : "Disponible"}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No hay turnos disponibles</p>
          )}

          <button
            className="mt-6 w-full bg-red-500 text-white py-2 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
