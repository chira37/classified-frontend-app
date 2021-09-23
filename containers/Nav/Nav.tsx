import React from "react";
import Link from "next/link";
import Button from "@components/Button/Button";
import { useAppSelector } from "@redux/store";

interface NavProps {}

const Nav: React.FC<NavProps> = ({}) => {
    const { id } = useAppSelector((state) => state.user);
    return (
        <nav className="h-16 flex flex-row justify-center items-center bg-primary w-full text-white">
            <div className="max-w-screen-md w-full flex items-center">
                <div>
                    <Link href="/">
                        <a className="mx-4">LOGO</a>
                    </Link>
                </div>
                <div className="flex-grow"></div>
                <div className="font-medium flex items-center gap-x-8">
                    <Link href="/search">
                        <a className="">Ads</a>
                    </Link>

                    {id ? (
                        <Link href="/profile/account">
                            <a className="">Profile</a>
                        </Link>
                    ) : (
                        <Link href="/auth/signin">
                            <a className="">Login</a>
                        </Link>
                    )}

                    <Link href="/createAd">
                        <a className="bg-white rounded-lg px-4 py-2 text-primary font-semibold">Crate ad</a>
                    </Link>
                    {/* <Link href={{ pathname: session ? "/createListing" : "/api/auth/signin" }}>
                    <a
                        className="mx-4 text-blue-500"
                        onClick={(e) => {
                            if (!session) {
                                e.preventDefault();
                                signIn(undefined, { callbackUrl: "http://localhost:3000/createListing" });
                            }
                        }}
                    >
                        Post Ad
                    </a>
                </Link>

                <Link href="/api/auth/signin">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    >
                        Sign in
                    </a>
                </Link> */}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
