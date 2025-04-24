import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import CustomButton from "@/components/button";
import TextInput from "@/components/textInput";
import { DatePicker } from "@/components/datepicker";
import Dropdown from "@/components/dropdown";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddPatientFormValues } from "@/types/types";
import { registerPatient } from "@/api/patientsAPI";
import {patientSchema} from "@/schema/patientSchema";

type AddPatientDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPatientAdded: () => void;
};

const CreatePatients: React.FC<AddPatientDialogProps> = ({
                                                             open,
                                                             onOpenChange,
                                                             onPatientAdded,
                                                         }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AddPatientFormValues>();


    const status = watch("status");

    const handleAddPatient: SubmitHandler<AddPatientFormValues> = async (data: AddPatientFormValues) => {
        try {
            const validation = patientSchema.safeParse(data);
            if (!validation.success) {
                return validation.error.errors[0]?.message;
            }

            await registerPatient(data);
            onPatientAdded()
            onOpenChange(false);
            reset();
        } catch (e) {
            console.error("Error adding patient", e);
        }
    };

    const handleDialogClose = () => {
        onOpenChange(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] bg-white p-4">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>
                        Enter the new patient’s details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleAddPatient)} className="grid gap-4 py-4">
                    <div className="flex items-center gap-4 w-100">
                        <label className="w-40">Name:</label>
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Full name"
                            className="flex-1"
                            {...register("name", {
                                required: "Name is required"
                            })}
                        />
                    </div>
                    {errors.name && (
                        <span className="text-center text-red-500 text-sm">{errors.name.message}</span>
                    )}

                    <div className="flex items-center gap-4 w-100">
                        <label className="w-40">Date of Birth:</label>
                        <DatePicker
                            id="dob"
                            maxDate={new Date()}
                            onDateChange={(date) =>
                                setValue("dateOfBirth", date ? date.toISOString().split("T")[0] : "")
                            }
                        />
                    </div>
                    {errors.dateOfBirth && (
                        <span className="text-center text-red-500 text-sm">{errors.dateOfBirth.message}</span>
                    )}

                    <div className="flex items-center gap-4 w-100">
                        <label className="mr-12">Status:</label>
                        <Dropdown
                            options={["ACTIVE", "INACTIVE"]}
                            value={status}
                            onChange={(value) => setValue("status", value)}
                            className="border border-gray-400 rounded-md ml-6"
                            width="410px"
                        />
                    </div>
                    {errors.status && (
                        <span className="text-center text-red-500 text-sm">{errors.status.message}</span>
                    )}

                    <div className="flex justify-center gap-10 mt-4">
                        <CustomButton
                            type="submit"
                            buttonLabel="Add Patient"
                            buttonClassName="bg-blue-100 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-4 w-[150px]"
                        />
                        <CustomButton
                            type="button"
                            buttonLabel="Cancel"
                            buttonClassName="bg-red-100 border border-red-500 hover:bg-red-500 hover:text-white text-red-500 font-semibold py-2 px-4 w-[150px]"
                            onClick={handleDialogClose}
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePatients;
