import { forwardRef, useImperativeHandle, useRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { MdDateRange } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface DatePickerProps {
  options?: Record<string, any>;
  className?: string;
  onChange?: (Date: Date) => void;
  placeholder: string;
}

export interface DatePickerRef {
  getSelectedDate: () => Date | null;
  setDate: (date: Date) => void;
}

const DatePickerComponent = forwardRef<DatePickerRef, DatePickerProps>(
  ({ options, onChange, placeholder }, ref) => {
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
      enableTime: false, // Disable time selection
      noCalendar: false,
      dateFormat: "Y-m-d", // Only show the date
      minDate: new Date(), // Optional: Prevent selecting past dates
    };

    const { t } = useTranslation();
    return (
      <div className="relative">
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
          <MdDateRange size={20} />
        </div>
        <Flatpickr
          onChange={(e) => {
            if (onChange) onChange(e[0]);
          }}
          ref={datePickerRef}
          options={{ ...defaultOptions, ...options }}
          placeholder={placeholder}
          className="border bg-white shadow rounded pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
);

export default DatePickerComponent;
