export interface Patient {
    id?: number;
    name: string;
    dateOfBirth: Date;
    status: string;
}

export type SearchFormValues = {
    search: string;
};

export interface AddPatientFormValues {
    name: string;
    dateOfBirth: string;
    status: string;
}
