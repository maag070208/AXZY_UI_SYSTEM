import ITInput from "@/components/input/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = "Buscar en todos los campos...",
  value,
  onChange,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-gray-400" />
      </div>
      <ITInput
        name="global-search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {}}
        className="pl-10 w-full"
      />
    </div>
  );
}
