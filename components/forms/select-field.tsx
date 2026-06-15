import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: readonly string[];
  placeholder?: string;
};

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, options, placeholder = "Sélectionner", ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
);
SelectField.displayName = "SelectField";
