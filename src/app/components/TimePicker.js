"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

export function TimePicker({ time, setTime }) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
