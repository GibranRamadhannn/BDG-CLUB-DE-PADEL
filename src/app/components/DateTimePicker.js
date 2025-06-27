"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { TimePicker } from "./TimePicker";

export function DateTimePicker({
  date,
  setDate,
  withTime = true,
  className = "",
  error = false,
}) {
  const [time, setTime] = React.useState("12:00");

  const handleSelect = (date) => {
    if (date) {
      if (withTime) {
        const [hours, minutes] = time.split(":");
        date.setHours(+hours);
        date.setMinutes(+minutes);
      }

      console.log(
        "✅ Selected Date:",
        format(date, withTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd")
      );

      setDate(date);
    }
  };

  const baseClassName =
    "p-3 pr-10 w-full bg-white placeholder:text-sm border-b border-silver-medal focus:outline-none focus:border-b-foreground focus:border-b-2 transition-all duration-150 ease-in-out flex justify-start items-center";

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              baseClassName,
              { "border-stoplight text-stoplight border-b": error },
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {date
              ? format(date, withTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd")
              : `Choose date${withTime ? " & time" : ""}`}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white-smoke text-foreground border-none font-medium font-[family-name:var(--font-montserrat)]"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            className="rounded-lg"
            captionLayout="dropdown"
          />
          {withTime && (
            <div className="border-t p-3">
              <TimePicker time={time} setTime={setTime} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
