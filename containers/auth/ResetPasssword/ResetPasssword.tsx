/* eslint-disable react/no-unescaped-entities */
import TextInput from "@components/TextInput";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/Button/Button";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useMutation } from "react-query";
import http from "@api/http";
import { AxiosResponse } from "axios";
import { useRouter } from "next/dist/client/router";

type FormValues = {
    password: string;
    confirmPassword: string;
};

type FormSubmitValues = {
    user_id: string;
    token: string;
} & FormValues;

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const router = useRouter();
    const { id = "", token = "" } = router.query;

    const [sucess, setSucess] = useState(false);

    const { mutate, isLoading } = useMutation<AxiosResponse, unknown, FormSubmitValues>(
        (formData) => http.post("/auth/signin", formData),
        {
            onSuccess: (res) => {
                const { data } = res.data;
                setSucess(true);
            },
        }
    );

    const handleReset = handleSubmit((data) => {
        const userId = !Array.isArray(id) ? id : "";
        const PasswordResetToken = !Array.isArray(token) ? token : "";

        mutate({ ...data, user_id: userId, token: PasswordResetToken });
    });

    const handleLogin = () => {
        router.push("/auth/signin");
    };

    if (sucess) {
        return (
            <div className="flex flex-row items-center, justify-center">
                <div className="mt-10 max-w-xs w-full">
                    <h2 className="font-bold text-3xl py-4">Reset Password</h2>

                    <p className="py-5">Password reset sucessfully</p>

                    <Button onClick={handleLogin} type="button" className="w-full">
                        BACK TO LOGIN
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center, justify-center px-5 sm:px-0">
            <form onSubmit={handleReset} className="mt-10 max-w-xs w-full">
                <h2 className="title-1 py-4">Reset Password</h2>
                <TextInput
                    type="password"
                    placeholder="New Password"
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
                    SUBMIT
                </Button>
            </form>
        </div>
    );
};

export default Register;
