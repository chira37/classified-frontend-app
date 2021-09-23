/* eslint-disable react/no-unescaped-entities */
import TextInput from "@components/TextInput";
import React from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@components/Button/Button";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import { useMutation } from "react-query";
import http, { setToken } from "@api/http";
import { string } from "yup/lib/locale";
import { AxiosResponse } from "axios";
import { useAppDispatch } from "@redux/store";
import { setUser } from "@redux/slices/userSlice";
import AuthService from "@helpers/AuthService";
import { useRouter } from "next/dist/client/router";

type FormValues = {
    email: string;
    password: number;
};

const Login: React.FC = () => {
    const router = useRouter();

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

                if (data?.token) {
                    const authService = new AuthService();
                    authService.setUser(data.token);
                    router.push("/")
                }
            },
        }
    );

    const handleLogin = handleSubmit((data) => mutate(data));

    return (
        <div className="flex flex-row items-center justify-center">
            <form onSubmit={handleLogin} className="mt-10 max-w-xs w-full">
                <h2 className="font-bold text-3xl py-4">Login</h2>
                <TextInput placeholder="Email" {...register("email")} error={errors?.email?.message} />
                <TextInput
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    error={errors?.password?.message}
                />
                <div className="flex justify-end pb-5 pt-2">
                    <Link href="/auth/forgot-password">
                        <a
                            className="text-sm transition-colors duration-200 font-medium
                        relative hover:underline hover:text-gray-900 text-gray-700"
                        >
                            Forgot Password?
                        </a>
                    </Link>
                </div>
                <Button type="submit" loading={isLoading} className="w-full">
                    LOGIN
                </Button>

                <div className="flex flex-row text-sm gap-2 mt-5 font-medium">
                    <p>Don't have an account</p>
                    <Link href="/auth/signup">
                        <a className="font-semibold transition-colors duration-200 relative hover:underline">
                            Register
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

// import React from "react";

// interface LoginProps {

// }

// const Login: React.FC<LoginProps> = () => {
//     return (

//     );
// };

// export default Login;
