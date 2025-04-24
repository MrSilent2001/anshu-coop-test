import React, { useEffect, useState } from "react";
import CustomButton from "../components/button";
import CustomTable from "@/components/table";
import { Patient } from "@/types/types";
import {
    getAllPatients,
    deletePatient,
    updatePatients,
} from "@/api/patientsAPI";
import CreatePatients from "@/pages/createPatients";
import SearchBar from "@/components/searchbar";
import Filter from "@/components/filter";
import {MdLogout} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {FaStethoscope} from "react-icons/fa";


const Dashboard: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();

    //Fetch all patient records
    const fetchPatients = async (page = 1, status = "") => {
        try {
            const response = await getAllPatients(page, status);
            if (response) {
                setPatients(response.data || []);
                setTotalPages(response.totalPages);
            }
        } catch (e) {
            console.log("Error fetching patients", e);
        }
    };

    useEffect(() => {
        fetchPatients(currentPage, statusFilter);
    }, [currentPage]);

    //Search function
    const handleSearchResults = (newPatients: Patient[]) => {
        setPatients(newPatients);
    };

    //Status Update
    const handleStatusChange = async (id: number, status: string) => {
        try {
            const response = await updatePatients(id, status);
            if (response) {
                setPatients((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, status } : p))
                );
            }
        } catch (e) {
            console.log("Error updating status", e);
        }
    };

    //Filter
    const handleFilterChange = (status: string) => {
        console.log(status.toUpperCase())
        setStatusFilter(status.toUpperCase());
        setCurrentPage(1);
        fetchPatients(1, status);
    };

    //Delete patient
    const handleDelete = async (id: number) => {
        try {
            const response = await deletePatient(id);
            if (response) {
                const updated = patients.filter((p) => p.id !== id);
                setPatients(updated);
                if (updated.length === 0 && currentPage > 1) {
                    setCurrentPage((prev) => prev - 1);
                } else {
                    fetchPatients(currentPage, statusFilter);
                }
            }
        } catch (e) {
            console.log("Error deleting patient", e);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="relative bg-blue-600 p-5 flex items-center justify-center">
                <div className="flex">
                    <p className="text-2xl font-bold text-white">MediCare Patient Details</p>

                    <CustomButton
                        type="button"
                        buttonClassName="text-white shadow-none"
                        icon={<FaStethoscope/>
                        }
                    />
                </div>

                <CustomButton
                    type="button"
                    buttonClassName="absolute right-5 top-5 bg-transparent text-white hover:text-gray-300 p-0 mr-5 border-none shadow-none"
                    icon={<MdLogout className="text-2xl"/>}
                    onClick={() => navigate("/login")}
                />
            </div>


            <div className="flex mt-10 items-center justify-between gap-5 w-7/8 mx-10 ">

                <div className="flex gap-5">
                    <SearchBar onSearchResults={handleSearchResults}/>

                    <Filter statusFilter={statusFilter} onFilterChange={handleFilterChange}/>
                </div>

                <div className="flex gap-5">
                    <CustomButton
                        type="button"
                        buttonClassName="bg-blue-100 border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-semibold py-2 px-4"
                        buttonLabel="Add New Patient"
                        onClick={() => setDialogOpen(true)}
                    />
                    <CustomButton
                        type="button"
                        buttonClassName="bg-red-100 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 w-[150px]"
                        buttonLabel="Reset"
                        onClick={() => {
                            setStatusFilter("");
                            setCurrentPage(1);
                            fetchPatients(1, "");
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-center items-center mt-10">
                <CustomTable
                    data={patients}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                />
            </div>

            <CreatePatients
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onPatientAdded={() => fetchPatients(currentPage, statusFilter)}
            />
        </div>
    );
};

export default Dashboard;
