"use client";

import React from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import Dropdown from "../components/dropdown";
import CustomPagination from "@/components/pagination";
import CustomButton from "@/components/button";
import {Patient} from "@/types/types";

interface TableProps {
    data: Patient[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onStatusChange: (id: number, status: string) => void;
    onDelete: (id: number) => void;
}

const CustomTable: React.FC<TableProps> = ({
                                               data, totalPages, currentPage, onPageChange, onStatusChange, onDelete
                                           }) => {

    const getBackgroundColor = (status: string | undefined) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-purple-700 text-white font-bold';
            case 'INACTIVE':
                return 'bg-orange-400 text-white font-bold';
        }
    };

    return (
        <div className="flex flex-col w-7/8">
            <Table className="border border-gray-400 rounded-lg">
                <TableHeader className="bg-gray-600 text-white p-5">
                    <TableRow>
                        <TableHead className="text-center w-[100px]">Id</TableHead>
                        <TableHead className="text-center w-[200px]">Patient's Name</TableHead>
                        <TableHead className="text-center w-[200px]">Date of Birth</TableHead>
                        <TableHead className="text-center w-[100px]">Status</TableHead>
                        <TableHead className="text-center w-[100px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell className="text-center font-medium">{patient.id}</TableCell>
                            <TableCell className="text-center">{patient.name}</TableCell>
                            <TableCell className="text-center">
                                {new Date(patient.dateOfBirth).toISOString().split('T')[0]}
                            </TableCell>
                            <TableCell className="text-center flex flex-row justify-center">
                                <Dropdown
                                    options={['ACTIVE', 'INACTIVE']}
                                    value={patient.status}
                                    onChange={(value: string) => onStatusChange(Number(patient.id), value)}
                                    width="150px"
                                    className={`${getBackgroundColor(patient.status)}`}
                                />
                            </TableCell>
                            <TableCell>
                                <CustomButton
                                    type="button"
                                    onClick={() => onDelete(Number(patient.id))}
                                    buttonClassName="bg-red-800 hover:bg-red-700 text-white font-bold cursor-pointer"
                                    buttonLabel="Delete"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center mt-6">
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default CustomTable;
