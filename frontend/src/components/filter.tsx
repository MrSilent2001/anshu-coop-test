import React from "react";
import Dropdown from "@/components/dropdown";

interface FilterBarProps {
    statusFilter: string;
    onFilterChange: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ statusFilter, onFilterChange }) => {
    return (
            <Dropdown
                options={["All", "Active", "Inactive"]}
                value={
                    statusFilter === 'ACTIVE' ? 'Active' : statusFilter === 'INACTIVE' ? 'Inactive' : 'All'
                }
                placeholder={"All"}
                onChange={(value) => onFilterChange(value)}
                width="150px"
                className="border border-gray-400 rounded-md"
            />
    );
};

export default FilterBar;
