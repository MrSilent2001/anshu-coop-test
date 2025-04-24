import React from "react";
import CustomButton from "@/components/button";
import {useNavigate} from "react-router-dom";

const Welcome: React.FC = () => {
    const navigate = useNavigate()

    return(
        <div className="w-full h-screen flex flex-col items-center justify-center m-auto bg-blue-200 gap-10">
            <h1 className="text-5xl font-extrabold">Welcome to MedCare!</h1>
            <CustomButton
                type="button"
                buttonClassName="bg-blue-600 cursor-pointer"
                buttonLabel="Get Started"
                onClick={() => {
                    navigate("/login");
                }}
            />
        </div>
    )
}

export default Welcome;