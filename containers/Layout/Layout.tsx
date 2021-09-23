import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { setToken } from "@api/http";
import Nav from "@containers/nav/Nav";
import AuthService from "@helpers/AuthService";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const authService = new AuthService();
        authService.hydarateUser();
        setLoading(false);
    }, []);
    if (loading) return <div>loading</div>;

    return (
        <div>
            <Nav />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
