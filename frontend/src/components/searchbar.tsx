// src/components/SearchBar.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from "@/components/textInput";
import CustomButton from "@/components/button";
import { SearchFormValues } from "@/types/types";
import { searchPatients } from "@/api/patientsAPI";
import {IoSearchOutline} from "react-icons/io5";

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
        <form onSubmit={handleSubmit(onSearch)} className="flex flex-row justify-center">
            <div className="flex border border-gray-400 hover:border-gray-500 rounded-md h-fit">
                <TextInput
                    id="search"
                    type="text"
                    placeholder="Search"
                    className="w-[450px] h-[35px] bg-white border-none rounded-xl"
                    register={register("search")}
                />
                <CustomButton
                    type="submit"
                    buttonClassName="text-gray-600 hover:text-black shadow-none "
                    icon={<IoSearchOutline className="text-4xl" />}
                    disabled={loading}
                />
            </div>
        </form>
    );
};

export default SearchBar;
