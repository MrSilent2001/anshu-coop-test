import React from "react";
import loginImage from "../assets/images/loginImage.png";
import LoginForm from "@/sections/loginForm";

const Login: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-br from-white to-blue-700">
            <div className="hidden md:flex md:w-1/2 items-center justify-center">
                <img
                    src={loginImage}
                    alt="LOGIN"
                    className="w-[90%] max-w-[800px] h-auto object-contain"
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-[400px]">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
