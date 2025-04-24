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


const Dashboard: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

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
            <div className="bg-blue-500 p-5 text-center">
                <p className="text-2xl font-bold text-white">MediCare Patient Details</p>
            </div>

            <div className="flex mt-10 items-center justify-end gap-5 w-5/6 mx-10 ">

                <Filter statusFilter={statusFilter} onFilterChange={handleFilterChange}/>

                <CustomButton
                    type="button"
                    buttonClassName="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4"
                    buttonLabel="Add New Patient"
                    onClick={() => setDialogOpen(true)}
                />
            </div>

            <div className="flex flex-row mt-10 justify-center">
                <SearchBar onSearchResults={handleSearchResults} />
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
