"use client";

import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 w-full`}>
        <label className="font-semibold " htmlFor={id}>
          <h4>{label}</h4>
        </label>
        <input
          type={type}
          className={`text-[14px] bg-transparent md:text-[16px] lg:text-[20px] flex h-10 w-full border-b-2 border-input outline-none px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${
            className && className
          }`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
