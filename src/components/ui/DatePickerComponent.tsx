import { forwardRef, useImperativeHandle, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

interface DatePickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
  className?: string;
  onChange?: (Date: Date) => void;
}

export interface DatePickerRef {
  getSelectedDate: () => Date | null;
  setDate: (date: Date) => void;
}

const DatePickerComponent = forwardRef<DatePickerRef, DatePickerProps>(
  ({ options, onChange }, ref) => {
    const datePickerRef = useRef<Flatpickr | null>(null);

    useImperativeHandle(ref, () => ({
      getSelectedDate: () => {
        if (datePickerRef.current) {
          return datePickerRef.current.flatpickr.selectedDates[0] || null;
        }
        return null;
      },
      setDate: (date: Date) => {
        if (datePickerRef.current) {
          datePickerRef.current.flatpickr.setDate(date, true);
        }
      },
    }));

    const defaultOptions = {
      enableTime: true,
      noCalendar: false,
      dateFormat: "Y-m-d H:i",
      minDate: new Date(),
    };

    return (
      <Flatpickr
        onChange={(e) => {
          if (onChange) onChange(e[0]);
        }}
        ref={datePickerRef}
        data-enable-time
        options={{ ...defaultOptions, ...options }}
        placeholder="Pick an appointment time"
        className="border bg-gray-100 text-primary rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }
);

export default DatePickerComponent;
