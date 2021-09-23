/* eslint-disable react/no-unescaped-entities */
import TextInput from "@components/TextInput";
import React from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/Button/Button";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useMutation } from "react-query";
import http from "@api/http";
import { AxiosResponse } from "axios";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation<AxiosResponse, unknown, Partial<FormValues>>(
        (formData) => http.post("/auth/signup", formData),
        {
            onSuccess: (res) => {
                const { data } = res.data;
            },
        }
    );

    const handleRegister = handleSubmit((data) => {
        mutate({ email: data.email, password: data.password });
    });

    return (
        <div className="flex flex-row items-center, justify-center">
            <form onSubmit={handleRegister} className="mt-10 max-w-xs w-full">
                <h2 className="font-bold text-3xl py-4">Register</h2>
                <TextInput placeholder="Email" {...register("email")} error={errors?.email?.message} />
                <TextInput
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    error={errors?.password?.message}
                />
                <TextInput
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    error={errors?.confirmPassword?.message}
                />
                <Button type="submit" loading={isLoading} className="w-full">
                    REGISTER
                </Button>

                <div className="flex flex-row text-sm gap-2 mt-5 font-medium">
                    <p>Already have an account?</p>
                    <Link href="/auth/signin">
                        <a className="font-semibold transition-colors duration-200 relative hover:underline">Login</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
