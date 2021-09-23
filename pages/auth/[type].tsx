import ForgotPassword from "@containers/auth/ForgotPassword";
import Login from "@containers/auth/Login";
import Register from "@containers/auth/Register";
import ResetPasssword from "@containers/auth/ResetPasssword";
import Cookies from "cookies";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";

const Auth: React.FC = () => {
    const router = useRouter();
    const { type } = router.query;

    console.log(type)
    if (type === "signin") return <Login />;
    if (type === "signup") return <Register />;
    if (type === "forgot-password") return <ForgotPassword />;
    if (type === "reset-password") return <ResetPasssword />;

    return null;
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const cookies = new Cookies(req, res);
    const token = cookies.get("token");

    if (token) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return {
        props: {},
    };
};
