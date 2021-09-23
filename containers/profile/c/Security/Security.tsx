import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/Button/Button";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useMutation } from "react-query";
import http from "@api/http";
import { AxiosResponse } from "axios";
import TextInput from "@components/TextInput";

type FormValues = {
    previous_password: string;
    password: string;
    confirm_password: string;
};

type SubmitFormValues = {
    previous_password: string;
    password: string;
};

const Account: React.FC = () => {
    const {
        register: register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormValues>({ resolver: yupResolver(schema) });

    const { mutate, isLoading } = useMutation<AxiosResponse, unknown, SubmitFormValues>(
        (formData) => http.post("/auth/update-password", formData),
        {
            onSuccess: () => {
                reset()
            },
        }
    );

    const handleUpdate = handleSubmit((data) => {
        const { previous_password, password } = data;
        mutate({ previous_password, password });
    });

    return (
        <div className="">
            <form onSubmit={handleUpdate} className="mb-10 bg-white p-10 rounded-md filter shadow">
                <div className="mb-5">
                    <TextInput
                        type="password"
                        placeholder="Previous Password"
                        {...register("previous_password")}
                        error={errors?.previous_password?.message}
                    />
                    <TextInput
                        type="password"
                        placeholder="New Password"
                        {...register("password")}
                        error={errors?.password?.message}
                    />{" "}
                    <TextInput
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirm_password")}
                        error={errors?.confirm_password?.message}
                    />
                </div>

                <div className="flex justify-end">
                    <Button loading={isLoading} type="submit">
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Account;
