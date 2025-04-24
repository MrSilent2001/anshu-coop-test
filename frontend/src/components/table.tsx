"use client";

import React from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import Dropdown from "../components/dropdown";
import CustomPagination from "@/components/pagination";
import CustomButton from "@/components/button";
import {Patient} from "@/types/types";
import {FaTrashCan} from "react-icons/fa6";

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
                return 'bg-green-100 hover:bg-green-200 text-green-700 font-semibold border-green-600';
            case 'INACTIVE':
                return 'bg-red-100 hover:bg-red-200 text-red-700 font-semibold border-red-600';
        }
    };

    return (
        <div className="flex flex-col w-full mx-10">
            <div className="border border-gray-400 rounded-xl">
                <Table className="">
                    <TableHeader className="bg-blue-200 text-black p-5">
                        <TableRow className="rounded-xl">
                            <TableHead className="text-center w-[100px] rounded-tl-xl">Id</TableHead>
                            <TableHead className="text-center w-[200px]">Patient's Name</TableHead>
                            <TableHead className="text-center w-[200px]">Date of Birth</TableHead>
                            <TableHead className="text-center w-[100px]">Status</TableHead>
                            <TableHead className="text-center w-[100px] rounded-tr-xl"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((patient) => (
                            <TableRow key={patient.id} className="bg-none hover:bg-gray-200 cursor-pointer border-gray-300">
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
                                <TableCell className="flexbox items-center justify-center">
                                    <CustomButton
                                        type="button"
                                        onClick={() => onDelete(Number(patient.id))}
                                        buttonClassName="text-gray-400 hover:text-red-600 shadow-none"
                                        icon={<FaTrashCan />}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

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
