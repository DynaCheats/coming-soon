"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-950/20 backdrop-blur-sm" style={{ opacity: '1', transform: 'none' }}>
    <span className="text-4xl font-bold text-dynacheats" style={{ transform: 'scale(1.02335)' }}>
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-sm text-blue-200/70 capitalize">{label}</span>
  </div>
);

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(11); // December is month 11 in JavaScript Date (0-indexed)
    targetDate.setDate(7);
    targetDate.setHours(0, 0, 0, 0);

    const updateTimeLeft = () => {
      const now = Date.now();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      const newTimeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(updateTimeLeft, 1000);

    updateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}