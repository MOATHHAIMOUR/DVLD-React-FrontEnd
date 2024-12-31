import { useState, useEffect } from "react";
import Box from "./ui/Box";

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Box className="text-4xl font-bold my-6">
      {time.toLocaleTimeString("en-US", { hour12: false })}{" "}
      {/* 24-hour format */}
    </Box>
  );
};

export default Timer;
