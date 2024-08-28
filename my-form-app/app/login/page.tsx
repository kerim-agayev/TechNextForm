"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, message, Spin } from "antd";
import InputForm from "@/components/form/InputForm";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    interface LoginFormValues {
        email: string;
        password: string;
    }

    const [loading, setLoading] = useState(false);
    const { handleSubmit, reset, register, formState: { errors } } = useForm<LoginFormValues>();
    const router = useRouter();

    const onSubmit = async (data: { email: string; password: string }) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3500/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Store the token in localStorage
                localStorage.setItem("accessToken", result.accessToken);
                // Redirect to the dashboard
                router.push("/dashboard");
            } else {
                // Display error message
                message.error(result.error || "Login failed");
            }
        } catch (error) {
            // Handle network or other errors
            message.error("An unexpected error occurred");
        } finally {
            setLoading(false);
            reset(); // Reset form fields
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputForm
                        label="Email"
                        place="Email adresinizi daxil edin/"
                        name="email"
                        register={register}
                        errors={errors}
                        isRequired={true}
                        type="email"
                        containerWidth="mb-4"
                    />
                    <InputForm
                        label="Password"
                        place="Password daxil edin/"
                        name="password"
                        register={register}
                        errors={errors}
                        isRequired={true}
                        type="password"
                        containerWidth="mb-6"
                    />
                    <div className="flex justify-center items-center">
                        <Button
                            color="red"
                            className=''
                            htmlType="submit"
                            loading={loading}
                        >
                            Login
                        </Button>
                    </div>
                    {loading && <div className="flex justify-center mt-4"><Spin /></div>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
