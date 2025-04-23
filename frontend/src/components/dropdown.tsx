'use client';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";

interface DropdownProps {
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
    width?: string;
    placeholder?: string;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, width, placeholder, className }) => {
    const handleSelectChange = (selectedValue: string) => {
        if (onChange) {
            onChange(selectedValue);
        }
    };

    return (
        <div className="flex flex-row" style={{ width }}>
            <Select onValueChange={handleSelectChange} value={value}>
                <SelectTrigger
                    className={`mb-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}                    style={width ? { width } : undefined}
                >
    <span className="text-center">
      {value || placeholder}
    </span>
                </SelectTrigger>

                <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md text-center">
                    {options.map((status) => (
                        <SelectItem
                            key={status}
                            value={status}
                            className={`cursor-pointer px-3 py-2 text-sm text-gray-800 hover:bg-blue-100 focus:bg-blue-100`}
                        >
                            {status}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    );
};

export default Dropdown;
