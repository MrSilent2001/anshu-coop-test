import React from "react";
import CustomButton from "@/components/button";
import TextInput from "@/components/textInput";
import PasswordInput from "@/components/passwordInput";
import {LoginFormValues} from "@/types/types";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const Login:React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const navigate = useNavigate();

    const onSubmit = (data: LoginFormValues) => {
        console.log("Form Data:", data);
        navigate("/home");
    };
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center m-auto bg-blue-200 gap-15">
            <div className="flex flex-col items-center justify-center m-auto bg-white m-5 w-2/7 h-[450px] rounded-lg shadow-lg">
                <h1 className="font-bold text-3xl mt-10">Login</h1>

                <div className="flex flex-col m-auto w-3/4 h-2/3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-center justify-center gap-5 m-4">
                            <label htmlFor="username">Username</label>
                            <TextInput
                                id="username"
                                type="text"
                                placeholder="Username"
                                className="h-[40px] w-full bg-white border border-gray-400 rounded-lg"
                                register={register("username", {
                                    required: "Username is required",
                                })}
                            />
                        </div>
                        {errors.username && (
                            <span className="text-center text-red-500 text-sm ml-15">
                                    {errors.username.message}
                                </span>
                        )}

                        <div className="flex items-center justify-center gap-5 m-4">
                            <label htmlFor="password">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <PasswordInput
                                        {...field}
                                        placeholder="Password"
                                        className="h-[40px] w-full bg-white border border-gray-400 rounded-lg"
                                    />
                                )}
                            />
                        </div>
                        {errors.password && (
                            <span className="flex text-center text-red-500 text-sm ml-15">
                                    {errors.password.message}
                                </span>
                        )}

                        <div className="flex items-center justify-center">
                            <CustomButton
                                type="submit"
                                buttonLabel="Login"
                                buttonClassName="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 w-3/4 mt-10"
                            />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login;