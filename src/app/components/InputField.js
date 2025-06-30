"use client";

import React from "react";
import clsx from "clsx";
import { DateTimePicker } from "./DateTimePicker";

export default function InputField({
  id,
  label,
  type = "",
  as = "input",
  placeholder = "",
  error = "",
  className,
  options = [],
  direction = "column",
  requiredIcon = false,
  value,
  ...rest
}) {
  const baseClassName =
    "p-3 pr-10 w-full bg-white placeholder:text-sm border-b border-silver-medal focus:outline-none focus:border-b-foreground focus:border-b-2 transition-all duration-150 ease-in-out";

  const Component =
    as === "textarea" ? "textarea" : as === "radio" ? "div" : "input";
  const radioWrapperClass =
    direction === "row" ? "flex flex-wrap gap-x-6 gap-y-2" : "space-y-2";

  return (
    <div className="w-full mb-4">
      <div className="group w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-md font-medium text-cavernous mb-1 group-focus-within:font-semibold transition-all duration-200"
          >
            {label}
            {requiredIcon && (
              <span className="mx-1 text-sm text-stoplight font-medium">*</span>
            )}
          </label>
        )}
        {as === "radio" ? (
          <div className={radioWrapperClass}>
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 text-sm"
              >
                <input
                  type="radio"
                  name={id}
                  value={option.value}
                  className="text-foreground focus:ring-foreground"
                  {...rest}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        ) : as === "datetime" ? (
          <DateTimePicker
            id={id}
            date={value}
            setDate={(newDate) => rest.onChange?.(newDate)}
            withTime={rest.withTime}
            error={!!error}
            className={clsx(error && "border-stoplight")}
          />
        ) : as === "file" ? (
          <div className="relative w-full">
            <label
              htmlFor={id}
              className={clsx(
                baseClassName,
                "block cursor-pointer text-cavernous",
                error && "border-stoplight text-stoplight"
              )}
            >
              {value?.name || placeholder || "Choose a file"}
            </label>
            <input
              id={id}
              type="file"
              accept={rest.accept}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => rest.onChange?.(e.target.files?.[0])}
            />
          </div>
        ) : as === "dropdown" ? (
          <div className="relative w-full">
            <select
              id={id}
              className={clsx(
                "w-full border rounded px-3 py-2 text-cavernous bg-white",
                error && "border-stoplight text-stoplight"
              )}
              value={value}
              onChange={(e) => rest.onChange?.(e.target.value)}
            >
              <option value="" disabled hidden>
                {placeholder || "Pilih opsi"}
              </option>
              {(options || []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Component
            id={id}
            type={type}
            placeholder={placeholder}
            className={clsx(
              baseClassName,
              className,
              error && "border-stoplight text-stoplight"
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            rows={as === "textarea" ? 4 : undefined}
            {...rest}
          />
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-stoplight">
          {error}
        </p>
      )}
    </div>
  );
}
