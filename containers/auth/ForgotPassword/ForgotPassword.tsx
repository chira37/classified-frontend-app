/* eslint-disable react/no-unescaped-entities */
import TextInput from "@components/TextInput";
import React from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/Button/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { schema } from "./schema";
import { AxiosResponse } from "axios";
import http from "@api/http";

type FormValues = {
    email: string;
};

const ForgotPassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation<AxiosResponse, unknown, FormValues>(
        (formData) => http.post("/auth/signin", formData),
        {
            onSuccess: (res) => {
                const { data } = res.data;
            },
        }
    );

    const handleSend = handleSubmit((data) => mutate(data));

    return (
        <div className="flex flex-row items-center, justify-center">
            <form onSubmit={handleSend} className="mt-10 max-w-xs w-full">
                <h2 className="font-bold text-3xl py-4">Reset Password</h2>
                <TextInput placeholder="Email" {...register("email")} error={errors?.email?.message} />

                <Button type="submit" loading={isLoading} className="w-full">
                    SEND
                </Button>

                <div className="flex flex-row text-sm gap-2 mt-5 font-medium">
                    <p>Back to</p>
                    <Link href="/auth/signin">
                        <a className="font-semibold transition-colors duration-200 relative hover:underline">Login</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
