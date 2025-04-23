import axios from "axios";
import {AddPatientFormValues} from "@/types/types";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


export const registerPatient = async (formData: AddPatientFormValues) => {
    try {
        const response = await api.post("/api/patients/create", {
            name: formData.name,
            dateOfBirth: formData.dateOfBirth,
            status: formData.status,
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Patient Creation failed:", error);
    }
}



export const getAllPatients = async (page: number, status: string): Promise<any> =>{
    try {
        const response = await api.get("/api/patients/getAll", {
            params: {
                page,
                status,
            },
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;

    } catch (error){
        console.log("Failed to fetch data", error);
        return null;
    }
}


export const updatePatients = async ( id: number ,status: string) => {
    try {
        const response = await api.patch(`/api/patients/update/${id}`,{
            status: status
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;

    } catch (error) {
        console.error("Patient Status update failed:", error);
    }
}


export const deletePatient = async (id: number) => {
    try {
        const response = await api.delete(`/api/patients/delete/${id}`);

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Patient deletion failed:", error);
    }
}


export const searchPatients = async (page: number, search: string): Promise<any> =>{
    try {
        const response = await api.get("/api/patients/search", {
            params: {
                page,
                name: search,
            },
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;

    } catch (error){
        console.log("Failed to fetch data", error);
        return null;
    }
}

