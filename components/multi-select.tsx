"use client";
import { motion } from "framer-motion";
import { CircleChevronDown, X } from "lucide-react";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";

// Types and Interfaces
export interface IMultiselectOption {
  id: number;
  value: string;
  label: string;
}

interface MultiselectProps {
  options: IMultiselectOption[];
  onChange?: (selectedOptions: IMultiselectOption[]) => void;
  value?: IMultiselectOption[];
  className?: string;
  placeholder?: string;
  errors?: string;
}

// Option Item Component
const OptionItem = memo(
  ({
    option,
    isActive,
    onSelect,
  }: {
    option: IMultiselectOption;
    isActive: boolean;
    onSelect: () => void;
  }) => (
    <li
      role="option"
      aria-selected={isActive}
      className={`min-h-14 lg:min-h-16 rounded-lg px-4 flex items-center cursor-pointer justify-between
      ${isActive ? "bg-gray-600/10" : "hover:bg-gray-600/10"}`}
      onClick={onSelect}
    >
      <h6>{option.label}</h6>
    </li>
  )
);

OptionItem.displayName = "OptionItem";

// Selected Tag Component
const SelectedTag = memo(
  ({
    option,
    onRemove,
  }: {
    option: IMultiselectOption;
    onRemove: () => void;
  }) => (
    <div className="w-auto h-11 px-4 rounded-badge bg-white flex items-center gap-2 font-medium">
      {option.label}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="hover:bg-gray-600 rounded-full p-0.5 group"
        aria-label={`Remove ${option.label}`}
      >
        <X size={20} className=" group-hover:text-white" />
      </button>
    </div>
  )
);

SelectedTag.displayName = "SelectedTag";

const Multiselect: React.FC<MultiselectProps> = ({
  options,
  onChange,
  value,
  className = "",
  placeholder = "I'm Intrested in",
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<IMultiselectOption[]>(
    []
  );
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedOptions(value ?? []);
  }, [value]);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedOptions.some((selected) => selected.id === option.id)
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleOptionSelect = useCallback(
    (option: IMultiselectOption) => {
      setSelectedOptions((prev) => {
        const newSelection = [...prev, option];
        onChange?.(newSelection);
        return newSelection;
      });
      setSearchQuery("");
      inputRef.current?.focus();
    },
    [onChange]
  );

  const handleRemoveOption = useCallback(
    (optionValue: string) => {
      setSelectedOptions((prev) => {
        const newSelection = prev.filter(
          (option) => option.value !== optionValue
        );
        onChange?.(newSelection);
        return newSelection;
      });
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          setFocusedOptionIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          setFocusedOptionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
          if (focusedOptionIndex >= 0) {
            handleOptionSelect(filteredOptions[focusedOptionIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    },
    [filteredOptions, focusedOptionIndex, handleOptionSelect]
  );

  return (
    <div
      ref={dropdownRef}
      className={`relative min-h-16 bg-transparent w-full ${className}`}
    >
      <div
        // role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`min-h-16 border-2 rounded-box flex items-center px-4 py-2 ${
          errors ? "border-red-500" : ""
        }`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        <div className="h-auto w-full flex items-center flex-wrap gap-2 text-black">
          {selectedOptions.map((option) => (
            <SelectedTag
              key={option.id}
              option={option}
              onRemove={() => handleRemoveOption(option.value)}
            />
          ))}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
              setFocusedOptionIndex(-1);
            }}
            onFocus={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[100px] outline-none text-white bg-transparent text-sm lg:text-xl"
            aria-label="Search options"
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center absolute top-0 right-4 h-full"
            aria-label={isOpen ? "Close options" : "Open options"}
          >
            <CircleChevronDown
              size={25}
              className={`${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300 text-white ${
                errors ? "text-red-500" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          className="absolute top-full left-0 bg-white rounded-lg w-full mt-2 p-2 shadow-lg border border-gray-200 z-50"
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <p
              className="text-gray-500 py-2 px-4 w-full text-center z-50"
              role="status"
            >
              No options found
            </p>
          ) : (
            <div className="mt-2 max-h-[200px] overflow-y-auto px-2 z-50">
              <p className="text-background text-[14px]">
                Please select one or more
              </p>
              <ul className="text-black font-medium z-50">
                {filteredOptions.map((option, index) => (
                  <OptionItem
                    key={option.id || option.value}
                    option={option}
                    isActive={focusedOptionIndex === index}
                    onSelect={() => handleOptionSelect(option)}
                  />
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default memo(Multiselect);
