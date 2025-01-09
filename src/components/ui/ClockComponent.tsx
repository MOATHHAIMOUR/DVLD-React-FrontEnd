import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ClockComponent: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState<string>(""); 
  const [currentDate, setCurrentDate] = useState<string>(""); 

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const language = i18n.language;

      const timeFormatter = new Intl.DateTimeFormat(language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const formattedTime = timeFormatter
        .format(now)
        .replace(/\d/g, (d) =>
          language === "ar" ? "٠١٢٣٤٥٦٧٨٩"[parseInt(d, 10)] : d
        );

      const dateFormatter = new Intl.DateTimeFormat(language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setCurrentTime(formattedTime); 
      setCurrentDate(dateFormatter.format(now)); 
    };

    const timer = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(timer); 
  }, [i18n.language]);

  return (
    <div className={`text-center ${i18n.language === "ar" ? "rtl" : "ltr"}`}>
      <p className="text-3xl font-bold">{currentTime}</p>
      <p className="text-lg text-gray-500">{currentDate}</p>
    </div>
  );
};

export default ClockComponent;
