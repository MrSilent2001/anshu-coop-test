import React from "react";
import TextInput from "@/components/textInput";
import {Controller, useForm} from "react-hook-form";
import PasswordInput from "@/components/passwordInput";
import CustomButton from "@/components/button";
import {LoginFormValues} from "@/types/types";
import {useNavigate} from "react-router-dom";

const LoginForm:React.FC = () => {
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
        <div className="w-full h-auto p-5 rounded-xl bg-blue-100 shadow-xl">
            <h1 className="text-center font-bold text-3xl my-5 font-Inter">Login</h1>

            <div className="flex flex-col ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 m-5">
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
                        <span className="flex items-center justify-center text-center text-red-500 text-sm">
                                    {errors.username.message}
                            </span>
                    )}

                    <div className="flex flex-col gap-3 m-5">
                        <label htmlFor="password">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{required: "Password is required"}}
                            render={({field}) => (
                                <PasswordInput
                                    {...field}
                                    placeholder="Password"
                                    className="h-[40px] w-full bg-white border border-gray-400 rounded-lg"
                                />
                            )}
                        />
                    </div>
                    {errors.password && (
                        <span className="flex items-center justify-center text-center text-red-500 text-sm ml-15">
                                    {errors.password.message}
                                </span>
                    )}

                    <div className="flex items-center justify-center w-full">
                        <CustomButton
                            type="submit"
                            buttonLabel="Login"
                            buttonClassName="bg-blue-900 hover:bg-blue-500 text-white font-bold py-2 px-4 w-full mx-5 mt-10"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;