// src/components/SearchBar.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from "@/components/textInput";
import CustomButton from "@/components/button";
import { SearchFormValues } from "@/types/types";
import { searchPatients } from "@/api/patientsAPI";

type SearchBarProps = {
    onSearchResults: (patients: any[]) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
    const { register, handleSubmit, reset } = useForm<SearchFormValues>();
    const [loading, setLoading] = useState(false);

    const onSearch: SubmitHandler<SearchFormValues> = async (data) => {
        setLoading(true);
        try {
            const response = await searchPatients(1, data.search);
            console.log(response)
            onSearchResults(Array.isArray(response) ? response : []);
            reset();
        } catch (e) {
            console.log("Search error", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSearch)} className="flex flex-row justify-center gap-4">
            <TextInput
                id="search"
                type="text"
                placeholder="Search"
                className="w-[450px] h-[35px] bg-white border border-gray-400 rounded-xl"
                register={register("search")}
            />
            <CustomButton
                type="submit"
                buttonClassName="h-[35px] bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4"
                buttonLabel={loading ? "Searching..." : "Search"}
                disabled={loading}
            />
        </form>
    );
};

export default SearchBar;
